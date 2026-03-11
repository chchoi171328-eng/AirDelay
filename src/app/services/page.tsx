import type { Metadata } from 'next'
import { Clock, XCircle, UserX, Luggage, CheckCircle, ArrowRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '서비스 안내',
  description: '항공 지연·결항·탑승거부·수하물 피해에 대한 법무법인 명의 전문 보상 서비스를 안내합니다.',
}

const services = [
  {
    id: 'delay',
    icon: Clock,
    title: '항공 지연 보상',
    img: '/images/service-delay.png',
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
    img: null,
    imgLabel: '결항 안내판 / 빈 게이트 사진',
    desc: '출발 14일 이내 통보된 결항에 대해 대체편 제공 또는 현금 보상을 청구할 수 있습니다. 숙박비·식비·대체 교통비 등 실비도 함께 청구합니다.',
    bases: ['EU261 규정', '몬트리올 협약', '소비자분쟁해결기준'],
    table: [
      { range: '14일 이전 통보', eu: '보상 없음', domestic: '대체편 제공' },
      { range: '7~14일 전', eu: '€125~300', domestic: '운임 환급' },
      { range: '7일 이내', eu: '€250~600', domestic: '운임+위약금' },
    ],
  },
  {
    id: 'denied',
    icon: UserX,
    title: '탑승 거부 (오버부킹)',
    img: null,
    imgLabel: '공항 게이트 / 탑승 대기 사진',
    desc: '항공사의 오버부킹으로 탑승을 거부당한 경우 즉시 보상을 받을 수 있습니다. 대체편 탑승 여부와 무관하게 EU261 기준의 현금 보상을 청구할 수 있습니다.',
    bases: ['EU261 규정 (최대 €600)', '소비자분쟁해결기준'],
    table: [
      { range: '1500km 미만', eu: '€250', domestic: '-' },
      { range: '1500~3500km', eu: '€400', domestic: '-' },
      { range: '3500km 초과', eu: '€600', domestic: '-' },
    ],
  },
  {
    id: 'baggage',
    icon: Luggage,
    title: '수하물 피해 보상',
    img: null,
    imgLabel: '수하물 벨트 / 파손 가방 사진',
    desc: '수하물 분실·파손·지연에 대해 몬트리올 협약에 따라 최대 1,288 SDR(약 230만원)을 청구할 수 있습니다. 고가품 신고 여부에 따른 전략적 청구를 도와드립니다.',
    bases: ['몬트리올 협약 (최대 1,288 SDR)', '소비자분쟁해결기준'],
    table: [
      { range: '파손', eu: '수리비 / 현물보상', domestic: '수리비' },
      { range: '지연 (21일 이내)', eu: '합리적 비용', domestic: '운임 10%' },
      { range: '분실 (21일 초과)', eu: '최대 1,288 SDR', domestic: '구입가 기준' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">서비스 안내</h1>
          <p className="text-white/60 text-lg">항공 피해의 모든 유형, 법무법인 명이 해결합니다</p>
        </div>
      </div>

      {/* Process flow infographic */}
      <div className="bg-gray-50 py-12 border-b">
        <div className="container-wide section-padding">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {['사건 접수', '서류 검토', '관할 판단 (한국/영국)', '협상 또는 소송', '보상 수령'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="font-medium text-navy">{step}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-gold" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16">
        <div className="container-wide section-padding space-y-24">
          {services.map(({ id, icon: Icon, title, img, imgLabel, desc, bases, table }, idx) => (
            <div key={id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
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
                    <span>구간</span><span>국제선 기준</span><span>국내선 기준</span>
                  </div>
                  {table.map((row) => (
                    <div key={row.range} className="grid grid-cols-3 px-4 py-2.5 text-sm border-t border-navy/5">
                      <span className="text-navy font-medium">{row.range}</span>
                      <span className="text-gold font-semibold">{row.eu}</span>
                      <span className="text-gray-600">{row.domestic}</span>
                    </div>
                  ))}
                </div>
                <Link href="/intake" className="btn-navy mt-6 inline-flex">무료 사건 접수</Link>
              </div>
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                {img
                  ? <img src={img} alt={imgLabel} className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]" />
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
