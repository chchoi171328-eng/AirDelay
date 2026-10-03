// 법인 기본 정보 — 실제 정보로 교체할 때 이 파일만 고치면 됩니다.
export const FIRM = {
  name: '법무법인 명',
  phone: '02-000-0000',
  email: 'info@lawfirm-myung.com',
}

// 항공 보상 가이드의 기본 작성자 표시 (글마다 author 항목으로 바꿀 수 있습니다)
export const GUIDE_AUTHOR = '법무법인 명'

export const SITE_DESCRIPTION = '항공 지연·결항 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.'

// 사이트 주소: NEXT_PUBLIC_SITE_URL을 넣으면 그 값을, 아니면 Vercel 운영 도메인을 씁니다.
// (자체 도메인을 연결하면 Vercel이 VERCEL_PROJECT_PRODUCTION_URL을 그 도메인으로 바꿔 줍니다.)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
