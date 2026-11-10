'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Case } from '@/lib/types'

// 모바일은 운항 시기·지연·금액 칸을 글자 폭에 맞춰 좁히고 남는 폭을 항공사 칸에 줍니다.
const COLS = 'grid grid-cols-[2.25rem_minmax(0,1fr)_4.25rem_5rem] gap-x-1.5 sm:grid-cols-4 sm:gap-x-0'

// 띠에서는 지연 시간을 짧게 씁니다: '결항 · 약 72시간 늦게 도착' → '결항 · 72시간'
const shortDelay = (delay: string) => delay.replace(/약 /g, '').replace(' 늦게 도착', '')

export default function RecentCasesTicker({ cases }: { cases: Case[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  // 한 화면(3줄)보다 많을 때만 굴립니다. 끊김 없이 보이도록 목록을 이어 붙입니다.
  const scrolling = cases.length > 3
  const rows = scrolling ? [...cases, ...cases, ...cases] : cases

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!scrolling || reduceMotion) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cases.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [scrolling, reduceMotion, cases.length])

  if (cases.length === 0) return null

  return (
    <section className="bg-navy py-16 relative overflow-hidden border-t border-white/10">
      <div className="container-wide section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-shrink-0 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">최신 보상 내역</h2>
            <p className="text-white/70 mt-2 font-medium">가장 최근 보상 지급이 <br className="hidden lg:block"/>완료된 사건입니다.</p>
            <p className="text-white/50 text-xs mt-2">사건마다 결과가 다르며, 같은 금액을 보장하지 않습니다.</p>
            <Link href="/cases" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm font-semibold mt-4">
              전체 사례 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Ticker Board */}
          <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6 w-full max-w-4xl mx-auto relative">
            {/* Header row */}
            <div className={`${COLS} text-white/60 text-xs font-semibold border-b border-white/10 pb-3 mb-3 px-3 sm:px-4`}>
              <div><span className="sm:hidden">시기</span><span className="hidden sm:inline">운항 시기</span></div>
              <div>항공사</div>
              <div>지연</div>
              <div className="text-right">보상금액</div>
            </div>

            {/* Scrolling container */}
            <div 
              className={`${scrolling ? 'h-[144px]' : ''} overflow-hidden relative`}
              style={scrolling ? { maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' } : undefined}
            >
              <div 
                className="transition-transform duration-700 ease-in-out flex flex-col gap-2"
                style={{ transform: `translateY(-${currentIndex * 48}px)` }} // 40px height + 8px gap = 48px
              >
                {rows.map((c, i) => (
                  <div 
                    key={`${c.slug}-${i}`} 
                    className={`${COLS} items-center bg-white/5 hover:bg-white/10 transition-colors rounded-lg px-3 sm:px-4 py-2 h-[40px] text-[13px] sm:text-base border border-white/5`}
                  >
                    <div className="text-white/60 tabular-nums text-xs sm:text-sm">
                      {c.flightDate.replace(/-/g, '.').substring(2)}
                    </div>
                    <div className="text-white font-bold truncate sm:pr-2">{c.airline}</div>
                    <div className="text-white/70 font-medium truncate text-xs sm:text-base sm:pr-2">{shortDelay(c.delay)}</div>
                    <div className="text-white font-bold text-right tabular-nums tracking-tight whitespace-nowrap">
                      {c.amount.toLocaleString()}<span className="text-xs ml-0.5 text-white/60">원</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
