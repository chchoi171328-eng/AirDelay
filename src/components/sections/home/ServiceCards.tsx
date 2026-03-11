import Link from 'next/link'
import { Clock, XCircle, UserX, Luggage, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Clock,
    title: '항공기 지연 보상',
    desc: '3시간 이상 지연 시 EU261 또는 국내 소비자보호원 기준으로 지연 보상금을 청구합니다.',
    href: '/services',
    badge: '최대 600유로',
  },
  {
    icon: XCircle,
    title: '항공기 결항 보상',
    desc: '갑작스러운 결항으로 인한 실비(숙박, 식비 등)와 대체편 관련 손해배상을 전액 청구합니다.',
    href: '/services',
    badge: '전액 손해배상',
  },
  {
    icon: UserX,
    title: '오버부킹 (탑승 거부)',
    desc: '항공사의 일방적 오버부킹으로 탑승을 거부당한 경우, 대체편 탑승 유무와 무관하게 현금을 청구합니다.',
    href: '/services',
    badge: '즉시 보상',
  },
  {
    icon: Luggage,
    title: '수하물 분실 및 파손',
    desc: '수하물 분실·파손·지연에 대해 몬트리올 협약 기준으로 누락 없이 최대 보상을 받아드립니다.',
    href: '/services',
    badge: '최대 1,288 SDR',
  },
]

export default function ServiceCards() {
  return (
    <section className="py-24 bg-white">
      <div className="container-wide section-padding">
        <div className="text-center mb-16">
          <div className="inline-block text-orange font-bold text-sm tracking-widest uppercase mb-3">
            Our Services
          </div>
          <h2 className="section-title">항공 피해의 모든 유형, <br className="sm:hidden" />법무법인 명이 전문가입니다</h2>
          <p className="section-subtitle">EU261, 몬트리올 협약, 그리고 국내 항공법까지 완벽하게 파악합니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, desc, href, badge }) => (
            <Link key={title} href={href} className="group block">
              <div className="h-full bg-surface border border-gray-100 rounded-2xl p-8 hover:bg-navy hover:text-white hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                
                {/* Decorative background circle on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-1/2 -translate-y-1/2" />

                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-white group-hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <Icon className="w-7 h-7 text-orange" />
                  </div>
                  <span className="badge bg-navy text-white group-hover:bg-orange group-hover:text-white text-[11px] px-3 py-1 font-bold">
                    {badge}
                  </span>
                </div>
                
                <h3 className="font-black text-xl mb-3 text-navy group-hover:text-white transition-colors">
                  {title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed group-hover:text-white/70 transition-colors mb-6">
                  {desc}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold text-orange mt-auto">
                  자세히 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
