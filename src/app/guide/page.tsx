import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/content'
import { BLOG_CATEGORY_LABELS } from '@/lib/types'
import FilterTabs from '@/components/ui/FilterTabs'
import PostCard from '@/components/content/PostCard'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '항공 보상 가이드',
  description: '항공편 지연·결항 보상 기준(EU261·몬트리올 협약 등), 항공사가 거절할 때 대응법, 공항에서 챙길 증거까지 항공 보상에 필요한 정보를 정리했습니다.',
  alternates: { canonical: '/guide' },
}

const CATEGORY_TABS = Object.entries(BLOG_CATEGORY_LABELS).map(([value, label]) => ({ value, label }))

export default function GuidePage() {
  const posts = getPosts()

  return (
    <div>
      <PageHeader title="항공 보상 가이드" subtitle="지연·결항 보상을 받기 전에 알아 두면 좋은 내용을 정리했습니다" />

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
            <p className="text-gray-500 mb-6">가이드를 준비하고 있습니다. 궁금한 점은 사건 접수로 문의해 주세요.</p>
            <Link href="/intake" className="btn-primary">사건 접수하기</Link>
          </div>
        )}
      </div>
    </div>
  )
}
