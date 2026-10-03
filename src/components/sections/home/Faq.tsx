import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { FaqItem } from '@/lib/types'
import FaqList from '@/components/content/FaqList'

// 홈의 자주 묻는 질문 — 앞쪽 질문 몇 개만 보여 주고 전체는 /faq로 보냅니다. 게시할 질문이 없으면 섹션을 숨깁니다.
// (검색엔진용 구조화 데이터는 /faq 페이지에만 넣습니다)
export default function Faq({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="py-20 sm:py-24 bg-surface">
      <div className="container-wide section-padding max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-title">자주 묻는 질문</h2>
          <p className="section-subtitle">접수 전에 많이 궁금해하시는 내용을 모았습니다.</p>
        </div>

        <FaqList items={items} />

        <div className="text-center mt-10">
          <Link href="/faq" className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-orange-dark transition-colors">
            자주 묻는 질문 전체 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
