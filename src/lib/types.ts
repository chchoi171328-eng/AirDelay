export type CaseType = 'delay' | 'cancel'
export type BlogCategory = 'claim' | 'aviation'

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

// content/blog/*.md 한 개 = 항공 보상 가이드 글 한 편 (/guide/파일이름)
export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  category: BlogCategory
  summary: string
  date: string // YYYY-MM-DD
  cover: string | null // 글에서 직접 지정한 대표 이미지 (없으면 분야별 기본 이미지)
  html: string | null
  draft: boolean
}

// content/faq/*.md 한 개 = 질문 하나
export type FaqCategory = 'cost' | 'process' | 'criteria' | 'lawsuit'

export interface FaqItem {
  slug: string
  question: string
  order: number
  category: FaqCategory
  html: string
  text: string // 검색엔진용 일반 텍스트 답변
  draft: boolean
}

// 자주 묻는 질문 페이지는 이 순서대로 묶어서 보여 줍니다
export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  cost: '비용',
  process: '접수·진행',
  criteria: '보상 기준',
  lawsuit: '공동소송',
}

export const CASE_TYPE_LABELS: Record<CaseType, string> = {
  delay: '항공 지연',
  cancel: '항공 결항',
}

// 항공 보상 가이드는 두 묶음으로 나눠 보여 줍니다: 보상·청구(법률) / 항공 상식(운항·기상·정비 등 업계 지식)
export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  claim: '보상·청구',
  aviation: '항공 상식',
}

// 대표 이미지를 지정하지 않은 글에 쓰는 분야별 기본 이미지
export const BLOG_CATEGORY_COVERS: Record<BlogCategory, string> = {
  claim: '/images/blog/claim.jpg',
  aviation: '/images/blog/aviation.jpg',
}

export const coverOf = (post: Pick<BlogPost, 'cover' | 'category'>) => post.cover ?? BLOG_CATEGORY_COVERS[post.category]
