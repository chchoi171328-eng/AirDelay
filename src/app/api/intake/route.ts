import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { normalizeIntake, validateContact, validateFlight } from '@/lib/intake'
import type { CreateIntakeResponse } from '@/lib/intake'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { inputToRow, markNotified } from '@/lib/intake-store'
import { isEmailConfigured, notifyIntake } from '@/lib/intake-notify'

const MIN_FILL_MS = 3000 // 이보다 빨리 제출되면 사람이 아닌 자동 입력으로 봅니다

const reply = (body: CreateIntakeResponse, status = 200) => NextResponse.json(body, { status })

// 접수 = 메일 알림이 기본이고, Supabase를 설정했다면 같은 내용을 DB에도 남깁니다. 첨부파일은 받지 않습니다.
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
    return reply({ ok: true, id: null })
  }

  const input = normalizeIntake(raw)
  // 한국의 '오늘'이 UTC로는 어제일 수 있어 하루 여유를 둡니다.
  const latestDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const errors = { ...validateFlight(input, latestDate), ...validateContact(input) }
  if (Object.keys(errors).length) return reply({ ok: false, error: 'validation', errors }, 400)

  const db = getSupabaseAdmin()
  const mailReady = isEmailConfigured()
  if (!db && !mailReady) {
    console.error('[intake] Supabase와 EmailJS가 모두 설정되지 않아 접수를 저장할 수 없습니다.')
    return reply({ ok: false, error: 'unavailable' }, 503)
  }

  // 1) DB 저장 (설정한 경우) — 접수의 원본 기록
  let id: string | null = null
  if (db) {
    const newId = randomUUID()
    const { error } = await db.from('intakes').insert({ id: newId, status: 'received', ...inputToRow(input) })
    if (error) console.error('[intake] DB 저장 실패', error)
    else id = newId
  }
  if (!id && !mailReady) return reply({ ok: false, error: 'server' }, 500)

  // 2) 메일 알림 — 법인에 접수 내용 (고객에게는 완료 화면으로만 알리고 확인 메일은 보내지 않습니다)
  const sent = await notifyIntake(input, { id })
  if (!id && !sent) return reply({ ok: false, error: 'server' }, 500)
  if (db && id && sent) await markNotified(db, id)

  return reply({ ok: true, id })
}
