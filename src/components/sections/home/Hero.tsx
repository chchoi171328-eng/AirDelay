'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileText } from 'lucide-react'

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="공항 배경"
          className="w-full h-full object-cover"
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

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.4] tracking-tight">
              항공편 지연보상,<br />
              <span className="text-orange">한국/영국 변호사</span>에게 맡기세요
            </h1>

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
              <button
                onClick={() => router.push('/intake')}
                className="btn-primary w-full text-lg py-5 group"
              >
                <FileText className="w-5 h-5" />
                무료 사건 접수하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                안심하세요. 승소 전까지 비용은 일체 발생하지 않습니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
