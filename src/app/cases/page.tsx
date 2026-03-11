import type { Metadata } from 'next'
import { getAllCases } from '@/lib/supabase'
import { CASE_TYPE_LABELS } from '@/lib/types'
import type { CaseType } from '@/lib/types'
import { Plane, Calendar, Clock, Banknote, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata: Metadata = {
  title: '승소 사례',
  description: '법무법인 명의 실제 항공 피해 보상 승소 사례를 확인하세요.',
}

const TYPE_FILTERS = [
  { value: '', label: '전체' },
  { value: 'delay', label: '항공 지연' },
  { value: 'cancel', label: '항공 결항' },
  { value: 'denied', label: '탑승 거부' },
  { value: 'baggage', label: '수하물 피해' },
]

// Fallback demo data
const DEMO_CASES = [
  { id: '1', airline: '대한항공', delay_date: '2024-08-15', delay_hours: '5시간 30분', amount: 800000, type: 'delay' as CaseType, summary: '인천→파리 노선 기상 외 사유 지연 보상 청구', detail: null, is_featured: true, created_at: '2024-08-15' },
  { id: '2', airline: '아시아나항공', delay_date: '2024-07-02', delay_hours: '4시간 10분', amount: 600000, type: 'cancel' as CaseType, summary: '인천→런던 노선 갑작스러운 결항 보상', detail: null, is_featured: true, created_at: '2024-07-02' },
  { id: '3', airline: 'British Airways', delay_date: '2024-06-20', delay_hours: '3시간 50분', amount: 1200000, type: 'delay' as CaseType, summary: '런던→인천 EU261 적용 지연 보상', detail: null, is_featured: true, created_at: '2024-06-20' },
  { id: '4', airline: '제주항공', delay_date: '2024-05-10', delay_hours: '6시간 00분', amount: 450000, type: 'denied' as CaseType, summary: '오버부킹으로 인한 탑승 거부 보상 청구', detail: null, is_featured: false, created_at: '2024-05-10' },
  { id: '5', airline: '진에어', delay_date: '2024-04-03', delay_hours: '해당없음', amount: 320000, type: 'baggage' as CaseType, summary: '수하물 분실로 인한 몬트리올 협약 기반 보상', detail: null, is_featured: false, created_at: '2024-04-03' },
  { id: '6', airline: 'Ryanair', delay_date: '2024-03-18', delay_hours: '5시간 10분', amount: 980000, type: 'delay' as CaseType, summary: '런던→바르셀로나 EU261 지연 보상', detail: null, is_featured: false, created_at: '2024-03-18' },
]

export default async function CasesPage() {
  const dbCases = await getAllCases().catch(() => [])
  const cases = dbCases.length > 0 ? dbCases : DEMO_CASES

  const typeColors: Record<CaseType, string> = {
    delay: 'badge-gold',
    cancel: 'bg-red-50 text-red-600',
    denied: 'bg-purple-50 text-purple-600',
    baggage: 'bg-blue-50 text-blue-600',
  }

  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">승소 사례</h1>
          <p className="text-white/60 text-lg">실제 보상을 이끌어낸 사례들입니다</p>
        </div>
      </div>

      {/* Hero image placeholder */}
      <div className="relative h-48 overflow-hidden">
        <ImagePlaceholder label="항공기 / 공항 이미지" className="w-full h-full rounded-none" aspectRatio="" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 to-white" />
      </div>

      <div className="container-wide section-padding py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TYPE_FILTERS.map(({ value, label }) => (
            <span key={value} className={`badge text-sm px-4 py-2 cursor-pointer transition-all
              ${value === '' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-navy/10'}`}>
              {label}
            </span>
          ))}
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.id} className="card p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`badge text-xs mb-2 ${typeColors[c.type] ?? 'badge-gold'}`}>
                    {CASE_TYPE_LABELS[c.type]}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-7 h-7 bg-navy/5 rounded-lg flex items-center justify-center">
                      <Plane className="w-3.5 h-3.5 text-navy" />
                    </div>
                    <span className="font-bold text-navy">{c.airline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">보상금액</div>
                  <div className="text-gold font-black text-lg">{c.amount.toLocaleString()}원</div>
                </div>
              </div>

              {c.summary && <p className="text-gray-500 text-sm leading-relaxed">{c.summary}</p>}

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {c.delay_date}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  {c.delay_hours}
                </div>
              </div>

              {c.detail && (
                <Link href={`/cases/${c.id}`} className="flex items-center gap-1 text-navy text-sm font-semibold hover:text-gold transition-colors">
                  자세히 보기 <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-navy/3 rounded-2xl p-10 border border-navy/10">
          <Banknote className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-black text-navy mb-2">나도 보상받을 수 있을까요?</h2>
          <p className="text-gray-500 mb-6">무료 사건 접수로 전문가 검토를 받아보세요</p>
          <Link href="/intake" className="btn-primary">무료 사건 접수</Link>
        </div>
      </div>
    </div>
  )
}
