import type { Metadata } from 'next'
import Hero from '@/components/sections/home/Hero'
import RecentCasesTicker from '@/components/sections/home/RecentCasesTicker'
import ProcessTimeline from '@/components/sections/home/ProcessTimeline'
import ServiceCards from '@/components/sections/home/ServiceCards'
import Testimonials from '@/components/sections/home/Testimonials'
import BlogPreview from '@/components/sections/home/BlogPreview'
import Faq from '@/components/sections/home/Faq'
import IntakeCTA from '@/components/sections/home/IntakeCTA'
import { getCases, getFaqs, getPosts, getReviews } from '@/lib/content'

export const metadata: Metadata = {
  title: '법무법인 명 | 항공지연·결항 보상 전문',
  description: '항공 지연·결항 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  // 최근 운항일 순 10건 (본문 HTML은 화면에 쓰지 않으므로 빼고 넘깁니다)
  const recentCases = getCases().slice(0, 10).map((c) => ({ ...c, html: null }))
  const posts = getPosts().slice(0, 3)
  const reviews = getReviews()
  const faqs = getFaqs()

  return (
    <>
      <Hero />
      <RecentCasesTicker cases={recentCases} />
      <ProcessTimeline />
      <ServiceCards />
      <Testimonials reviews={reviews} />
      <Faq items={faqs} />
      <BlogPreview posts={posts} />
      <IntakeCTA />
    </>
  )
}
