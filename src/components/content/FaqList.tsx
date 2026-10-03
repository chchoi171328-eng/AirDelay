import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/types'
import DraftBadge from './DraftBadge'

// 질문을 누르면 답이 펼쳐지는 목록 — 홈과 자주 묻는 질문 페이지가 함께 씁니다
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
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
  )
}
