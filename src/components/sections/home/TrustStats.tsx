'use client'
import { useEffect, useRef, useState } from 'react'
import { Trophy, Wallet, TrendingUp, Users } from 'lucide-react'

const stats = [
  { icon: Trophy, value: 247, suffix: '건', label: '누적 승소 건수' },
  { icon: Wallet, value: 1850, suffix: '만원', label: '평균 보상금액' },
  { icon: TrendingUp, value: 96, suffix: '%', label: '승소율' },
  { icon: Users, value: 500, suffix: '+', label: '누적 상담 고객' },
]

function Counter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [start, target])

  return <span>{count.toLocaleString()}{suffix}</span>
}

export default function TrustStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white py-20 border-b border-gray-100 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide section-padding relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-x divide-gray-100">
          {stats.map(({ icon: Icon, value, suffix, label }, idx) => (
            <div key={label} className={`text-center group ${idx === 0 ? 'pl-0 border-l-0' : ''}`}>
              <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-gray-100">
                <Icon className="w-6 h-6 text-navy" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-navy tabular-nums tracking-tighter relative inline-block">
                <Counter target={value} suffix={suffix} start={started} />
                {/* Underline highlight */}
                <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-orange/20 -z-10 group-hover:bg-orange/40 transition-colors duration-300" />
              </div>
              <div className="text-gray-500 text-sm sm:text-base font-semibold mt-3 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
