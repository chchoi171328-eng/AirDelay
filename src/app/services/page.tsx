import Image from 'next/image'
import type { Metadata } from 'next'
import { Clock, XCircle, CheckCircle } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'
import { PROCESS_STEPS } from '@/lib/process'

export const metadata: Metadata = {
  title: '서비스 안내',
  description: '항공 지연·결항에 대한 법무법인 명의 전문 보상 서비스를 안내합니다.',
}

const services = [
  {
    id: 'delay',
    icon: Clock,
    title: '항공 지연 보상',
    img: '/images/service-delay.jpg',
    imgLabel: '공항 출발 전광판 / 지연 안내 사진',
    desc: '항공편이 3시간 이상 지연된 경우 EU261 또는 소비자보호원 기준에 따라 보상을 청구할 수 있습니다. 지연 사유가 항공사 귀책인지 여부를 전문적으로 분석하여 최대 보상을 이끌어냅니다.',
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
    imgLabel: '결항 안내판 / 빈 게이트 사진',
    desc: '출발 14일 이내 통보된 결항에 대해 대체편 제공 또는 현금 보상을 청구할 수 있습니다. 숙박비·식비·대체 교통비 등 실비도 함께 청구합니다.',
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
      {/* Page header */}
      <div className="bg-navy pt-20 pb-24 relative overflow-hidden">
        <div className="container-wide section-padding text-center relative z-10">
          <h1 className="text-4xl font-black text-white mb-4">서비스 안내</h1>
          <p className="text-white/60 text-lg">항공 피해의 모든 유형, 법무법인 명이 해결합니다</p>
        </div>
        <svg className="absolute bottom-0 w-full h-10 text-gray-50 translate-y-px" preserveAspectRatio="none" viewBox="0 0 1440 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40h1440V0c-184.22 24-421.1 40-720 40S184.22 24 0 0v40z" />
        </svg>
      </div>

      {/* Process flow infographic */}
      <div className="bg-gray-50 pt-8 pb-16 border-b">
        <div className="container-wide section-padding max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-black text-navy mb-12 tracking-tight">서비스 진행 절차</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative px-4">
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-[2px] bg-navy/10" />
            
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white rounded-full border-[3px] border-navy flex items-center justify-center text-navy font-black text-lg shadow-md group-hover:scale-110 group-hover:bg-navy group-hover:text-white transition-all duration-300 mb-4 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  {i + 1}
                </div>
                <div className="font-bold text-navy mb-1 text-[15px]">{step.title}</div>
                <div className="text-[13px] text-gray-500 font-medium">{step.short}</div>
              </div>
            ))}
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
                <h2 className="text-2xl font-black text-navy mb-4">{title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
                <div className="mb-6">
                  <div className="text-sm font-semibold text-navy mb-2">적용 법률 기준</div>
                  <ul className="space-y-1.5">
                    {bases.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-gold shrink-0" />{b}
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
                          <span className="text-gold font-semibold">{row.eu}</span>
                        </div>
                      ))}
                    </div>
                    <div className="col-span-1 flex items-center justify-center text-center px-2 py-2.5 text-[13px] text-gray-500 border-l border-t border-navy/5 bg-gray-50 font-medium leading-[1.6]">
                      개별 협상<br />또는 판결
                    </div>
                  </div>
                </div>
                <Link href="/intake" className="btn-navy mt-6 inline-flex">무료 사건 접수</Link>
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
    </div>
  )
}
