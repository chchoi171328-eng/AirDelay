'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Review } from '@/lib/types'
import { CASE_TYPE_LABELS } from '@/lib/types'
import DraftBadge from '@/components/content/DraftBadge'

// 후기는 content/reviews 폴더에서 읽습니다. 게시할 후기가 없으면 섹션을 숨깁니다.
export default function Testimonials({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // 자동 넘김: 마우스를 올리거나 키보드로 조작 중이면 멈추고, '동작 줄이기' 설정이면 하지 않습니다.
  useEffect(() => {
    if (paused || reviews.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [paused, current, reviews.length])

  if (reviews.length === 0) return null
  const review = reviews[current]

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length)
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section className="bg-navy py-24 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-light rounded-full blur-[120px] opacity-40 translate-x-1/2 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange/10 rounded-full blur-[100px] opacity-30 -translate-x-1/3 translate-y-1/3" />
      
      <div className="container-wide section-padding relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block text-orange font-bold text-sm tracking-widest uppercase mb-3">
            Customer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            고객 후기
          </h2>
          <p className="text-white/60 text-lg">
            직접 맡겨 보신 분들이 남겨 주신 이야기입니다.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Main Card */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-14 shadow-2xl relative">
            <Quote className="absolute top-6 left-6 sm:top-12 sm:left-12 w-8 h-8 sm:w-12 sm:h-12 text-orange/20" />

            {/* 자동으로 넘어갈 때는 화면낭독기가 매번 읽지 않도록, 사용자가 조작할 때만 알립니다 */}
            <div className="relative z-10 min-h-[200px] flex flex-col justify-center pt-8 sm:pt-0" aria-live={paused ? 'polite' : 'off'}>
              <p className="text-lg sm:text-2xl text-navy font-medium leading-relaxed sm:leading-loose text-balance text-left sm:text-center sm:px-12">
                &ldquo;{review.text}&rdquo;
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center font-bold text-navy text-lg">
                    {review.name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-navy text-base flex items-center gap-2">{review.name} 고객님 {review.draft && <DraftBadge />}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{review.date.replace('-', '.')}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold bg-surface px-4 py-2 rounded-xl text-gray-600">
                  <span className="text-orange whitespace-nowrap">{CASE_TYPE_LABELS[review.type]}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{review.route}</span>
                </div>
              </div>
            </div>
            
            {/* Nav Controls — 모바일에서는 글을 가리지 않도록 아래쪽 점 옆에 둡니다 */}
            {reviews.length > 1 && (<>
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -left-6">
              <button
                onClick={prev}
                aria-label="이전 후기"
                className="w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange hover:border-orange transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-6">
              <button
                onClick={next}
                aria-label="다음 후기"
                className="w-12 h-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange hover:border-orange transition-all hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            </>)}
          </div>
          
          {/* Dots Indicator */}
          {reviews.length > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button onClick={prev} aria-label="이전 후기" className="sm:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`transition-all duration-300 rounded-full h-2 
                  ${current === idx ? 'bg-orange w-8' : 'bg-white/20 w-2 hover:bg-white/40'}
                `}
                aria-label={`후기 ${idx + 1}`}
                aria-current={current === idx}
              />
            ))}
            <button onClick={next} aria-label="다음 후기" className="sm:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          )}
          <p className="text-center text-white/40 text-xs mt-6">의뢰인의 동의를 받아 게재한 후기이며, 사건마다 결과는 다를 수 있습니다.</p>
        </div>
      </div>
    </section>
  )
}
