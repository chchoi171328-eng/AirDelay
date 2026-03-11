import type { Metadata } from 'next'
import { Scale, Globe, ArrowRight, CheckCircle } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '법인 소개',
  description: '법무법인 명 소개. 한국–영국 변호사 협업으로 항공 피해 보상을 전문으로 처리합니다.',
}

const attorneys = [
  {
    country: '한국',
    flag: '🇰🇷',
    icon: Scale,
    name: '홍길동 변호사',
    bar: '대한변호사협회',
    specialties: ['국내 항공소송', '소비자보호법', '민사 손해배상'],
    imgLabel: '한국 변호사 프로필 사진',
  },
  {
    country: '영국',
    flag: '🇬🇧',
    icon: Globe,
    name: 'John Smith, Solicitor',
    bar: 'Solicitors Regulation Authority (SRA)',
    specialties: ['EU261 Regulation', 'Aviation Law', 'Consumer Rights Act'],
    imgLabel: '영국 변호사 프로필 사진',
  },
]

const flowSteps = [
  { step: '01', title: '사건 접수', desc: '고객이 온라인으로 피해 내용을 접수합니다' },
  { step: '02', title: '관할 판단', desc: '한국·영국 전문가가 최적 관할을 분석합니다' },
  { step: '03', title: '한국 또는 영국에서 진행', desc: '관할에 따라 담당 변호사가 직접 처리합니다' },
  { step: '04', title: '보상 수령', desc: '합의 또는 판결을 통해 보상금을 수령합니다' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">법인 소개</h1>
          <p className="text-white/60 text-lg">한국–영국 변호사 협업, 항공지연보상 전문</p>
        </div>
      </div>

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
                {['성공 보수 방식 — 승소 시에만 수임료 발생', '무료 사건 검토 — 48시간 내 전문가 회신', '국내외 모든 항공사 처리 가능'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>
            <ImagePlaceholder label="법무법인 사무실 / 로펌 이미지" aspectRatio="aspect-[4/3]" className="rounded-2xl shadow-lg" />
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
            {attorneys.map(({ country, flag, icon: Icon, name, bar, specialties, imgLabel }) => (
              <div key={country} className="card overflow-hidden">
                {/* Profile photo placeholder */}
                <ImagePlaceholder label={imgLabel} aspectRatio="aspect-[3/2]" className="w-full" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{flag}</span>
                    <span className="badge-navy text-xs">{country} 법인</span>
                  </div>
                  <h3 className="font-black text-navy text-xl mb-1">{name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{bar}</p>
                  <div className="space-y-1.5">
                    {specialties.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />{s}
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
            <h2 className="text-3xl font-black text-white mb-3">한영 협업 구조</h2>
            <p className="text-white/60">고객은 한 번의 접수로, 나머지는 저희가 처리합니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flowSteps.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full">
                  <div className="text-gold text-4xl font-black mb-3 opacity-60">{step}</div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-gold z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press logos placeholder */}
      <div className="py-14 bg-white border-t">
        <div className="container-wide section-padding text-center">
          <div className="text-sm font-semibold text-gray-400 mb-8 tracking-widest uppercase">언론 보도</div>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14">
            {['YTN', '연합뉴스', 'KBS', '조선일보', 'Bloomberg'].map((press) => (
              <div key={press} className="text-gray-300 font-black text-xl sm:text-2xl tracking-tight hover:text-gray-400 transition-colors">
                {press}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-navy/3 py-12 border-t border-navy/10 text-center">
        <Link href="/intake" className="btn-primary inline-flex">무료 사건 접수하기</Link>
      </div>
    </div>
  )
}
