import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/content'
import { BLOG_CATEGORY_LABELS, type BlogCategory } from '@/lib/types'
import PostCard from '@/components/content/PostCard'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '항공 보상 가이드',
  description: '항공편 지연·결항 보상 기준(EU261·몬트리올 협약 등), 항공사가 거절할 때 대응법, 공항에서 챙길 증거까지 항공 보상에 필요한 정보를 정리했습니다.',
  alternates: { canonical: '/guide' },
}

// 묶음별 한 줄 설명 — 글이 없는 묶음은 화면에 나오지 않습니다
const GROUP_DESC: Record<BlogCategory, string> = {
  claim: '보상 기준, 항공사 대응, 청구와 소송에 관한 글',
  aviation: '지연 코드, 항공 기상, 정비, 관제처럼 항공사 안내를 이해하는 데 필요한 업계 지식',
}

export default function GuidePage() {
  const posts = getPosts()
  const groups = (Object.keys(BLOG_CATEGORY_LABELS) as BlogCategory[])
    .map((key) => ({ key, label: BLOG_CATEGORY_LABELS[key], items: posts.filter((p) => p.category === key) }))
    .filter((g) => g.items.length > 0)

  return (
    <div>
      <PageHeader title="항공 보상 가이드" subtitle="지연·결항 보상을 받기 전에 알아 두면 좋은 내용을 정리했습니다" />

      <div className="container-wide section-padding py-12 space-y-14">
        {groups.length > 0 ? (
          groups.map((g) => (
            <section key={g.key} id={g.key} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">{g.label}</h2>
              <p className="text-gray-500 mt-1.5 mb-6 break-keep">{GROUP_DESC[g.key]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.items.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>
            </section>
          ))
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
