import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronRight, CalendarCheck, PenLine } from 'lucide-react'
import { getPost, getPosts } from '@/lib/content'
import { BLOG_CATEGORY_LABELS, coverOf, type BlogCategory } from '@/lib/types'
import { CATEGORY_COLORS, formatReviewed } from '@/components/content/PostCard'
import DraftBadge from '@/components/content/DraftBadge'
import ArticleCTA from '@/components/content/ArticleCTA'
import { FIRM, SITE_URL } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.summary,
    keywords: post.keywords.length ? post.keywords : undefined,
    alternates: { canonical: `/guide/${post.slug}` },
    openGraph: {
      type: 'article',
      siteName: FIRM.name,
      locale: 'ko_KR',
      title: post.seoTitle,
      description: post.summary,
      modifiedTime: post.reviewedAt,
      images: [post.cover ?? '/og.png'],
    },
    ...(post.draft && { robots: { index: false } }),
  }
}

const DISCLAIMER: Record<BlogCategory, string> = {
  claim:
    '이 글은 항공 지연·결항 보상에 관한 일반적인 정보를 제공하기 위한 것으로, 개별 사안에 대한 법률 자문이 아닙니다. 규정과 법령은 바뀔 수 있고, 보상 여부와 금액은 항공편과 지연·결항 사유 등 구체적인 사실관계에 따라 달라집니다.',
  aviation:
    '이 글은 항공 운항에 관한 일반적인 정보를 정리한 것으로, 항공사·공항·국가마다 운영 방식이 다를 수 있습니다. 개별 항공편의 보상 여부는 실제 운항 기록과 사유에 따라 달라집니다.',
}

export default function GuidePostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  // 함께 보면 좋은 글: 글에서 related로 직접 지정한 것만 보여 줍니다 (없으면 칸을 숨깁니다)
  const all = getPosts()
  const relatedPosts = post.related.map((s) => all.find((p) => p.slug === s && p.slug !== post.slug)).filter((p): p is NonNullable<typeof p> => !!p)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seoTitle,
      description: post.summary,
      dateModified: post.reviewedAt,
      author: { '@type': 'Organization', name: FIRM.name },
      publisher: { '@type': 'Organization', name: FIRM.name, logo: `${SITE_URL}/images/logo.png` },
      mainEntityOfPage: `${SITE_URL}/guide/${post.slug}`,
    },
    ...(post.faq.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }]
      : []),
  ]

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-navy py-14">
        <div className="container-wide section-padding max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
            <Link href="/guide" className="text-white/60 hover:text-white transition-colors">항공 보상 가이드</Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className={`badge text-xs ${CATEGORY_COLORS[post.category]}`}>{BLOG_CATEGORY_LABELS[post.category]}</span>
            {post.draft && <DraftBadge />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight text-balance break-keep">{post.seoTitle}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/60 text-sm mt-4">
            <span className="inline-flex items-center gap-1.5"><PenLine className="w-4 h-4" />{post.author}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarCheck className="w-4 h-4" />{formatReviewed(post.reviewedAt)}</span>
          </div>
        </div>
      </div>

      <div className="container-wide section-padding py-12 max-w-3xl">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10">
          <Image src={coverOf(post)} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
        {/* 본문에 핵심 정리 상자가 없을 때만 목록용 설명을 대신 보여 줍니다 */}
        {!post.html?.includes('g-summary') && <p className="text-lg text-gray-600 leading-relaxed mb-8 break-keep">{post.summary}</p>}
        {post.html && <article className="guide-body prose prose-gray max-w-none prose-headings:text-navy prose-a:text-navy prose-strong:text-navy" dangerouslySetInnerHTML={{ __html: post.html }} />}

        {/* 법률 정보 안내 */}
        <p className="mt-12 rounded-xl bg-gray-50 border border-gray-200 px-5 py-4 text-sm text-gray-500 leading-relaxed break-keep">
          {DISCLAIMER[post.category]}
        </p>

        {relatedPosts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-extrabold text-navy mb-3">함께 보면 좋은 글</h2>
            <ul className="divide-y divide-gray-100 border-y border-gray-100">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/guide/${p.slug}`} className="flex items-center justify-between gap-3 py-3 text-[15px] text-navy hover:text-orange-dark transition-colors">
                    <span className="break-keep">{p.title}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 text-gray-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ArticleCTA cta={post.cta} />

        {/* 작성·검토 표시 — 가이드는 발행일 대신 검토일을 적습니다 */}
        <p className="mt-8 text-sm text-gray-500 leading-relaxed break-keep">
          작성 · {post.author}<br />
          검토 · {post.reviewedAt.slice(0, 4)}년 {Number(post.reviewedAt.slice(5, 7))}월 기준으로 내용을 확인했습니다. 규정·법령이 바뀌면 갱신합니다.
        </p>

        <Link href="/guide" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange transition-colors mt-8">
          <ArrowLeft className="w-4 h-4" /> 항공 보상 가이드 목록
        </Link>
      </div>
    </div>
  )
}
