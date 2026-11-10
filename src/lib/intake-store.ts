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

/** 법인 알림 메일을 보낸 시각을 기록합니다. */
export async function markNotified(db: SupabaseClient, id: string) {
  const { error } = await db.from('intakes').update({ firm_notified_at: new Date().toISOString() }).eq('id', id)
  if (error) console.error('[intake] 알림 기록 실패', error)
}
