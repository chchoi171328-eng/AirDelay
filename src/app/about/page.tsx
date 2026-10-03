import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { PROCESS_STEPS } from '@/lib/process'
import PageHeader from '@/components/layout/PageHeader'
import IntakeCTA from '@/components/sections/home/IntakeCTA'

export const metadata: Metadata = {
  title: '법인 소개',
  description: '법무법인 명 소개. 한국–영국 변호사 협업으로 항공 피해 보상을 전문으로 처리합니다.',
}

const attorneys = [
  {
    country: '한국',
    code: 'KR',
    name: '홍길동 변호사',
    bar: '대한변호사협회',
    specialties: ['국내 항공소송', '소비자보호법', '민사 손해배상'],
    imgLabel: '한국 변호사 프로필 사진',
    img: '/images/lawyer-kr.jpg',
  },
  {
    country: '영국',
    code: 'UK',
    name: 'John Smith, Solicitor',
    bar: 'Solicitors Regulation Authority (SRA)',
    specialties: ['EU261 Regulation', 'Aviation Law', 'Consumer Rights Act'],
    imgLabel: '영국 변호사 프로필 사진',
    img: '/images/lawyer-uk.jpg',
  },
]

const flowSteps = PROCESS_STEPS.map((s, i) => ({ step: String(i + 1).padStart(2, '0'), title: s.title, desc: s.desc, when: s.when }))

export default function AboutPage() {
  return (
    <div>
      <PageHeader title="법인 소개" subtitle="한국·영국 변호사가 함께 처리합니다" />

      {/* Mission */}
      <div className="py-16 bg-white">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-4">설립 배경 & 미션</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                법무법인 명은 항공 피해를 입고도 복잡한 법적 절차 때문에 보상을 포기하는 피해자들을 위해 설립됐습니다.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                특히 EU261과 영국 항공법이 적용되는 유럽 노선의 경우, 한국에서 혼자 대응하기 어렵습니다.
                저희는 한국–영국 변호사 협업 체계를 통해 어떤 노선의 피해도 전문적으로 처리합니다.
              </p>
              <div className="space-y-2.5">
                {['성공보수 25% — 보상받은 경우에만, 소송으로 가도 같은 요율', '보상 가능 여부 판단 — 영업일 기준 2일 이내 연락', '국내외 모든 항공사 처리 가능'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-navy/60 shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden">
              <Image src="/images/lawyer-office.jpg" alt="법무법인 사무실" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Attorneys */}
      <div className="py-16 bg-gray-50">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="section-title">소속 변호사</h2>
            <p className="section-subtitle">한국과 영국 두 나라의 항공법 전문가가 함께합니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {attorneys.map(({ country, code, name, bar, specialties, imgLabel, img }) => (
              <div key={country} className="card overflow-hidden">
                <div className="relative w-full aspect-[3/2]">
                  <Image src={img} alt={imgLabel} fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover object-top" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-navy text-white text-xs font-extrabold flex items-center justify-center">{code}</span>
                    <span className="badge-navy text-xs">{country} 법인</span>
                  </div>
                  <h3 className="font-extrabold text-navy text-xl mb-1">{name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{bar}</p>
                  <div className="space-y-1.5">
                    {specialties.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-navy/40 shrink-0" />{s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration flow infographic */}
      <div className="py-16 bg-navy">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">한영 협업 구조</h2>
            <p className="text-white/60">고객은 한 번의 접수로, 나머지는 저희가 처리합니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
            {flowSteps.map(({ step, title, desc, when }, i) => (
              <div key={step} className="relative">
                <div className={`relative rounded-xl p-6 h-full border ${when ? 'border-dashed border-white/25' : 'bg-white/5 border-white/10'}`}>
                  {when && <span className="badge bg-orange/15 text-orange-light absolute top-4 right-4">{when}</span>}
                  <div className="text-white/50 text-4xl font-extrabold mb-3">{step}</div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed break-keep">{desc}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/process" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
              진행 절차 자세히 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <IntakeCTA />
    </div>
  )
}
