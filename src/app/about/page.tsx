import Image from 'next/image'
import type { Metadata } from 'next'
import { CheckCircle, Phone, Mail, MapPin, MessageCircle, ArrowRight, Headphones } from 'lucide-react'
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
    role: '고객 연락 · 국내 기준 검토 · 한국 법원 소송',
    contactPoint: true,
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
    role: 'EU261·UK261 검토 · 유럽 노선 항공사 청구',
    contactPoint: false,
    items: [
      { icon: Phone, label: '전화', value: '+44 20 0000 0000', href: 'tel:+442000000000', note: 'Mon–Fri 09:00–17:00 (GMT)' },
      { icon: Mail, label: '이메일', value: 'uk@lawfirm-myung.com', href: 'mailto:uk@lawfirm-myung.com' },
      { icon: MapPin, label: '주소', value: 'London, United Kingdom' },
    ],
  },
]

// 한국·영국 협업 방식 — 단계마다 두 사무소가 맡는 일 (진행 절차 페이지의 단계별 안내와 같은 내용을 유지해 주세요)
const collab = [
  {
    title: '보상 가능 여부 판단',
    kr: '접수 내용을 확인하고 국내 기준·몬트리올 협약 적용 여부를 검토합니다.',
    uk: '유럽 노선은 EU261·UK261 적용 여부를 함께 검토합니다.',
  },
  {
    title: '항공사 청구',
    kr: '유럽 외 노선은 한국 변호사가 항공사에 청구합니다.',
    uk: '유럽 노선은 영국 변호사가 유럽 규정에 따라 항공사에 청구합니다.',
  },
  {
    title: '공동소송',
    kr: '항공사가 거절하면 유럽 노선도 한국 법인이 한국 법원에 소송을 제기하고 진행합니다.',
    uk: '청구 단계에서 정리한 자료와 항공사 답변을 넘겨 소송 준비를 함께합니다.',
  },
]

const sections = [
  { href: '#mission', label: '설립 배경' },
  { href: '#lawyers', label: '소속 변호사' },
  { href: '#collab', label: '협업 방식' },
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
                특히 EU261과 영국 규정이 적용되는 유럽 노선은 한국에서 혼자 대응하기 어렵습니다.
                저희는 영국 변호사가 유럽 규정에 따라 항공사에 청구하고, 소송이 필요하면 한국 법인이 한국 법원에서 진행하는
                협업 체계로 어떤 노선의 피해도 처리합니다.
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
                    <span className={`w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center ${code === 'UK' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>{code}</span>
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

      {/* 한국·영국 협업 방식 */}
      <section id="collab" className="py-16 sm:py-20 bg-navy scroll-mt-32">
        <div className="container-wide section-padding max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">한국·영국 협업 방식</h2>
            <p className="text-white/70 text-lg mt-3 break-keep">사건마다 한국·영국 변호사가 단계별로 역할을 나눠 함께 처리합니다.</p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-white/10 border border-white/15 px-5 py-4 mb-8 max-w-3xl mx-auto">
            <Headphones className="w-5 h-5 text-gold mt-0.5 shrink-0" />
            <p className="text-white/90 text-[15px] leading-relaxed break-keep">
              고객님의 창구는 <strong className="text-white">한국 법인 하나</strong>입니다. 접수, 진행 상황 안내, 보상금 송금까지 한국어로 안내드립니다.
            </p>
          </div>

          <ol className="grid gap-5 lg:grid-cols-3">
            {collab.map(({ title, kr, uk }, i) => (
              <li key={title} className="relative">
                <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="text-gold text-xs font-bold tracking-wider mb-1">STEP {String(i + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
                  <dl className="space-y-3">
                    {[
                      { code: 'KR', cls: 'bg-white text-navy', text: kr },
                      { code: 'UK', cls: 'bg-gold text-navy', text: uk },
                    ].map(({ code, cls, text }) => (
                      <div key={code} className="flex items-start gap-3">
                        <dt className={`w-8 h-8 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${cls}`}>
                          <span className="sr-only">{code === 'KR' ? '한국 법인' : '영국 법인'}</span>
                          <span aria-hidden="true">{code}</span>
                        </dt>
                        <dd className="text-white/75 text-sm leading-relaxed break-keep pt-1">{text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                {i < collab.length - 1 && (
                  <ArrowRight aria-hidden="true" className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-white/40 z-10" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 사무소·연락처 (예전 '문의하기' 페이지 내용) */}
      <section id="contact" className="py-16 bg-white scroll-mt-32">
        <div className="container-wide section-padding">
          <div className="text-center mb-12">
            <h2 className="section-title">사무소·연락처</h2>
            <p className="section-subtitle">사건 접수는 온라인 접수가 가장 빠릅니다. 접수 후 영업일 기준 2일 이내에 연락드립니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offices.map(({ code, name, role, contactPoint, items }) => (
              <div key={code} className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-11 h-11 rounded-xl text-sm font-extrabold flex items-center justify-center shrink-0 ${code === 'UK' ? 'bg-gold text-navy' : 'bg-navy text-white'}`}>{code}</span>
                  <div>
                    <h3 className="font-extrabold text-navy flex flex-wrap items-center gap-2">
                      {name}
                      {contactPoint && <span className="badge bg-orange/10 text-orange-dark">고객 문의 창구</span>}
                    </h3>
                    <div className="text-gray-500 text-sm break-keep">{role}</div>
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
