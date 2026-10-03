import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getCase, getCases } from '@/lib/content'
import { CASE_TYPE_LABELS } from '@/lib/types'
import { CASE_TYPE_COLORS } from '@/components/content/CaseCard'
import { formatDate } from '@/components/content/PostCard'
import DraftBadge from '@/components/content/DraftBadge'
import ArticleCTA from '@/components/content/ArticleCTA'

export const dynamicParams = false

// 본문이 있는 사례만 상세 페이지를 만듭니다.
export function generateStaticParams() {
  return getCases().filter((c) => c.html).map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCase(params.slug)
  if (!c) return {}
  return {
    title: `${c.airline} ${c.route} ${CASE_TYPE_LABELS[c.type]} 보상 사례`,
    description: c.summary,
    alternates: { canonical: `/cases/${c.slug}` },
    ...(c.draft && { robots: { index: false } }),
  }
}

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const c = getCase(params.slug)
  if (!c?.html) notFound()

  const facts = [
    ['항공사', c.airline],
    ['노선', c.route],
    ['운항일', formatDate(c.flightDate)],
    ['지연', c.delay],
  ]

  return (
    <div>
      <div className="bg-navy py-14">
        <div className="container-wide section-padding max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`badge text-xs ${CASE_TYPE_COLORS[c.type]}`}>{CASE_TYPE_LABELS[c.type]}</span>
            {c.draft && <DraftBadge />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight text-balance break-keep">{c.summary}</h1>
        </div>
      </div>

      <div className="container-wide section-padding py-12 max-w-3xl">
        <div className="card p-6 grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
          {facts.map(([label, value]) => (
            <div key={label}>
              <div className="text-xs text-gray-500 mb-1">{label}</div>
              <div className="font-semibold text-navy text-sm">{value}</div>
            </div>
          ))}
          <div>
            <div className="text-xs text-gray-500 mb-1">보상금액</div>
            <div className="font-extrabold text-navy">{c.amount.toLocaleString()}원</div>
          </div>
        </div>

        <article className="prose prose-gray max-w-none prose-headings:text-navy prose-a:text-navy prose-strong:text-navy" dangerouslySetInnerHTML={{ __html: c.html }} />
        <p className="mt-8 text-xs text-gray-500">사건마다 결과가 다르며, 같은 금액을 보장하지 않습니다.</p>

        <ArticleCTA />

        <Link href="/cases" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange transition-colors mt-10">
          <ArrowLeft className="w-4 h-4" /> 보상 사례 목록
        </Link>
      </div>
    </div>
  )
}
