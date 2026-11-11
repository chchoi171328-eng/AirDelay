// 서버 전용 — Brevo로 대표 메일함에 접수 알림 한 통을 보냅니다.
import { randomUUID } from 'crypto'
import type { IntakeInput } from './intake'
import { contactMethodLabel } from './intake'
import { CASE_TYPE_LABELS } from './types'
import type { CaseType } from './types'
import { BRAND, FIRM } from './site'

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'
const RETRY_DELAY_MS = 1200
const apiKey = process.env.BREVO_API_KEY?.trim() ?? ''
const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim() ?? ''

export function isEmailConfigured() {
  return Boolean(apiKey && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail))
}

/** 대표 메일함에만 보냅니다. 고객에게는 사이트의 완료 화면으로 안내합니다. */
export async function notifyIntake(input: IntakeInput, opts: { id: string | null }): Promise<boolean> {
  if (!isEmailConfigured()) return false

  const body = JSON.stringify({
    sender: { email: senderEmail, name: `${BRAND.name} (${FIRM.name})` },
    to: [{ email: FIRM.email, name: FIRM.name }],
    replyTo: { email: input.email },
    // 발송 로그에 고객 이름·항공편 정보가 남지 않도록 제목은 고정합니다.
    subject: `[${BRAND.name}] 새 문의 접수`,
    textContent: [
      `${BRAND.name} 접수 알림`,
      '',
      `접수 번호: ${opts.id ?? '-'}`,
      `이름: ${input.name}`,
      `연락처: ${input.phone}`,
      `이메일: ${input.email}`,
      `선호 연락수단: ${contactMethodLabel(input.preferredContact)}`,
      '',
      `항공사: ${input.airline}`,
      `편명: ${input.flightNo || '-'}`,
      `노선: ${input.origin} → ${input.destination}`,
      `운항일: ${input.date}`,
      `피해 유형: ${CASE_TYPE_LABELS[input.type as CaseType] ?? input.type}`,
      `지연 시간: ${input.delayRange || '-'}`,
      '',
      '상세 내용:',
      input.detail || '-',
    ].join('\n'),
    // 재시도에도 같은 UUID를 사용해 중복 발송을 방지합니다.
    headers: { idempotencyKey: randomUUID() },
  })

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(BREVO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'api-key': apiKey },
        body,
        signal: AbortSignal.timeout(10000),
      })
      if (res.ok) return true

      const error = await res.json().catch(() => null)
      // 응답을 잃은 첫 요청이 이미 처리됐다면 두 번째 발송은 하지 않습니다.
      if (attempt > 0 && error?.code === 'duplicate_parameter') return true
      if (attempt === 0 && (res.status === 429 || res.status >= 500)) {
        console.warn('[intake] Brevo 응답', res.status, '— 잠시 후 다시 보냅니다')
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
        continue
      }
      // 서비스 응답 본문에는 개인정보가 포함될 수 있어 로그에 남기지 않습니다.
      console.error('[intake] Brevo 발송 실패', res.status)
      return false
    } catch {
      if (attempt === 0) {
        console.warn('[intake] Brevo 연결 오류 — 잠시 후 다시 보냅니다')
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
        continue
      }
      console.error('[intake] Brevo 연결 실패')
      return false
    }
  }
  return false
}
