'use client'
import { useState, useEffect } from 'react'
import type { Case } from '@/lib/types'
import { CASE_TYPE_LABELS } from '@/lib/types'

// 모바일은 날짜·유형 칸을 좁히고 항공사 칸을 넓혀 금액이 줄바꿈되지 않게 합니다.
const COLS = 'grid grid-cols-[3.5rem_minmax(0,1fr)_2.25rem_6rem] gap-x-2 sm:grid-cols-4 sm:gap-x-0'

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
    <section className="bg-navy py-16 relative overflow-hidden border-y border-white/5 shadow-2xl">
      <div className="container-wide section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-shrink-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="text-white/80 text-xs font-semibold tracking-wide">LIVE UPDATES</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">최신 보상 내역</h2>
            <p className="text-white/60 mt-2 font-medium">가장 최근 보상 지급이 <br className="hidden lg:block"/>완료된 사건입니다.</p>
          </div>
          
          {/* Ticker Board */}
          <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl p-4 sm:p-6 w-full max-w-4xl mx-auto shadow-inner relative">
            {/* Header row */}
            <div className={`${COLS} text-white/40 text-xs font-bold uppercase tracking-widest border-b border-white/10 pb-3 mb-3 px-3 sm:px-4`}>
              <div><span className="hidden sm:inline">Flight Date</span><span className="sm:hidden">일자</span></div>
              <div><span className="hidden sm:inline">Airline</span><span className="sm:hidden">항공사</span></div>
              <div><span className="hidden sm:inline">Type</span><span className="sm:hidden">유형</span></div>
              <div className="text-right"><span className="hidden sm:inline">Result</span><span className="sm:hidden">금액</span></div>
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
                    <div className="text-white/60 font-mono tracking-tight text-xs sm:text-sm">
                      {c.flightDate.replace(/-/g, '.').substring(2)}
                    </div>
                    <div className="text-white font-bold truncate pr-2">{c.airline}</div>
                    <div className="text-orange/90 font-medium truncate pr-2">
                      <span className="hidden sm:inline">{CASE_TYPE_LABELS[c.type]}</span>
                      <span className="sm:hidden">{CASE_TYPE_LABELS[c.type].replace('항공 ', '')}</span>
                    </div>
                    <div className="text-gold font-bold text-right tabular-nums tracking-tight whitespace-nowrap">
                      {c.amount.toLocaleString()}<span className="text-xs ml-0.5 text-gold/70">원</span>
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
