import type { Metadata } from 'next'
import Link from 'next/link'
import { Banknote } from 'lucide-react'
import { getCases } from '@/lib/content'
import { CASE_TYPE_LABELS } from '@/lib/types'
import FilterTabs from '@/components/ui/FilterTabs'
import CaseCard from '@/components/content/CaseCard'
import PageHeader from '@/components/layout/PageHeader'

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
      <PageHeader title="승소 사례" subtitle="실제 보상을 이끌어낸 사례들입니다" />

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
          <Banknote className="w-10 h-10 text-navy mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-navy mb-2">나도 보상받을 수 있을까요?</h2>
          <p className="text-gray-500 mb-6">사건을 접수하시면 보상 가능 여부를 판단해 드립니다</p>
          <Link href="/intake" className="btn-primary">사건 접수하기</Link>
        </div>
      </div>
    </div>
  )
}
