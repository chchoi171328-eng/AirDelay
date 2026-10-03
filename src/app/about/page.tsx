import Image from 'next/image'
import type { Metadata } from 'next'
import { CheckCircle, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SectionNav from '@/components/layout/SectionNav'
import { FIRM } from '@/lib/site'
import IntakeCTA from '@/components/sections/home/IntakeCTA'

export const metadata: Metadata = {
  title: '법인 소개',
  description: '법무법인 명 소개. 한국·영국 변호사와 사무소별 연락처(전화·이메일·주소)를 안내합니다.',
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

// 사무소별 연락처 — 실제 정보로 바꿔 주세요 (대표 전화·이메일은 src/lib/site.ts)
const offices = [
  {
    code: 'KR',
    name: '한국 법인',
    role: '국내선·일반 국제선 담당',
    items: [
      { icon: Phone, label: '전화', value: FIRM.phone, href: `tel:${FIRM.phone}`, note: '평일 09:00–18:00' },
      { icon: Mail, label: '이메일', value: 'korea@lawfirm-myung.com', href: 'mailto:korea@lawfirm-myung.com' },
      { icon: MapPin, label: '주소', value: '서울특별시 강남구 테헤란로 000' },
      { icon: MessageCircle, label: '카카오톡 채널', value: '@법무법인명', note: '빠른 문의 가능' },
    ],
  },
  {
    code: 'UK',
    name: '영국 법인',
    role: 'EU261·영국 노선 담당',
    items: [
      { icon: Phone, label: '전화', value: '+44 20 0000 0000', href: 'tel:+442000000000', note: 'Mon–Fri 09:00–17:00 (GMT)' },
      { icon: Mail, label: '이메일', value: 'uk@lawfirm-myung.com', href: 'mailto:uk@lawfirm-myung.com' },
      { icon: MapPin, label: '주소', value: 'London, United Kingdom' },
    ],
  },
]

const sections = [
  { href: '#mission', label: '설립 배경' },
  { href: '#lawyers', label: '소속 변호사' },
  { href: '#contact', label: '사무소·연락처' },
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader title="법인 소개" subtitle="한국·영국 변호사와 사무소를 소개합니다" />
      <SectionNav items={sections} />

      {/* Mission */}
      <div id="mission" className="py-16 bg-white scroll-mt-32">
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
      <div id="lawyers" className="py-16 bg-gray-50 scroll-mt-32">
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

      {/* 사무소·연락처 (예전 '문의하기' 페이지 내용) */}
      <section id="contact" className="py-16 bg-white scroll-mt-32">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="section-title">사무소·연락처</h2>
            <p className="section-subtitle">사건 접수는 온라인 접수가 가장 빠릅니다. 접수 후 영업일 기준 2일 이내에 연락드립니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offices.map(({ code, name, role, items }) => (
              <div key={code} className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-11 h-11 rounded-xl bg-navy text-white text-sm font-extrabold flex items-center justify-center">{code}</span>
                  <div>
                    <h3 className="font-extrabold text-navy">{name}</h3>
                    <div className="text-gray-500 text-sm">{role}</div>
                  </div>
                </div>
                <dl className="space-y-4">
                  {items.map(({ icon: Icon, label, value, href, note }) => (
                    <div key={label} className="flex items-start gap-3 text-sm">
                      <Icon className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                      <div>
                        <dt className="font-semibold text-navy">{label}</dt>
                        <dd className="text-gray-500">
                          {href ? <a href={href} className="hover:text-navy underline-offset-2 hover:underline">{value}</a> : value}
                        </dd>
                        {note && <dd className="text-gray-500 text-xs mt-0.5">{note}</dd>}
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IntakeCTA />
    </div>
  )
}
