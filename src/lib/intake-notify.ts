// 서버 전용 — 사건 접수 알림 메일 (EmailJS REST API)
// EmailJS 대시보드 Account > Security 에서 "Allow EmailJS API for non-browser applications"를 켜야 합니다.
// "Use Private Key"도 함께 켜면 공개 키만으로는 메일을 보낼 수 없어 스팸 악용을 막을 수 있습니다.
// 메일은 법인 수신용 한 통만 보냅니다. 고객에게는 완료 화면으로 접수 사실을 알리고 확인 메일은 보내지 않습니다
// (접수 1건 = 요청 1회가 되어, 요금제의 월 요청 한도를 접수 건수 그대로 쓸 수 있습니다).
import type { IntakeInput } from './intake'
import { CASE_TYPE_LABELS } from './types'
import type { CaseType } from './types'
import { BRAND, FIRM } from './site'

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'
// EmailJS는 초당 요청 수를 제한합니다. 429나 서버 오류, 네트워크 오류면 잠시 기다렸다가 한 번만 다시 보냅니다.
const RETRY_DELAY_MS = 1200

// 기존 배포 설정을 그대로 쓰기 위해 NEXT_PUBLIC_ 이름을 유지합니다 (ID·공개 키는 비밀값이 아님).
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const firmTemplateId = process.env.NEXT_PUBLIC_EMAILJS_FIRM_TEMPLATE_ID ?? ''
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
const privateKey = process.env.EMAILJS_PRIVATE_KEY ?? ''

export function isEmailConfigured() {
  return Boolean(serviceId && firmTemplateId && publicKey)
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function send(templateId: string, params: Record<string, string>, retry = true): Promise<boolean> {
  if (!serviceId || !templateId || !publicKey) return false
  try {
    const res = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey && { accessToken: privateKey }),
        template_params: params,
      }),
    })
    if (res.ok) return true
    const body = await res.text()
    if (retry && (res.status === 429 || res.status >= 500)) {
      console.warn('[intake] EmailJS 응답', res.status, '— 잠시 후 다시 보냅니다')
      await wait(RETRY_DELAY_MS)
      return send(templateId, params, false)
    }
    console.error('[intake] EmailJS 발송 실패', res.status, body)
    return false
  } catch (err) {
    if (retry) {
      console.warn('[intake] EmailJS 요청 오류 — 잠시 후 다시 보냅니다', err)
      await wait(RETRY_DELAY_MS)
      return send(templateId, params, false)
    }
    console.error('[intake] EmailJS 요청 오류', err)
    return false
  }
}

/** 법인에 접수 내용을 메일로 알립니다. 보냈으면 true. */
export async function notifyIntake(input: IntakeInput, opts: { id: string | null }): Promise<boolean> {
  // 템플릿 변수명(airline, flightNo, route, date, type, delay_hours, name, phone, email, detail, intake_id)을 유지합니다.
  // from_name: EmailJS 템플릿의 From Name 칸에 {{from_name}}을 넣으면 발신명이 '에어리걸클레임 (법무법인 명)'으로 나갑니다.
  // DB를 연결했다면 템플릿에 {{intake_id}}를 넣어 접수 번호를 받을 수 있습니다 (미설정이면 '-').
  return send(firmTemplateId, {
    from_name: `${BRAND.name} (${FIRM.name})`,
    intake_id: opts.id ?? '-',
    name: input.name,
    phone: input.phone,
    email: input.email,
    airline: input.airline,
    flightNo: input.flightNo || '-',
    route: `${input.origin} → ${input.destination}`,
    date: input.date,
    type: CASE_TYPE_LABELS[input.type as CaseType] ?? input.type,
    delay_hours: input.delayRange || '-',
    detail: input.detail || '-',
  })
}
