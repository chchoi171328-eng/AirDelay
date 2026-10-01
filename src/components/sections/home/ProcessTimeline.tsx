'use client'
import { useEffect, useRef, useState } from 'react'
import { FileEdit, Search, Gavel, Banknote } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/process'

const ICONS = [FileEdit, Search, Gavel, Banknote]
const steps = PROCESS_STEPS.map((step, i) => ({ ...step, icon: ICONS[i] }))

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    // '동작 줄이기' 설정이면 처음부터 모든 단계를 보여 줍니다.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveStep(steps.length - 1)
      return
    }
    const handleScroll = () => {
      if (!containerRef.current) return
      const triggerPoint = window.innerHeight * 0.7
      let reached = -1
      containerRef.current.querySelectorAll('.step-item').forEach((el, index) => {
        if (el.getBoundingClientRect().top < triggerPoint) reached = index
      })
      if (reached >= 0) setActiveStep((prev) => Math.max(prev, reached))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-surface py-24">
      <div className="container-wide section-padding">
        <div className="text-center mb-16">
          <div className="inline-block text-orange font-bold text-sm tracking-widest uppercase mb-3">
            Compensation Process
          </div>
          <h2 className="section-title">복잡한 항공 보상, <br className="sm:hidden" />우리가 대신 싸워드립니다</h2>
          <p className="section-subtitle">고객님은 접수만 하세요. 나머지는 전문가의 영역입니다.</p>
        </div>

        <div className="max-w-3xl mx-auto" ref={containerRef}>
          <div className="relative">
            {/* Vertical Line Background */}
            <div className="absolute left-[27px] sm:left-[35px] top-6 bottom-6 w-0.5 bg-gray-200" />
            
            {/* Animated Progress Line */}
            <div 
              className="absolute left-[27px] sm:left-[35px] top-6 w-0.5 bg-orange transition-all duration-700 ease-out z-0"
              style={{ height: `calc(${Math.min(activeStep / (steps.length - 1), 1) * 100}% - 48px)` }}
            />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const isActive = index <= activeStep
                const isCurrent = index === activeStep
                const { icon: Icon } = step

                return (
                  <div key={index} className="step-item relative flex items-start gap-6 sm:gap-8 group">
                    {/* Circle Indicator */}
                    <div 
                      className={`relative z-10 flex items-center justify-center w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full border-[4px] shrink-0 transition-all duration-500
                        ${isActive 
                          ? 'bg-orange border-orange/20 shadow-[0_0_20px_rgba(255,107,53,0.4)]' 
                          : 'bg-white border-gray-100'
                        }
                      `}
                    >
                      <Icon className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                    </div>

                    {/* Content Card */}
                    <div 
                      className={`flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-500 motion-reduce:transition-none transform
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        ${isCurrent ? 'ring-2 ring-orange/10 shadow-lg' : ''}
                      `}
                    >
                      <div className={`text-sm font-black tracking-wider mb-2 transition-colors duration-500 ${isActive ? 'text-orange' : 'text-gray-300'}`}>
                        STEP 0{index + 1}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-[15px] sm:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
