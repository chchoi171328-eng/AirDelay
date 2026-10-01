import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/content'
import { BLOG_CATEGORY_LABELS } from '@/lib/types'
import FilterTabs from '@/components/ui/FilterTabs'
import PostCard from '@/components/content/PostCard'

export const metadata: Metadata = {
  title: '법률 정보',
  description: 'EU261, 몬트리올 협약, 소비자보호원 기준 등 항공 피해 보상에 관한 법률 정보를 제공합니다.',
  alternates: { canonical: '/blog' },
}

const CATEGORY_TABS = Object.entries(BLOG_CATEGORY_LABELS).map(([value, label]) => ({ value, label }))

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">법률 정보</h1>
          <p className="text-white/60 text-lg">항공 보상에 관한 핵심 법률 정보를 제공합니다</p>
        </div>
      </div>

      <div className="container-wide section-padding py-12">
        {posts.length > 0 ? (
          <FilterTabs
            param="category"
            tabs={CATEGORY_TABS}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            items={posts.map((post) => ({ key: post.slug, group: post.category, node: <PostCard post={post} /> }))}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">법률 정보를 준비하고 있습니다. 궁금한 점은 무료 사건 접수로 문의해 주세요.</p>
            <Link href="/intake" className="btn-primary">무료 사건 접수</Link>
          </div>
        )}
      </div>
    </div>
  )
}
