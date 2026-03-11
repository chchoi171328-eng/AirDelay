import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import { BLOG_CATEGORY_LABELS } from '@/lib/types'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const DEMO_POSTS: BlogPost[] = [
  { id: '1', title: '유럽 출발 항공기 지연, 최대 600유로 받는 법', category: 'eu261', summary: 'EU261 규정에 따라 3시간 이상 지연 시 최대 600유로를 보상받을 수 있습니다.', content: null, cover_image: null, published: true, created_at: '2024-09-01' },
  { id: '2', title: '한국소비자원 항공 피해 보상기준 완벽 정리', category: 'consumer', summary: '소비자분쟁해결기준에 따른 국내 항공사 보상 기준을 상세히 알아봅니다.', content: null, cover_image: null, published: true, created_at: '2024-08-20' },
  { id: '3', title: '공항에서 지금 당장 해야 할 5가지', category: 'guide', summary: '지연·결항 발생 시 현장에서 즉시 챙겨야 할 증거와 행동 요령을 안내합니다.', content: null, cover_image: null, published: true, created_at: '2024-08-10' },
]

interface Props { posts?: BlogPost[] }

export default function BlogPreview({ posts = DEMO_POSTS }: Props) {
  const displayPosts = posts.length > 0 ? posts : DEMO_POSTS

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-wide section-padding">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="section-title">법률 정보</h2>
            <p className="section-subtitle">항공 보상에 관한 핵심 정보를 제공합니다</p>
          </div>
          <Link href="/blog" className="text-navy font-semibold text-sm hover:text-gold transition-colors flex items-center gap-1">
            전체 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="card group overflow-hidden flex flex-col">
              {/* Cover image area */}
              <div className="relative">
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} className="w-full aspect-video object-cover" />
                ) : (
                  <ImagePlaceholder label="포스트 커버 이미지" aspectRatio="aspect-video" />
                )}
                <span className="absolute top-3 left-3 badge-navy text-xs">
                  {BLOG_CATEGORY_LABELS[post.category]}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-navy text-base leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-2">{post.summary}</p>
                )}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
