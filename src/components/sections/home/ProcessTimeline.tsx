'use client'
import { useEffect, useRef, useState } from 'react'
import { FileEdit, Search, Gavel, Banknote } from 'lucide-react'

const steps = [
  {
    icon: FileEdit,
    title: '1. 간편 사건 접수',
    desc: '항공편 정보와 피해 사실만 간단히 입력해주세요. 나머지 복잡한 서류 작업은 저희가 알아서 준비합니다.',
  },
  {
    icon: Search,
    title: '2. 무료 법률 검토',
    desc: '접수하신 내용을 바탕으로 한국·영국 변호사가 보상 가능 여부와 예상 금액을 48시간 내에 분석해 드립니다.',
  },
  {
    icon: Gavel,
    title: '3. 항공사 협상 및 소송',
    desc: '항공사의 보상 거부 시, 관할(한국/영국)에 맞춰 법무법인 명의 이름으로 강력하게 전문적인 법률 대응을 진행합니다.',
  },
  {
    icon: Banknote,
    title: '4. 보상금 수령',
    desc: '항공사로부터 합의금 또는 판결금이 지급되면, 약정된 성공보수만 제외하고 고객님의 계좌로 바로 송금해 드립니다.',
  },
]

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const elements = containerRef.current.querySelectorAll('.step-item')
      const triggerPoint = window.innerHeight * 0.7

      elements.forEach((el, index) => {
        const top = el.getBoundingClientRect().top
        if (top < triggerPoint) {
          setActiveStep(Math.max(activeStep, index))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeStep])

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
                      className={`relative z-10 flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 rounded-full border-[4px] shrink-0 transition-all duration-500
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
                      className={`flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-500 transform
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        ${isCurrent ? 'ring-2 ring-orange/10 shadow-lg' : ''}
                      `}
                    >
                      <div className={`text-sm font-black tracking-wider mb-2 transition-colors duration-500 ${isActive ? 'text-orange' : 'text-gray-300'}`}>
                        STEP 0{index + 1}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">
                        {step.title}
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
