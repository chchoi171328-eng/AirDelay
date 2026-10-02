import { FileEdit, Search, Gavel, Banknote } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/process'

const ICONS = [FileEdit, Search, Gavel, Banknote]

// 진행 절차 — 데스크톱은 가로 4단, 모바일은 세로 목록
export default function ProcessTimeline() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="container-wide section-padding">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">복잡한 항공 보상, <br className="sm:hidden" />저희가 대신 처리합니다</h2>
          <p className="section-subtitle">고객님은 접수만 하세요. 청구는 변호사가 맡습니다.</p>
        </div>

        <div className="relative">
          {/* 데스크톱: 단계를 잇는 가로선 */}
          <div aria-hidden="true" className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-navy/15" />
        <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-6">

          {PROCESS_STEPS.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-sm ring-8 ring-surface">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="lg:mt-5">
                  <div className="text-xs font-bold tracking-wider text-navy/70 mb-1">STEP {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>
        </div>
      </div>
    </section>
  )
}
