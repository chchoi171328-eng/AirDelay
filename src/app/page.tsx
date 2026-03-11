import type { Metadata } from 'next'
import Hero from '@/components/sections/home/Hero'
import TrustStats from '@/components/sections/home/TrustStats'
import ProcessTimeline from '@/components/sections/home/ProcessTimeline'
import ServiceCards from '@/components/sections/home/ServiceCards'
import Testimonials from '@/components/sections/home/Testimonials'
import CasesCarousel from '@/components/sections/home/CasesCarousel'
import BlogPreview from '@/components/sections/home/BlogPreview'
import IntakeCTA from '@/components/sections/home/IntakeCTA'
import { getFeaturedCases, getLatestPosts } from '@/lib/supabase'

export const metadata: Metadata = {
  title: '법무법인 명 | 항공지연·결항 보상 전문',
  description: '항공 지연·결항·탑승거부·수하물 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.',
}

export default async function HomePage() {
  const [featuredCases, latestPosts] = await Promise.allSettled([
    getFeaturedCases(),
    getLatestPosts(3),
  ])

  const cases = featuredCases.status === 'fulfilled' ? featuredCases.value : []
  const posts = latestPosts.status === 'fulfilled' ? latestPosts.value : []

  return (
    <>
      <Hero />
      <TrustStats />
      <ProcessTimeline />
      <ServiceCards />
      <Testimonials />
      <CasesCarousel initialCases={cases} />
      <BlogPreview posts={posts} />
      <IntakeCTA />
    </>
  )
}
