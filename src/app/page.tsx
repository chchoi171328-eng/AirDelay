import type { Metadata } from 'next'
import Hero from '@/components/sections/home/Hero'
import RecentCasesTicker from '@/components/sections/home/RecentCasesTicker'
import ProcessTimeline from '@/components/sections/home/ProcessTimeline'
import ServiceCards from '@/components/sections/home/ServiceCards'
import Testimonials from '@/components/sections/home/Testimonials'
import BlogPreview from '@/components/sections/home/BlogPreview'
import IntakeCTA from '@/components/sections/home/IntakeCTA'
import { getFeaturedCases, getLatestPosts, getAllCases } from '@/lib/supabase'

export const metadata: Metadata = {
  title: '법무법인 명 | 항공지연·결항 보상 전문',
  description: '항공 지연·결항 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.',
}

export default async function HomePage() {
  const [featuredCases, latestPosts, allCasesRes] = await Promise.allSettled([
    getFeaturedCases(),
    getLatestPosts(3),
    getAllCases(),
  ])

  const cases = featuredCases.status === 'fulfilled' ? featuredCases.value : []
  const posts = latestPosts.status === 'fulfilled' ? latestPosts.value : []
  const recentCases = allCasesRes.status === 'fulfilled' ? allCasesRes.value.slice(0, 10) : [] // 최신 10건

  return (
    <>
      <Hero />
      <RecentCasesTicker cases={recentCases} />
      <ProcessTimeline />
      <ServiceCards />
      <Testimonials />
      <BlogPreview posts={posts} />
      <IntakeCTA />
    </>
  )
}
