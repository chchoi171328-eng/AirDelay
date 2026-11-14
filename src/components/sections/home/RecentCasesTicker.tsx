'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Case } from '@/lib/types'

// 모바일은 운항 시기·지연·금액 칸을 글자 폭에 맞춰 좁히고 남는 폭을 항공사 칸에 줍니다.
const COLS = 'grid grid-cols-[2.25rem_minmax(0,1fr)_4.25rem_5rem] gap-x-1.5 sm:grid-cols-4 sm:gap-x-0'

// 띠에서는 지연 시간을 짧게 씁니다: '결항 · 약 72시간 늦게 도착' → '결항 · 72시간', '약 4시간 40분 (왕복 모두)' → '4시간 40분'
const shortDelay = (delay: string) => delay.replace(/약 /g, '').replace(' 늦게 도착', '').replace(/\s*\(.*\)$/, '')

const VISIBLE_ROWS = 5 // 한 번에 보이는 줄 수
// 위아래 끝 12px만 흐리게 해 줄이 드나드는 모습을 부드럽게 합니다
const FADE = 'linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)'
const ROW_STEP = 48 // 한 줄 높이 40px + 간격 8px
const STEP_MS = 2500 // 한 줄씩 올라가는 간격
const SLIDE_MS = 700 // 올라가는 움직임 시간 (아래 duration-700과 같아야 합니다)

export default function RecentCasesTicker({ cases }: { cases: Case[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const count = cases.length
  // 한 화면보다 많을 때만 굴립니다. 끊김 없이 돌도록 목록을 이어 붙입니다.
  const scrolling = count > VISIBLE_ROWS
  const rows = scrolling ? [...cases, ...cases, ...cases] : cases

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!scrolling || reduceMotion) return
    const timer = setInterval(() => {
      setAnimate(true)
      setCurrentIndex((prev) => prev + 1)
    }, STEP_MS)
    return () => clearInterval(timer)
  }, [scrolling, reduceMotion])

  // 마지막 사례 다음에는 맨 위로 되감지 않고 첫 사례가 이어서 올라옵니다.
  // 이어 붙인 두 번째 묶음까지 그대로 올라간 뒤, 움직임이 끝나면 똑같이 보이는 첫 묶음 위치로 애니메이션 없이 옮깁니다.
  useEffect(() => {
    if (!scrolling || currentIndex < count) return
    const timer = setTimeout(() => {
      setAnimate(false)
      setCurrentIndex((prev) => prev % count)
    }, SLIDE_MS + 50)
    return () => clearTimeout(timer)
  }, [scrolling, currentIndex, count])

  if (cases.length === 0) return null

  return (
    <section className="bg-navy py-16 relative overflow-hidden border-t border-white/10">
      <div className="container-wide section-padding">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-shrink-0 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">최근 지급된 보상</h2>
            <p className="text-white/70 mt-2 font-medium break-keep">소송을 거친 사건은 시간이 걸려, <br className="hidden lg:block"/>운항 시기가 지급 시점보다 한참 앞섭니다.</p>
            <p className="text-white/50 text-xs mt-2">사건마다 결과가 다르며, 같은 금액을 보장하지 않습니다.</p>
            <Link href="/cases" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm font-semibold mt-4">
              전체 사례 보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Ticker Board */}
          <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-3 sm:p-6 w-full max-w-4xl mx-auto relative">
            {/* Header row */}
            <div className={`${COLS} text-white/60 text-xs font-semibold border-b border-white/10 pb-3 mb-3 px-2.5 sm:px-4`}>
              <div><span className="sm:hidden">시기</span><span className="hidden sm:inline">운항 시기</span></div>
              <div>항공사</div>
              <div>지연</div>
              <div className="text-right">보상금액</div>
            </div>

            {/* Scrolling container */}
            <div 
              className="overflow-hidden relative"
              style={scrolling ? { height: VISIBLE_ROWS * ROW_STEP - 8, maskImage: FADE, WebkitMaskImage: FADE } : undefined}
            >
              <div 
                className={`${animate ? 'transition-transform duration-700 ease-in-out' : ''} flex flex-col gap-2`}
                style={{ transform: `translateY(-${currentIndex * ROW_STEP}px)` }}
              >
                {rows.map((c, i) => (
                  <div 
                    key={`${c.slug}-${i}`} 
                    className={`${COLS} items-center bg-white/5 hover:bg-white/10 transition-colors rounded-lg px-2.5 sm:px-4 py-2 h-[40px] text-[13px] sm:text-base border border-white/5`}
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
