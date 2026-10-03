import Image from 'next/image'
import type { Metadata } from 'next'
import { Clock, XCircle, CheckCircle, ArrowRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'
import { PROCESS_STEPS } from '@/lib/process'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '서비스 안내',
  description: '항공 지연·결항에 대한 법무법인 명의 전문 보상 서비스를 안내합니다.',
}

// 비용 안내 — 자주 묻는 질문(content/faq/01-cost.md)과 같은 내용을 유지해 주세요
const fees = [
  { step: '접수·보상 가능 여부 판단', fee: <>비용 없음</> },
  { step: '항공사 청구', fee: <>보상금을 받은 경우에만 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</> },
  { step: '공동소송', fee: <>참여 동의 시 소송 진행비 1인 <strong className="text-navy">1만 원</strong> + 판결금·합의금을 받은 경우 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</> },
]

const feeNotes = [
  '성공보수는 항공사로부터 실제로 받은 금액을 기준으로 계산합니다.',
  '소송 진행비는 인지대·송달료 등에 쓰이는 정액입니다. 법인이 소송을 제기하지 않게 되면 돌려드립니다.',
  '공동소송은 같은 항공사 사건을 운항일 기준 6개월 단위로 모아 진행합니다 (1~6월 운항분은 8월 중, 7~12월 운항분은 다음 해 2월 중 소장 접수).',
  '소송에서는 한국 법원이 한국법에 따라 판단하며, 재판부마다 인정 금액이 달라 EU 규정 금액보다 적을 수 있습니다.',
]

const services = [
  {
    id: 'delay',
    icon: Clock,
    title: '항공 지연 보상',
    img: '/images/service-delay.jpg',
    imgLabel: '출발 안내 전광판에 표시된 항공편 지연 안내',
    desc: '항공편이 3시간 이상 지연된 경우 EU261 또는 소비자보호원 기준에 따라 보상을 청구할 수 있습니다. 지연 사유가 항공사 귀책인지 여부를 전문적으로 분석하여 청구합니다.',
    bases: ['EU261 규정 (유럽 출도착 노선)', '몬트리올 협약 (국제선)', '소비자분쟁해결기준 (국내선)'],
    table: [
      { range: '3시간 미만', eu: '-', domestic: '-' },
      { range: '3~5시간', eu: '€250~400', domestic: '운임의 10%' },
      { range: '5시간 이상', eu: '€400~600', domestic: '운임의 20%' },
    ],
  },
  {
    id: 'cancel',
    icon: XCircle,
    title: '항공 결항 보상',
    img: '/images/service-cancel.jpg',
    imgLabel: '비 내리는 밤, 승객이 떠난 탑승구에 남은 여행가방',
    desc: '출발 14일 이내 통보된 결항에 대해 대체편 제공 또는 현금 보상을 청구할 수 있습니다. 숙박비·식비·대체 교통비 등 결항으로 생긴 손해도 함께 청구합니다.',
    bases: ['EU261 규정', '몬트리올 협약', '소비자분쟁해결기준'],
    table: [
      { range: '14일 이전 통보', eu: '보상 없음', domestic: '대체편 제공' },
      { range: '7~14일 전', eu: '€125~300', domestic: '운임 환급' },
      { range: '7일 이내', eu: '€250~600', domestic: '운임+위약금' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      <PageHeader title="서비스 안내" subtitle="항공 지연·결항 보상 청구를 안내합니다" />

      {/* Process flow infographic */}
      <div className="bg-gray-50 py-16 border-b">
        <div className="container-wide section-padding max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-extrabold text-navy mb-12 tracking-tight">서비스 진행 절차</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative px-4">
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-navy/10" />

            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className={`relative z-10 flex flex-col items-center text-center group ${i === PROCESS_STEPS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <div
                  className={`w-12 h-12 bg-white rounded-full border-[3px] flex items-center justify-center text-navy font-extrabold text-lg shadow-md group-hover:scale-110 group-hover:bg-navy group-hover:text-white transition-all duration-300 mb-4 animate-fade-in-up ${step.when ? 'border-dashed border-navy/50' : 'border-navy'}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {i + 1}
                </div>
                <div className="font-bold text-navy mb-1 text-[15px]">{step.title}</div>
                <div className="text-[13px] text-gray-500 font-medium">{step.short}</div>
                {step.when && <span className="badge bg-orange/10 text-orange-dark mt-2">{step.when}</span>}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/process" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-orange-dark transition-colors">
              단계별 자세한 안내 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16">
        <div className="container-wide section-padding space-y-24">
          {services.map(({ id, icon: Icon, title, img, imgLabel, desc, bases, table }, idx) => (
            <div key={id} id={id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24">
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-navy" />
                </div>
                <h2 className="text-2xl font-extrabold text-navy mb-4">{title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
                <div className="mb-6">
                  <div className="text-sm font-semibold text-navy mb-2">적용 법률 기준</div>
                  <ul className="space-y-1.5">
                    {bases.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-navy/60 shrink-0" />{b}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Compensation table */}
                <div className="bg-navy/3 rounded-xl overflow-hidden border border-navy/10">
                  <div className="grid grid-cols-3 bg-navy text-white text-xs font-semibold px-4 py-2.5">
                    <span>구간</span><span>유럽 기준</span><span>유럽 외 기준</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="col-span-2 flex flex-col">
                      {table.map((row) => (
                        <div key={row.range} className="grid grid-cols-2 px-4 py-2.5 text-sm border-t border-navy/5">
                          <span className="text-navy font-medium">{row.range}</span>
                          <span className="text-navy font-semibold">{row.eu}</span>
                        </div>
                      ))}
                    </div>
                    <div className="col-span-1 flex items-center justify-center text-center px-2 py-2.5 text-[13px] text-gray-500 border-l border-t border-navy/5 bg-gray-50 font-medium leading-[1.6]">
                      개별 협상<br />또는 판결
                    </div>
                  </div>
                </div>
                <Link href="/intake" className="btn-navy mt-6 inline-flex">사건 접수하기</Link>
              </div>
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                {img
                  ? (
                    <div className="relative w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden">
                      <Image src={img} alt={imgLabel} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )
                  : <ImagePlaceholder label={imgLabel} className="w-full rounded-2xl shadow-lg" aspectRatio="aspect-[4/3]" />
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 비용 안내 */}
      <div id="cost" className="bg-gray-50 py-16 border-t scroll-mt-24">
        <div className="container-wide section-padding max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-extrabold text-navy mb-3 tracking-tight">비용 안내</h2>
          <p className="text-center text-gray-500 mb-10">보상금을 받지 못하면 성공보수는 없습니다.</p>
          <div className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm">
            {fees.map(({ step, fee }, i) => (
              <div key={step} className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-6 py-5 ${i ? 'border-t border-navy/5' : ''}`}>
                <div className="font-bold text-navy">{step}</div>
                <div className="text-gray-700 leading-relaxed">{fee}</div>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {feeNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />{note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
