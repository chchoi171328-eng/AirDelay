'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { ArrowRight, FileText } from 'lucide-react'

export default function Hero() {
  const router = useRouter()
  const [airline, setAirline] = useState('')
  const [type, setType] = useState('')

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (airline) params.append('airline', airline)
    if (type) params.append('type', type)
    router.push(`/intake?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="고화질 비행기 / 공항 터미널 창밖 전경"
          className="w-full h-full rounded-none"
          aspectRatio=""
        />
        {/* Dark overlay for text readability, but lighter on the right for form */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide section-padding w-full py-20 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-wide">성공 시에만 수임료 발생</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight text-balance tracking-tight">
              지연된 비행기,<br />
              <span className="text-orange">간편하게</span> 보상받으세요
            </h1>

            <p className="mt-6 text-white/80 text-lg sm:text-xl leading-relaxed max-w-lg font-medium">
              EU261 및 몬트리올 협약 기준 적용<br />
              1인당 최대 <strong className="text-gold text-2xl">1,200,000원</strong>
            </p>

            <div className="mt-10 flex gap-6 sm:gap-10">
              {[
                { label: '한국·영국 변호사', value: '직접 처리' },
                { label: '착수금·선불금', value: '0원' },
                { label: '국내외 모든 항공사', value: '청구 가능' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-white font-bold text-lg">{item.value}</div>
                  <div className="text-white/50 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Inline Form */}
          <div className="lg:justify-self-end w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <h3 className="text-navy font-black text-xl leading-none">내 보상금액 확인하기</h3>
                  <p className="text-gray-400 text-xs mt-1.5">1분 만에 무료로 진단해보세요</p>
                </div>
              </div>

              <form onSubmit={handleCheck} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">이용하신 항공사</label>
                  <select 
                    value={airline} 
                    onChange={(e) => setAirline(e.target.value)}
                    className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  >
                    <option value="">항공사를 선택해주세요</option>
                    <option value="대한항공">대한항공</option>
                    <option value="아시아나항공">아시아나항공</option>
                    <option value="제주항공">제주항공</option>
                    <option value="외항사">기타 외항사</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy mb-1.5">피해 유형</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange/30 focus:border-orange transition-all"
                  >
                    <option value="">어떤 피해를 입으셨나요?</option>
                    <option value="delay">항공기 지연 (3시간 이상)</option>
                    <option value="cancel">항공기 결항</option>
                    <option value="denied">탑승 거부 (오버부킹)</option>
                    <option value="baggage">수하물 지연/분실</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="btn-primary w-full text-lg py-4 group"
                  >
                    무료 사건 접수하기
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3 font-medium">
                    안심하세요. 승소 전까지 비용은 일체 발생하지 않습니다.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
