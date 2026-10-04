// 법인 기본 정보 — 메인 사이트(sllaw.co.kr)의 lib/organization.ts와 글자 단위로 같게 유지합니다.
// 메인 사이트 정보가 바뀌면 이 파일만 고치면 푸터·법인 소개·검색엔진용 정보에 함께 반영됩니다.
export const FIRM = {
  name: '법무법인 명',
  nameEn: 'SOL & LUNA Law Firm',
  phone: '031-658-6100',
  phoneIntl: '+82-31-658-6100',
  email: 'sllaw@sllaw.co.kr',
  address: '경기도 평택시 평남로 1029-1, SJ프라자 5층',
  addressParts: { street: '평남로 1029-1, SJ프라자 5층', locality: '평택시', region: '경기도', country: 'KR' },
  taxId: '238-85-00581',
  representative: '최철호', // 대표변호사
  adLawyer: '최철호', // 광고책임변호사
  hours: '평일 09:00–18:00',
  mainSiteUrl: 'https://www.sllaw.co.kr',
  englishSiteUrl: 'https://www.lsfp.co.kr/',
}

// 항공 보상 가이드의 기본 작성자 표시 (글마다 author 항목으로 바꿀 수 있습니다)
export const GUIDE_AUTHOR = '법무법인 명'

export const SITE_DESCRIPTION = '항공 지연·결항 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.'

// 사이트 주소: NEXT_PUBLIC_SITE_URL을 넣으면 그 값을, 아니면 Vercel 운영 도메인을 씁니다.
// (자체 도메인을 연결하면 Vercel이 VERCEL_PROJECT_PRODUCTION_URL을 그 도메인으로 바꿔 줍니다.)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
