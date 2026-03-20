export type CaseType = 'delay' | 'cancel'
export type BlogCategory = 'eu261' | 'montreal' | 'consumer' | 'guide'

export interface Case {
  id: string
  airline: string
  delay_date: string
  delay_hours: string
  amount: number
  type: CaseType
  summary: string | null
  detail: string | null
  is_featured: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  category: BlogCategory
  summary: string | null
  content: string | null
  cover_image: string | null
  published: boolean
  created_at: string
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
