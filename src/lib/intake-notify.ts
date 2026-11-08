// 서버 전용 — 사건 접수 알림 메일 (EmailJS REST API)
// EmailJS 대시보드 Account > Security 에서 "Allow EmailJS API for non-browser applications"를 켜야 합니다.
// "Use Private Key"도 함께 켜면 공개 키만으로는 메일을 보낼 수 없어 스팸 악용을 막을 수 있습니다.
import type { IntakeInput } from './intake'
import { CASE_TYPE_LABELS } from './types'
import type { CaseType } from './types'
import { BRAND, FIRM } from './site'

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

// 기존 배포 설정을 그대로 쓰기 위해 NEXT_PUBLIC_ 이름을 유지합니다 (ID·공개 키는 비밀값이 아님).
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const firmTemplateId = process.env.NEXT_PUBLIC_EMAILJS_FIRM_TEMPLATE_ID ?? ''
const clientTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID ?? ''
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
const privateKey = process.env.EMAILJS_PRIVATE_KEY ?? ''

export function isEmailConfigured() {
  return Boolean(serviceId && firmTemplateId && publicKey)
}

async function send(templateId: string, params: Record<string, string>): Promise<boolean> {
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
    if (!res.ok) console.error('[intake] EmailJS 발송 실패', res.status, await res.text())
    return res.ok
  } catch (err) {
    console.error('[intake] EmailJS 요청 오류', err)
    return false
  }
}

export async function notifyIntake(
  input: IntakeInput,
  opts: { id: string | null },
): Promise<{ firm: boolean; client: boolean }> {
  // 기존 템플릿 변수명(airline, flightNo, route, date, type, delay_hours, name, phone, email, detail)을 유지합니다.
  // from_name: EmailJS 템플릿의 From Name 칸에 {{from_name}}을 넣으면 발신명이 '에어리걸클레임 (법무법인 명)'으로 나갑니다.
  const clientParams = {
    from_name: `${BRAND.name} (${FIRM.name})`,
    name: input.name,
    email: input.email,
    airline: input.airline,
    flightNo: input.flightNo || '-',
    route: `${input.origin} → ${input.destination}`,
    date: input.date,
    type: CASE_TYPE_LABELS[input.type as CaseType] ?? input.type,
    delay_hours: input.delayRange || '-',
  }
  // 법인용에만 연락처·상세 내용을 담습니다. DB를 연결했다면 법인용 템플릿에 {{intake_id}}를 넣어 접수 번호를 받을 수 있습니다.
  const firmParams = {
    ...clientParams,
    intake_id: opts.id ?? '-',
    phone: input.phone,
    detail: input.detail || '-',
  }

  const [firm, client] = await Promise.all([
    send(firmTemplateId, firmParams),
    clientTemplateId ? send(clientTemplateId, clientParams) : Promise.resolve(false),
  ])
  return { firm, client }
}
