'use client'
import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Plane, Calendar, Clock, Banknote, ShieldCheck } from 'lucide-react'
import type { Case } from '@/lib/types'
import { CASE_TYPE_LABELS } from '@/lib/types'
import Link from 'next/link'

// Fallback demo data shown before Supabase loads or when DB is empty
const DEMO_CASES: Case[] = [
  { id: '1', airline: '대한항공', delay_date: '2024-08-15', delay_hours: '5시간 30분', amount: 800000, type: 'delay', summary: '인천→파리 등 기상 외 사유로 5시간 지연', detail: null, is_featured: true, created_at: '' },
  { id: '2', airline: '아시아나항공', delay_date: '2024-07-02', delay_hours: '4시간 10분', amount: 600000, type: 'cancel', summary: '인천→런던 노선 갑작스러운 결항 (대체편 구제)', detail: null, is_featured: true, created_at: '' },
  { id: '3', airline: 'British Airways', delay_date: '2024-06-20', delay_hours: '3시간 50분', amount: 1200000, type: 'delay', summary: '런던→인천 EU261 직접 적용 최대 보상 획득', detail: null, is_featured: true, created_at: '' },
]

interface Props { initialCases?: Case[] }

export default function CasesCarousel({ initialCases = DEMO_CASES }: Props) {
  const cases = initialCases.length > 0 ? initialCases : DEMO_CASES
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % cases.length), [cases.length])
  const prev = () => setCurrent((c) => (c - 1 + cases.length) % cases.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [paused, next])

  const c = cases[current]

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="container-wide section-padding">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-orange font-bold text-sm tracking-widest uppercase mb-3">
              <ShieldCheck className="w-4 h-4" /> Recent Payouts
            </div>
            <h2 className="section-title">최근 승소 사례</h2>
            <p className="section-subtitle">항공사가 거부했던 건들도 모두 보상받아냈습니다</p>
          </div>
          <Link href="/cases" className="text-navy font-bold text-sm hover:text-orange transition-colors flex items-center gap-1 group">
            사례 더보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel layout */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main Card (Light Theme) */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl border border-gray-100 min-h-[300px] flex flex-col justify-between transition-all duration-500 overflow-hidden relative">
            
            {/* Background absolute decor */}
            <div className="absolute right-0 bottom-0 text-[200px] font-black leading-none text-surface opacity-50 select-none pb-0 mb-[-40px] mr-[-20px]">
              {String(current + 1).padStart(2, '0')}
            </div>

            {/* Top: badge + airline */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-4">
                <span className="badge bg-navy text-white text-[11px] font-bold px-3 py-1.5 shadow-sm">
                  {CASE_TYPE_LABELS[c.type]}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                    <Plane className="w-6 h-6 text-navy" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-navy">{c.airline}</span>
                </div>
                {c.summary && (
                  <p className="text-gray-500 text-sm sm:text-base font-medium max-w-lg leading-relaxed pt-2">
                    {c.summary}
                  </p>
                )}
              </div>

              {/* Amount Highlight */}
              <div className="text-left sm:text-right bg-orange/5 sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
                <div className="text-gray-400 text-sm font-bold mb-1">최종 수령 보상금</div>
                <div className="text-orange text-3xl sm:text-5xl font-black tracking-tight" style={{textShadow: '0 2px 10px rgba(255,107,53,0.2)'}}>
                  {c.amount.toLocaleString()}<span className="text-2xl sm:text-3xl ml-1 text-orange/80">원</span>
                </div>
              </div>
            </div>

            {/* Bottom: Date & Hours */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Flight Date</div>
                  <div className="text-navy font-bold">{c.delay_date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Delay Time</div>
                  <div className="text-navy font-bold">{c.delay_hours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex gap-2.5">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-navy w-8' : 'bg-gray-200 w-2 hover:bg-gray-300'}`}
                  aria-label={`사례 ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button onClick={next} className="w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:bg-navy hover:text-white transition-all text-navy group">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
