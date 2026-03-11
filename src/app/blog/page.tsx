import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/supabase'
import { BLOG_CATEGORY_LABELS } from '@/lib/types'
import type { BlogCategory } from '@/lib/types'
import { Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata: Metadata = {
  title: '법률 정보',
  description: 'EU261, 몬트리올 협약, 소비자보호원 기준 등 항공 피해 보상에 관한 법률 정보를 제공합니다.',
}

const DEMO_POSTS = [
  { id: '1', title: '유럽 출발 항공기 지연, 최대 600유로 받는 법', category: 'eu261' as BlogCategory, summary: 'EU261/2004 규정에 따라 3시간 이상 지연 시 최대 600유로를 보상받을 수 있습니다. 조건과 예외 사항을 상세히 알아봅니다.', content: null, cover_image: null, published: true, created_at: '2024-09-01' },
  { id: '2', title: '브렉시트 이후 영국 노선 EU261 적용 여부', category: 'eu261' as BlogCategory, summary: '브렉시트 이후 영국 관련 노선에 대한 EU261 적용 범위와 영국 항공법 CAA261의 차이점을 정리합니다.', content: null, cover_image: null, published: true, created_at: '2024-08-28' },
  { id: '3', title: '한국소비자원 항공 피해 보상기준 완벽 정리', category: 'consumer' as BlogCategory, summary: '소비자분쟁해결기준에 따른 국내 항공사 보상 기준과 실제 청구 절차를 상세히 알아봅니다.', content: null, cover_image: null, published: true, created_at: '2024-08-20' },
  { id: '4', title: '국제선 결항, 몬트리올 협약으로 받을 수 있는 보상은?', category: 'montreal' as BlogCategory, summary: '몬트리올 협약(1999)에 따른 국제 항공 보상 기준과 SDR 계산법을 설명합니다.', content: null, cover_image: null, published: true, created_at: '2024-08-15' },
  { id: '5', title: '공항에서 지금 당장 해야 할 5가지', category: 'guide' as BlogCategory, summary: '지연·결항 발생 시 현장에서 즉시 챙겨야 할 증거와 행동 요령을 안내합니다.', content: null, cover_image: null, published: true, created_at: '2024-08-10' },
  { id: '6', title: '항공 지연 보상 청구 시효는 몇 년일까?', category: 'guide' as BlogCategory, summary: '항공 피해 보상 청구권의 소멸시효와 늦게 청구할 경우 대응 방법을 알아봅니다.', content: null, cover_image: null, published: true, created_at: '2024-08-05' },
]

const CAT_TABS = [
  { value: '', label: '전체' },
  { value: 'eu261', label: 'EU261 규정' },
  { value: 'montreal', label: '몬트리올 협약' },
  { value: 'consumer', label: '소비자보호원 기준' },
  { value: 'guide', label: '실전 가이드' },
]

const CAT_COLORS: Record<BlogCategory, string> = {
  eu261: 'badge-navy',
  montreal: 'bg-purple-50 text-purple-700',
  consumer: 'bg-green-50 text-green-700',
  guide: 'badge-gold',
}

export default async function BlogPage() {
  const dbPosts = await getPublishedPosts().catch(() => [])
  const posts = dbPosts.length > 0 ? dbPosts : DEMO_POSTS

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">법률 정보</h1>
          <p className="text-white/60 text-lg">항공 보상에 관한 핵심 법률 정보를 제공합니다</p>
        </div>
      </div>

      <div className="container-wide section-padding py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CAT_TABS.map(({ value, label }) => (
            <span key={value} className={`badge text-sm px-4 py-2 cursor-pointer transition-all
              ${value === '' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-navy/10'}`}>
              {label}
            </span>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="card group overflow-hidden flex flex-col">
              <div className="relative">
                {post.cover_image
                  ? <img src={post.cover_image} alt={post.title} className="w-full aspect-video object-cover" />
                  : <ImagePlaceholder label="법률 정보 커버 이미지" aspectRatio="aspect-video" />
                }
                <span className={`badge absolute top-3 left-3 text-xs ${CAT_COLORS[post.category]}`}>
                  {BLOG_CATEGORY_LABELS[post.category]}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-bold text-navy text-base leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.summary}</p>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </div>
                  <span className="flex items-center gap-1 text-navy text-xs font-semibold group-hover:text-gold transition-colors">
                    읽기 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
