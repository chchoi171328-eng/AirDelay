import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import PostCard from '@/components/content/PostCard'

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

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
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  )
}
