import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Phone } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SectionNav from '@/components/layout/SectionNav'
import FaqList from '@/components/content/FaqList'
import { getFaqs } from '@/lib/content'
import { FIRM } from '@/lib/site'
import { FAQ_CATEGORY_LABELS, type FaqCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description: '비용, 접수 후 연락, 필요한 서류, 보상 기준, 공동소송 일정 등 항공 지연·결항 보상에 대해 자주 묻는 질문과 답변입니다.',
}

export default function FaqPage() {
  const faqs = getFaqs()
  // 분류 순서대로 묶고, 게시된 질문이 없는 분류는 뺍니다
  const groups = (Object.keys(FAQ_CATEGORY_LABELS) as FaqCategory[])
    .map((key) => ({ key, label: FAQ_CATEGORY_LABELS[key], items: faqs.filter((f) => f.category === key) }))
    .filter((g) => g.items.length > 0)

  // 검색 결과에 질문·답변으로 노출될 수 있도록 구조화 데이터를 함께 넣습니다.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.text },
    })),
  }

  return (
    <div>
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <PageHeader title="자주 묻는 질문" subtitle="비용·진행·보상 기준·소송에 대해 많이 묻는 질문을 모았습니다" />
      {groups.length > 1 && <SectionNav items={groups.map((g) => ({ href: `#${g.key}`, label: g.label }))} />}

      <div className="container-wide section-padding max-w-3xl py-14 sm:py-16 space-y-14">
        {groups.map((g) => (
          <section key={g.key} id={g.key} className="scroll-mt-32">
            <h2 className="text-xl sm:text-2xl font-extrabold text-navy mb-5">{g.label}</h2>
            <FaqList items={g.items} />
          </section>
        ))}
        {groups.length === 0 && <p className="text-center text-gray-500 py-10">자주 묻는 질문을 정리하고 있습니다.</p>}

        <div className="rounded-2xl bg-navy px-6 py-10 sm:px-10 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">찾는 답이 없으신가요?</h2>
          <p className="text-white/70 mb-7">사건을 접수해 주시면 영업일 기준 2일 이내에 연락드립니다.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/intake" className="btn-primary px-8 py-3.5">
              <FileText className="w-5 h-5" />
              사건 접수하기
            </Link>
            <a href={`tel:${FIRM.phone}`} className="btn-outline px-8 py-3.5">
              <Phone className="w-5 h-5" />
              전화 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
