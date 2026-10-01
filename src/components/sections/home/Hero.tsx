'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const fieldCls = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[15px] bg-white focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy transition-all'

export default function Hero() {
  const router = useRouter()
  const [trip, setTrip] = useState({ origin: '', destination: '', date: '' })

  // 입력한 내용을 접수 양식 1단계에 미리 채워서 넘깁니다 (비워 두어도 됩니다).
  const start = (e: React.FormEvent) => {
    e.preventDefault()
    const query = new URLSearchParams(Object.entries(trip).filter(([, v]) => v.trim())).toString()
    router.push(query ? `/intake?${query}` : '/intake')
  }

  return (
    <section className="relative lg:min-h-[95vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        {/* Dark overlay for text readability, but lighter on the right for form */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide section-padding w-full py-10 sm:py-20 lg:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">

          {/* Left Text */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-wide">성공 시에만 수임료 발생</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-7xl font-black text-white leading-[1.3] sm:leading-[1.4] tracking-tight mb-6 sm:mb-8">
              항공편 지연보상,<br />
              <span className="text-orange">한국/영국 변호사</span>에게 맡기세요
            </h1>

            <div className="mt-6 sm:mt-10 flex gap-6 sm:gap-10">
              {[
                { label: '한국·영국 변호사', value: '직접 처리' },
                { label: '착수금·선불금', value: '0원' },
                { label: '국내외 모든 항공사', value: '청구 가능' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-white font-bold text-lg">{item.value}</div>
                  <div className="text-white/75 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 간편 확인 양식 */}
          <div className="lg:justify-self-end w-full max-w-md">
            <form onSubmit={start} className="bg-white/95 backdrop-blur-md border border-white/50 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] p-7 sm:p-9 animate-fade-in-up">
              <h2 className="text-xl font-black text-navy mb-1">내 항공편, 보상받을 수 있을까요?</h2>
              <p className="text-sm text-gray-500 mb-5">항공편 정보를 넣고 무료 검토를 신청하세요.</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="hero-origin" className="block text-xs font-semibold text-navy mb-1">출발지</label>
                  <input id="hero-origin" type="text" placeholder="예: 파리" maxLength={50} value={trip.origin}
                    onChange={(e) => setTrip((t) => ({ ...t, origin: e.target.value }))} className={fieldCls} />
                </div>
                <div>
                  <label htmlFor="hero-destination" className="block text-xs font-semibold text-navy mb-1">도착지</label>
                  <input id="hero-destination" type="text" placeholder="예: 인천" maxLength={50} value={trip.destination}
                    onChange={(e) => setTrip((t) => ({ ...t, destination: e.target.value }))} className={fieldCls} />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="hero-date" className="block text-xs font-semibold text-navy mb-1">운항 날짜</label>
                <input id="hero-date" type="date" value={trip.date}
                  onChange={(e) => setTrip((t) => ({ ...t, date: e.target.value }))} className={fieldCls} />
              </div>
              <button type="submit" className="btn-primary w-full text-lg py-4 group">
                무료로 보상 검토받기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-500 mt-4 font-medium">
                안심하세요. 승소 전까지 비용은 일체 발생하지 않습니다.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
