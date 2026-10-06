import type { Metadata } from 'next'
import Hero from '@/components/sections/home/Hero'
import RecentCasesTicker from '@/components/sections/home/RecentCasesTicker'
import ProcessTimeline from '@/components/sections/home/ProcessTimeline'
import ServiceCards from '@/components/sections/home/ServiceCards'
import BlogPreview from '@/components/sections/home/BlogPreview'
import Faq from '@/components/sections/home/Faq'
import IntakeCTA from '@/components/sections/home/IntakeCTA'
import { getCases, getFaqs, getPosts } from '@/lib/content'

// 제목·설명은 루트 레이아웃의 기본값(에어리걸클레임 | 태그라인)을 그대로 씁니다
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  // 최근 운항일 순 10건 (본문 HTML은 화면에 쓰지 않으므로 빼고 넘깁니다)
  const recentCases = getCases().slice(0, 10).map((c) => ({ ...c, html: null }))
  const posts = getPosts().slice(0, 3)
  const faqs = getFaqs().slice(0, 5)

  return (
    <>
      <Hero />
      <RecentCasesTicker cases={recentCases} />
      <ServiceCards />
      <ProcessTimeline />
      <Faq items={faqs} />
      <BlogPreview posts={posts} />
      <IntakeCTA />
    </>
  )
}
