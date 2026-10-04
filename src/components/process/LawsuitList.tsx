import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LAWSUIT_STAGE_LABELS } from '@/lib/types'
import type { Lawsuit, LawsuitStage } from '@/lib/types'

// 진행 중인 공동소송 — 단계만 공개합니다 (원고 수·금액·사건번호 없음). 결과는 보상 사례 페이지가 맡습니다.
const STEPS: LawsuitStage[] = ['filed', 'trial', 'judgment', 'closed']

const ym = (s: string) => `${s.slice(0, 4)}년 ${Number(s.slice(5, 7))}월`
const ymd = (s: string) => `${s.slice(0, 4)}.${s.slice(5, 7)}.${s.slice(8, 10)}`

export default function LawsuitList({ lawsuits, caseHref }: { lawsuits: Lawsuit[]; caseHref: (slug: string) => string | null }) {
  return (
    <ul className="space-y-3">
      {lawsuits.map((l) => {
        const current = STEPS.indexOf(l.stage) // 준비 단계면 -1
        const href = l.caseSlug ? caseHref(l.caseSlug) : null
        return (
          <li key={l.slug} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="break-keep">
                <span className="font-bold text-navy text-lg mr-2">{l.airline}</span>
                <span className="text-sm text-gray-500">{l.flights}</span>
              </p>
              <span className={`text-xs font-bold rounded-full px-2.5 py-1 ${current >= 2 ? 'bg-navy/5 text-navy' : 'bg-orange/10 text-orange'}`}>
                {LAWSUIT_STAGE_LABELS[l.stage]}
              </span>
            </div>

            <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label="진행 단계">
              {STEPS.map((s, i) => (
                <li key={s} className="min-w-0">
                  <div className={`h-1.5 rounded-full ${i <= current ? 'bg-navy' : 'bg-gray-200'}`} />
                  <p className={`mt-1.5 text-xs break-keep ${i === current ? 'font-bold text-navy' : 'text-gray-400'}`}>{LAWSUIT_STAGE_LABELS[s]}</p>
                </li>
              ))}
            </ol>

            <p className="mt-4 text-sm text-gray-500 break-keep">
              {[l.filedAt && `소장 접수 ${ym(l.filedAt)}`, l.court, `${ymd(l.updatedAt)} 기준`].filter(Boolean).join(' · ')}
            </p>
            {l.note && <p className="mt-1.5 text-sm text-gray-700 break-keep">{l.note}</p>}
            {href && (
              <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:underline">
                결과 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
