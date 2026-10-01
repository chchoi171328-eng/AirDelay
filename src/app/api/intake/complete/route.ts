import { NextResponse } from 'next/server'
import type { CompleteIntakeResponse } from '@/lib/intake'
import { getSupabaseAdmin, INTAKE_BUCKET } from '@/lib/supabase-admin'
import { markNotified, rowToInput } from '@/lib/intake-store'
import type { IntakeRow } from '@/lib/intake-store'
import { notifyIntake } from '@/lib/intake-notify'
import type { FileLink } from '@/lib/intake-notify'

const LINK_DAYS = 7
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const reply = (body: CompleteIntakeResponse, status = 200) => NextResponse.json(body, { status })

// 첨부파일 업로드가 끝난 뒤 호출 — 실제로 올라간 파일만 기록하고 알림 메일을 보냅니다.
export async function POST(req: Request) {
  let id = ''
  try {
    id = String((await req.json())?.id ?? '')
  } catch {}
  if (!UUID_RE.test(id)) return reply({ ok: false, error: 'not_found' }, 404)

  const db = getSupabaseAdmin()
  if (!db) return reply({ ok: false, error: 'unavailable' }, 503)

  // 상태를 먼저 바꿔 두면 요청이 중복돼도 메일은 한 번만 나갑니다.
  const { data: rows, error } = await db
    .from('intakes')
    .update({ status: 'received' })
    .eq('id', id)
    .eq('status', 'awaiting_files')
    .select('*')
  if (error) {
    console.error('[intake] 상태 변경 실패', error)
    return reply({ ok: false, error: 'server' }, 500)
  }
  if (!rows?.length) {
    const { data: done } = await db.from('intakes').select('files, client_notified_at').eq('id', id).maybeSingle()
    if (!done) return reply({ ok: false, error: 'not_found' }, 404)
    return reply({ ok: true, filesStored: done.files?.length ?? 0, clientNotified: Boolean(done.client_notified_at) })
  }

  const row = rows[0] as IntakeRow
  const { data: listed, error: listError } = await db.storage.from(INTAKE_BUCKET).list(id, { limit: 100 })
  if (listError) console.error('[intake] 첨부파일 목록 조회 실패', listError)
  const present = new Set((listed ?? []).map((o) => `${id}/${o.name}`))
  const stored = (row.files ?? []).filter((f) => present.has(f.path))

  const links: FileLink[] = stored.map((f) => ({ name: f.name, size: f.size, url: null }))
  if (stored.length) {
    const { data: signed, error: signError } = await db.storage
      .from(INTAKE_BUCKET)
      .createSignedUrls(stored.map((f) => f.path), LINK_DAYS * 24 * 60 * 60)
    if (signError) console.error('[intake] 다운로드 링크 생성 실패', signError)
    const urlByPath = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]))
    stored.forEach((f, i) => { links[i].url = urlByPath.get(f.path) ?? null })
  }

  const { error: updateError } = await db.from('intakes').update({ files: stored }).eq('id', id)
  if (updateError) console.error('[intake] 첨부파일 기록 실패', updateError)

  const missing = (row.files?.length ?? 0) - stored.length
  const filesNote = [
    stored.length && `링크는 ${LINK_DAYS}일간 유효합니다. 이후에는 Supabase Storage의 ${INTAKE_BUCKET}/${id} 폴더에서 확인하세요.`,
    missing > 0 && `첨부 ${missing}개는 업로드되지 않았습니다. 고객에게 따로 요청해 주세요.`,
  ].filter(Boolean).join('\n')

  const sent = await notifyIntake(rowToInput(row), { id, files: links, filesNote: filesNote || undefined })
  await markNotified(db, id, sent)

  return reply({ ok: true, filesStored: stored.length, clientNotified: sent.client })
}
