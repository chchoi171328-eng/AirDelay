export type CaseType = 'delay' | 'cancel'
export type BlogCategory = 'eu261' | 'montreal' | 'consumer' | 'guide'

// content/cases/*.md 한 개 = 사례 한 건
export interface Case {
  slug: string
  airline: string
  route: string
  flightDate: string // YYYY-MM-DD
  delay: string // 예: '5시간 30분', '결항'
  amount: number // 원
  type: CaseType
  summary: string
  html: string | null // 본문이 있으면 상세 페이지가 생깁니다
  draft: boolean
}

// content/blog/*.md 한 개 = 글 한 편
export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  category: BlogCategory
  summary: string
  date: string // YYYY-MM-DD
  cover: string | null
  html: string | null
  draft: boolean
}

// content/reviews/*.md 한 개 = 고객 후기 한 건 (의뢰인 서면 동의 필수)
export interface Review {
  slug: string
  name: string // 익명 표기 (예: '김*민')
  date: string // YYYY-MM
  route: string
  type: CaseType
  text: string
  draft: boolean
}

// content/faq/*.md 한 개 = 질문 하나
export interface FaqItem {
  slug: string
  question: string
  order: number
  html: string
  text: string // 검색엔진용 일반 텍스트 답변
  draft: boolean
}

export const CASE_TYPE_LABELS: Record<CaseType, string> = {
  delay: '항공 지연',
  cancel: '항공 결항',
}

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  eu261: 'EU261 규정',
  montreal: '몬트리올 협약',
  consumer: '소비자보호원 기준',
  guide: '실전 가이드',
}
