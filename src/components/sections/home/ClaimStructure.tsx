import Link from 'next/link'
import { Send, Users, FileCheck, ArrowRight } from 'lucide-react'

// 청구 → 소송 → 금액 기준. 앞의 두 칸은 모든 사건이 따르는 순서이고,
// 세 번째 칸은 아직 금액까지 인정된 판결이 없는 내용이라 단계 번호 없이 따로 구분합니다.
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
    desc: '유럽 밖에 사는 승객의 청구는 거절되거나 답이 없는 경우가 적지 않습니다. 한국 법원 소송은 한국 변호사가 대리해야 하므로, 청구한 법무법인이 같은 항공사 사건을 모아 공동소송을 제기합니다.',
    note: '성공보수 요율은 소송도 30%(부가세 별도) 그대로이고, 소송마다 진행비 1인 1만 원을 더 받습니다.',
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

        <div className="grid gap-6 lg:grid-cols-3">
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

          <div className="bg-navy text-white rounded-2xl p-7 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-gold flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold tracking-wider text-gold">금액 기준</span>
            </div>
            <h3 className="text-xl font-extrabold mb-3 break-keep">외국의 정액 보상 규정으로 청구합니다</h3>
            <p className="text-white/80 text-[15px] leading-relaxed break-keep">
              한국 법원이 인정하는 금액은 외국의 정액 보상보다 적은 경향이 있습니다. 법무법인 명의 최철호 변호사는 2026년 11월 대법원에서,
              항공사 약관의 조항을 근거로 외국 규정에 따라 보상을 받을 수 있다는 확인을 받았습니다.
            </p>
            <p className="mt-3 text-white/60 text-[13px] leading-relaxed break-keep">
              이 기준으로 금액까지 인정된 판결은 아직 없으며, 해당하는 항공편은 그 규정에 따라 청구합니다.
            </p>
            <Link
              href="/guide/foreign-compensation-rules-korean-court"
              className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold hover:text-white transition-colors"
            >
              판결 내용 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
