// 서버 전용 — 접수 입력값 → intakes 테이블 행 변환, 알림 기록
import type { SupabaseClient } from '@supabase/supabase-js'
import type { IntakeInput } from './intake'
import { PRIVACY_POLICY_VERSION } from './intake'

export function inputToRow(input: IntakeInput) {
  return {
    airline: input.airline,
    flight_no: input.flightNo || null,
    origin: input.origin,
    destination: input.destination,
    flight_date: input.date,
    incident_type: input.type,
    delay_range: input.delayRange || null,
    name: input.name,
    phone: input.phone,
    email: input.email,
    detail: input.detail || null,
    consent_version: PRIVACY_POLICY_VERSION,
    consented_at: new Date().toISOString(),
  }
}

export async function markNotified(db: SupabaseClient, id: string, sent: { firm: boolean; client: boolean }) {
  const now = new Date().toISOString()
  const patch = {
    ...(sent.firm && { firm_notified_at: now }),
    ...(sent.client && { client_notified_at: now }),
  }
  if (!Object.keys(patch).length) return
  const { error } = await db.from('intakes').update(patch).eq('id', id)
  if (error) console.error('[intake] 알림 기록 실패', error)
}
