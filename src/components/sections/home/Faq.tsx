import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/types'
import DraftBadge from '@/components/content/DraftBadge'

// 자주 묻는 질문 — content/faq 폴더에서 읽습니다. 게시할 질문이 없으면 섹션을 숨깁니다.
export default function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null

  // 검색 결과에 질문·답변으로 노출될 수 있도록 구조화 데이터를 함께 넣습니다.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.text },
    })),
  }

  return (
    <section className="py-20 sm:py-24 bg-surface" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-wide section-padding max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-title">자주 묻는 질문</h2>
          <p className="section-subtitle">접수 전에 많이 궁금해하시는 내용을 모았습니다.</p>
        </div>

        <div className="space-y-3">
          {items.map((f) => (
            <details key={f.slug} className="group rounded-2xl border border-gray-200 bg-white open:shadow-sm transition-colors">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-bold text-navy text-[15px] sm:text-base flex flex-wrap items-center gap-2">
                  {f.question}
                  {f.draft && <DraftBadge />}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div
                className="px-6 pb-6 prose prose-sm prose-gray max-w-none prose-strong:text-navy prose-li:my-0.5"
                dangerouslySetInnerHTML={{ __html: f.html }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
