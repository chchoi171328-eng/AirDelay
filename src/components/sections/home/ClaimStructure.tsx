import Link from 'next/link'
import { Send, Users, FileCheck, ArrowRight } from 'lucide-react'

// 청구 → 소송 두 칸만 단계로 두고, 외국 정액 보상 규정에 따른 청구는 아래 상자로 따로 둡니다.
// (모든 항공사에 해당하지 않아 단계처럼 보이면 안 됩니다)
const steps = [
  {
    icon: Send,
    label: 'STEP 01 · 청구',
    title: '항공사 본사 쪽으로 청구합니다',
    desc: '외국 항공사의 한국 영업소는 보상을 결정할 권한이 없는 경우가 많습니다. 그래서 영국 변호사와 함께 항공사 본사 쪽 창구로 청구합니다.',
  },
  {
    icon: Users,
    label: 'STEP 02 · 소송',
    title: '거절되면 한국 법원에서 소송합니다',
    desc: '유럽 밖에 사는 승객의 청구는 거절되거나 답이 없는 경우가 적지 않습니다. 한국 법원 소송은 한국 변호사만 대리할 수 있으므로, 청구한 법무법인이 같은 항공사 사건을 모아 공동소송을 제기합니다.',
    note: '소송으로 진행되는 경우에만, 부대비용을 고려해 소송마다 진행비 1인 1만\u00a0원을 받습니다. 성공보수 요율은 소송도 30%(부가세 별도)로 같습니다.',
  },
]

export default function ClaimStructure() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="container-wide section-padding">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">청구부터 소송까지, <br className="sm:hidden" />한 곳에서 맡습니다</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            항공사가 거절해도 맡길 곳을 다시 찾을 필요가 없습니다. 청구한 법무법인이 그대로 한국 법원 소송까지 이어 갑니다.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-2">
            {steps.map(({ icon: Icon, label, title, desc, note }) => (
              <div key={title} className="bg-surface border border-gray-100 rounded-2xl p-7 sm:p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-navy/70">{label}</span>
                </div>
                <h3 className="text-xl font-extrabold text-navy mb-3 break-keep">{title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed break-keep">{desc}</p>
                {note && (
                  <p className="mt-auto pt-5 text-[13px] leading-relaxed text-navy/80 font-medium break-keep">{note}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 bg-navy text-white rounded-2xl p-7 sm:p-8 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-gold flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold mb-3 break-keep">외국의 정액 보상 규정에 따른 청구</h3>
              <p className="text-white/80 text-[15px] leading-relaxed break-keep">
                법무법인 명은 정액 보상 규정이 있는 나라와 그 규정을 적용할 수 있는 항공사를 정리해 두고 있습니다.
                접수하신 항공편이 해당한다고 판단되면 한국 법원에서도 그 규정에 따른 금액을 청구합니다.
              </p>
              <Link
                href="/guide/foreign-compensation-rules-korean-court"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-white transition-colors"
              >
                <span className="break-keep">법무법인 명이 이끌어낸 2026년 11월 대법원 판결 보기</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
