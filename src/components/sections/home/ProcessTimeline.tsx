import Link from 'next/link'
import { FileEdit, Search, Send, Users, Banknote, ArrowRight } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/process'

const ICONS = [FileEdit, Search, Send, Users, Banknote]

// 진행 절차 — 데스크톱은 가로 5단, 모바일은 세로 목록. 조건부 단계(공동소송)는 점선 원으로 구분합니다.
export default function ProcessTimeline() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="container-wide section-padding">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">복잡한 항공 보상, <br className="sm:hidden" />저희가 대신 처리합니다</h2>
          <p className="section-subtitle">고객님은 접수만 하세요. 항공사 청구부터 소송까지 한국·영국 변호사가 함께 맡습니다.</p>
        </div>

        <div className="relative">
          {/* 데스크톱: 단계를 잇는 가로선 */}
          <div aria-hidden="true" className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-navy/15" />
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                  <div
                    className={`relative z-10 shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-sm ring-8 ring-surface ${
                      step.when ? 'bg-white text-navy border-2 border-dashed border-navy/50' : 'bg-navy text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="lg:mt-5">
                    <div className="flex flex-wrap items-center gap-2 mb-1 lg:min-h-6 lg:justify-center">
                      <span className="text-xs font-bold tracking-wider text-navy/70">STEP {String(i + 1).padStart(2, '0')}</span>
                      {step.when && <span className="badge bg-orange/10 text-orange-dark">{step.when}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed break-keep">{step.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="text-center mt-12">
          <Link href="/process" className="inline-flex items-center gap-1.5 font-semibold text-navy hover:text-orange-dark transition-colors">
            진행 절차 자세히 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
