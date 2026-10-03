'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
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
              <div>운항일</div>
              <div>항공사</div>
              <div>유형</div>
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
                    <div className="text-white font-bold truncate pr-2">{c.airline}</div>
                    <div className="text-white/70 font-medium truncate pr-2">
                      <span className="hidden sm:inline">{CASE_TYPE_LABELS[c.type]}</span>
                      <span className="sm:hidden">{CASE_TYPE_LABELS[c.type].replace('항공 ', '')}</span>
                    </div>
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
