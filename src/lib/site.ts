// 서비스 브랜드 — 헤더·제목·검색 결과·OG처럼 앞에 내세우는 이름입니다.
// 표기 규칙: '에어리걸클레임'은 항상 붙여 쓰고(띄어쓰기 금지), '에어리걸' 단독 약칭은 쓰지 않습니다.
export const BRAND = {
  name: '에어리걸클레임',
  nameEn: 'AirLegal Claim',
  tagline: '항공지연·결항 보상, 변호사가 직접 청구합니다',
  taglineShort: '항공지연·결항 보상 · 변호사 직접 청구',
  operator: '에어리걸클레임은 법무법인 명(SOL & LUNA)이 운영하는 항공지연·결항 보상 전문 서비스입니다.',
  themeColor: '#1E3A5F',
}

// 운영 법인 기본 정보 — 메인 사이트의 법인 정보와 글자 단위로 같게 유지합니다 (메인 사이트로 링크는 걸지 않습니다).
// 푸터 운영 주체 표기·운영 법인 소개·법적 고지·검색엔진용 정보가 이 값을 씁니다.
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
}

// 항공 보상 가이드의 기본 작성자 표시 (글마다 author 항목으로 바꿀 수 있습니다)
export const GUIDE_AUTHOR = '법무법인 명'

export const SITE_DESCRIPTION =
  '항공편 지연·결항 보상 전문 서비스 에어리걸클레임. 법무법인 명 변호사가 항공사 청구부터 공동소송까지 직접 진행합니다. 보상받은 경우에만 성공보수.'

// 사이트 주소: NEXT_PUBLIC_SITE_URL을 넣으면 그 값을, 아니면 Vercel 운영 도메인을 씁니다.
// (자체 도메인을 연결하면 Vercel이 VERCEL_PROJECT_PRODUCTION_URL을 그 도메인으로 바꿔 줍니다.)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
