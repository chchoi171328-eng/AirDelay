import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Banknote } from 'lucide-react'
import { getCases } from '@/lib/content'
import { CASE_TYPE_LABELS } from '@/lib/types'
import FilterTabs from '@/components/ui/FilterTabs'
import CaseCard from '@/components/content/CaseCard'

export const metadata: Metadata = {
  title: '승소 사례',
  description: '법무법인 명의 실제 항공 피해 보상 승소 사례를 확인하세요.',
  alternates: { canonical: '/cases' },
}

const TYPE_TABS = Object.entries(CASE_TYPE_LABELS).map(([value, label]) => ({ value, label }))

export default function CasesPage() {
  const cases = getCases()

  return (
    <div>
      <div className="bg-navy pt-20 pb-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-4">승소 사례</h1>
          <p className="text-white/60 text-lg">실제 보상을 이끌어낸 사례들입니다</p>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-64 overflow-hidden">
        <Image src="/images/cases-hero.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/30 to-white" />
      </div>

      <div className="container-wide section-padding py-12">
        {cases.length > 0 ? (
          <FilterTabs
            param="type"
            tabs={TYPE_TABS}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            items={cases.map((c) => ({ key: c.slug, group: c.type, node: <CaseCard c={c} /> }))}
          />
        ) : (
          <p className="text-center text-gray-500 py-10">승소 사례를 정리하고 있습니다.</p>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-navy/3 rounded-2xl p-10 border border-navy/10">
          <Banknote className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-black text-navy mb-2">나도 보상받을 수 있을까요?</h2>
          <p className="text-gray-500 mb-6">무료 사건 접수로 전문가 검토를 받아보세요</p>
          <Link href="/intake" className="btn-primary">무료 사건 접수</Link>
        </div>
      </div>
    </div>
  )
}
