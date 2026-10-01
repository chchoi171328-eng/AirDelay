import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import {
  FILE_TYPES, fileExtension, normalizeIntake, validateContact, validateFiles, validateFlight,
} from '@/lib/intake'
import type { CreateIntakeResponse, FileMeta, UploadTarget } from '@/lib/intake'
import { getSupabaseAdmin, INTAKE_BUCKET } from '@/lib/supabase-admin'
import { inputToRow, markNotified } from '@/lib/intake-store'
import type { StoredFile } from '@/lib/intake-store'
import { isEmailConfigured, notifyIntake } from '@/lib/intake-notify'

const MIN_FILL_MS = 3000 // 이보다 빨리 제출되면 사람이 아닌 자동 입력으로 봅니다

const reply = (body: CreateIntakeResponse, status = 200) => NextResponse.json(body, { status })

export async function POST(req: Request) {
  let raw: Record<string, unknown>
  try {
    raw = await req.json()
    if (!raw || typeof raw !== 'object') throw new Error('invalid body')
  } catch {
    return reply({ ok: false, error: 'validation' }, 400)
  }

  // 스팸 방지: 화면에 보이지 않는 칸이 채워졌거나 너무 빨리 제출되면 저장하지 않고 성공처럼 응답합니다.
  if ((typeof raw.website === 'string' && raw.website !== '') || !(Number(raw.elapsedMs) >= MIN_FILL_MS)) {
    return reply({ ok: true, id: null, uploads: [], filesStored: 0, clientNotified: false })
  }

  const input = normalizeIntake(raw)
  const files: FileMeta[] = Array.isArray(raw.files)
    ? raw.files.map((f) => ({ name: String(f?.name ?? ''), size: Number(f?.size ?? 0) }))
    : []
  // 한국의 '오늘'이 UTC로는 어제일 수 있어 하루 여유를 둡니다.
  const latestDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const errors = { ...validateFlight(input, latestDate), ...validateContact(input) }
  const fileError = validateFiles(files)
  if (fileError) errors.files = fileError
  if (Object.keys(errors).length) return reply({ ok: false, error: 'validation', errors }, 400)

  const db = getSupabaseAdmin()
  const mailReady = isEmailConfigured()
  if (!db && !mailReady) {
    console.error('[intake] Supabase와 EmailJS가 모두 설정되지 않아 접수를 저장할 수 없습니다.')
    return reply({ ok: false, error: 'unavailable' }, 503)
  }

  // 1) DB 저장 — 접수의 원본 기록
  let id: string | null = null
  const plannedFiles: (StoredFile & { contentType: string })[] = []
  if (db) {
    const newId = randomUUID()
    files.forEach((f, i) => {
      const ext = fileExtension(f.name)
      plannedFiles.push({ path: `${newId}/${i + 1}.${ext}`, name: f.name, size: f.size, contentType: FILE_TYPES[ext] })
    })
    const { error } = await db.from('intakes').insert({
      id: newId,
      status: files.length ? 'awaiting_files' : 'received',
      files: plannedFiles.map(({ path, name, size }) => ({ path, name, size })),
      ...inputToRow(input),
    })
    if (error) console.error('[intake] DB 저장 실패', error)
    else id = newId
  }
  if (!id && !mailReady) return reply({ ok: false, error: 'server' }, 500)

  // 2) 첨부파일 — 브라우저가 Supabase Storage로 직접 올리도록 서명된 업로드 주소를 발급합니다.
  //    (Vercel 함수는 요청 본문이 4.5MB로 제한되어 서버를 거쳐 올릴 수 없습니다.)
  //    메일 알림은 업로드가 끝난 뒤 /api/intake/complete 에서 보냅니다.
  if (db && id && plannedFiles.length) {
    const signed = await Promise.all(
      plannedFiles.map((f) => db.storage.from(INTAKE_BUCKET).createSignedUploadUrl(f.path)),
    )
    const uploads: UploadTarget[] = []
    signed.forEach((res, index) => {
      if (res.error) console.error('[intake] 업로드 주소 발급 실패', res.error)
      else uploads.push({ index, signedUrl: res.data.signedUrl, contentType: plannedFiles[index].contentType })
    })
    if (uploads.length) return reply({ ok: true, id, uploads, filesStored: 0, clientNotified: false })

    const { error } = await db.from('intakes').update({ status: 'received', files: [] }).eq('id', id)
    if (error) console.error('[intake] 상태 변경 실패', error)
  }

  // 3) 첨부가 없거나 저장할 수 없는 경우 바로 알림
  const filesNote = files.length ? `첨부 ${files.length}개는 저장하지 못했습니다. 고객에게 따로 요청해 주세요.` : undefined
  const sent = await notifyIntake(input, { id, files: [], filesNote })
  if (!id && !sent.firm) return reply({ ok: false, error: 'server' }, 500)
  if (db && id) await markNotified(db, id, sent)

  return reply({ ok: true, id, uploads: [], filesStored: 0, clientNotified: sent.client })
}
