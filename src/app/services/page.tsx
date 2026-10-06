import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, XCircle, CheckCircle, CloudLightning, Timer, CalendarX, Ticket, Info, ArrowRight, FileText } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SectionNav from '@/components/layout/SectionNav'

export const metadata: Metadata = {
  title: '보상 기준',
  description: '항공편 지연·결항 때 받을 수 있는 보상과 노선별 적용 기준(EU261·UK261·몬트리올 협약 등), 보상이 어려운 경우와 청구 기한을 안내합니다.',
}

// 보상 기준 — 자주 묻는 질문(content/faq/04~07)과 같은 내용을 유지해 주세요
const sections = [
  { href: '#rules', label: '적용 기준' },
  { href: '#delay', label: '지연 보상' },
  { href: '#cancel', label: '결항 보상' },
  { href: '#exceptions', label: '보상이 어려운 경우' },
  { href: '#deadline', label: '청구 기한' },
]

const rules = [
  { flight: 'EU(유럽연합)에서 출발하는 항공편 — 항공사와 관계없이', basis: 'EU261 (유럽연합 규정)', pay: '정액 €250·400·600' },
  { flight: 'EU 항공사가 운항하는 EU 도착 항공편', basis: 'EU261 (유럽연합 규정)', pay: '정액 €250·400·600' },
  { flight: '영국에서 출발하는 항공편, 영국 항공사가 운항하는 영국 도착 항공편 등', basis: 'UK261 (영국 규정)', pay: '정액 £220·350·520' },
  { flight: '그 밖의 국제선·국내선', basis: '몬트리올 협약 · 상법(항공운송)', pay: '지연으로 실제 생긴 손해' },
]

const amounts = [
  { distance: '1,500km 이하', eu: '€250', uk: '£220' },
  { distance: '1,500~3,500km', eu: '€400', uk: '£350' },
  { distance: '3,500km 초과', eu: '€600', uk: '£520' },
]

const delayNotes = [
  '한국–유럽 노선은 대부분 3,500km를 넘습니다. 이 경우 3~4시간 늦게 도착했다면 금액은 절반(€300·£260)입니다.',
  'EU 안의 노선은 1,500km를 넘으면 거리와 관계없이 €400입니다.',
  '몬트리올 협약이나 상법이 적용되면 정액이 아니라 지연으로 실제 생긴 손해(숙박비·식비·교통비 등)를 청구합니다.',
  '기다리는 동안 항공사는 식사·음료와, 필요하면 숙박을 제공해야 합니다.',
]

const cancelNotes = [
  '항공사가 비슷한 시간대의 대체편을 제공했다면, 대체편의 출발·도착 시각에 따라 보상이 줄거나 없을 수 있습니다.',
  '보상과 별개로 항공권 환불이나 대체편 중 하나를 선택할 수 있습니다.',
  '결항으로 쓴 숙박비·식비·교통비 같은 손해도 함께 청구합니다.',
]

const exceptions = [
  {
    icon: CloudLightning,
    title: '피할 수 없었던 특별한 사정',
    desc: '기상 악화, 공항·항공관제 문제, 보안 위협처럼 항공사가 피할 수 없었던 사유입니다. 이런 사정은 항공사가 입증해야 하고, 기체 정비나 승무원 문제 같은 항공사 내부 사정은 보통 해당하지 않습니다.',
  },
  { icon: Timer, title: '3시간 미만 지연', desc: 'EU261·UK261 기준으로 최종 목적지에 3시간 넘게 늦게 도착하지 않았다면 정액 보상 대상이 아닙니다.' },
  { icon: CalendarX, title: '출발 14일 전 결항 통보', desc: '출발 14일 전까지 결항을 통보받았다면 정액 보상 대상이 아닙니다. 환불이나 대체편은 받을 수 있습니다.' },
  { icon: Ticket, title: '무료·특별 요금 탑승', desc: '무료로 탑승했거나 일반에 판매되지 않는 특별 요금으로 탑승한 경우는 제외될 수 있습니다.' },
]

function Notes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((n) => (
        <li key={n} className="flex items-start gap-2.5 text-[15px] text-gray-700 leading-relaxed break-keep">
          <CheckCircle className="w-4 h-4 text-navy/60 mt-1 shrink-0" />{n}
        </li>
      ))}
    </ul>
  )
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl shadow-lg overflow-hidden">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
    </div>
  )
}

export default function CompensationPage() {
  return (
    <div>
      <PageHeader title="보상 기준" subtitle="지연·결항 때 받을 수 있는 보상과 적용 기준을 안내합니다" />
      <SectionNav items={sections} />

      {/* 노선별 적용 기준 */}
      <section id="rules" className="bg-white py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-5xl">
          <h2 className="section-title">노선별 적용 기준</h2>
          <p className="section-subtitle break-keep">같은 노선이라도 출발지와 항공사에 따라 적용되는 기준이 달라집니다.</p>

          <div className="mt-10 rounded-2xl border border-navy/10 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.6fr_1fr_1fr] gap-4 bg-navy text-white text-sm font-semibold px-6 py-3">
              <span>이런 항공편이라면</span><span>적용 기준</span><span>보상 방식</span>
            </div>
            {rules.map((r, i) => (
              <div key={r.flight} className={`grid md:grid-cols-[1.6fr_1fr_1fr] gap-1 md:gap-4 px-6 py-4 ${i ? 'border-t border-navy/5' : ''}`}>
                <span className="font-semibold text-navy break-keep">{r.flight}</span>
                <span className="text-gray-700 text-[15px]">{r.basis}</span>
                <span className="text-gray-700 text-[15px]">{r.pay}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-navy/5 px-5 py-4">
            <Info className="w-5 h-5 text-navy mt-0.5 shrink-0" />
            <p className="text-[15px] text-gray-700 leading-relaxed break-keep">
              예를 들어 한국 항공사의 인천 → 파리 항공편은 EU261 대상이 아니지만, 파리 → 인천 항공편은 대상입니다.
              어떤 기준이 적용되는지는 접수 후 보상 가능 여부를 판단할 때 확인해 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 항공편 지연 */}
      <section id="delay" className="bg-surface py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-6xl grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-navy" />
            </div>
            <h2 className="section-title mb-4">항공편 지연</h2>
            <p className="text-gray-600 leading-relaxed mb-6 break-keep">
              최종 목적지에 예정보다 <strong className="text-navy">3시간 이상 늦게 도착</strong>했다면 보상 대상이 될 수 있습니다.
              EU261·UK261이 적용되면 지연 시간이 아니라 비행거리에 따라 금액이 정해집니다.
            </p>
            <div className="rounded-xl overflow-hidden border border-navy/10 bg-white mb-3">
              <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 bg-navy text-white text-sm font-semibold px-4 sm:px-5 py-2.5">
                <span>비행거리</span><span>EU261</span><span>UK261</span>
              </div>
              {amounts.map((a) => (
                <div key={a.distance} className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 px-4 sm:px-5 py-3 text-[15px] border-t border-navy/5">
                  <span className="text-navy font-medium">{a.distance}</span>
                  <span className="text-navy font-bold">{a.eu}</span>
                  <span className="text-navy font-bold">{a.uk}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed break-keep mb-6">
              위 금액은 항공사에 청구할 때의 규정 기준입니다. 항공사가 거절해 한국 법원에서 소송하면 법원이 한국법에 따라 판단할 수 있어,
              인정 금액이 이와 다르거나 적을 수 있습니다.{' '}
              <Link href="/faq#lawsuit" className="underline underline-offset-2 hover:text-navy">소송으로 가면 얼마를 받나요?</Link>
            </p>
            <Notes items={delayNotes} />
          </div>
          <Photo src="/images/service-delay.jpg" alt="출발 안내 전광판에 표시된 항공편 지연 안내" />
        </div>
      </section>

      {/* 항공편 결항 */}
      <section id="cancel" className="bg-white py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
          <div className="lg:order-2">
            <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-navy" />
            </div>
            <h2 className="section-title mb-4">항공편 결항</h2>
            <p className="text-gray-600 leading-relaxed mb-6 break-keep">
              <strong className="text-navy">출발 14일 전보다 늦게</strong> 결항을 통보받았다면, 지연과 같은 금액(€250~600)의 보상 대상이 될 수 있습니다.
            </p>
            <Notes items={cancelNotes} />
          </div>
          <div className="lg:order-1">
            <Photo src="/images/service-cancel.jpg" alt="비 내리는 밤, 승객이 떠난 탑승구에 남은 여행가방" />
          </div>
        </div>
      </section>

      {/* 보상이 어려운 경우 */}
      <section id="exceptions" className="bg-surface py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-5xl">
          <h2 className="section-title">보상이 어려운 경우</h2>
          <p className="section-subtitle break-keep">아래 경우에는 보상을 받지 못하거나 금액이 줄 수 있습니다.</p>
          <div className="grid gap-4 sm:grid-cols-2 mt-10">
            {exceptions.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <h3 className="font-bold text-navy">{title}</h3>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed break-keep">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-gray-700 leading-relaxed break-keep">
            항공사가 특별한 사정을 이유로 지급을 거절하더라도, 실제로 그런 사정이 있었는지 저희가 확인합니다.
          </p>
        </div>
      </section>

      {/* 청구 기한 */}
      <section id="deadline" className="bg-white py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-5xl">
          <h2 className="section-title mb-4">청구 기한</h2>
          <p className="text-gray-600 leading-relaxed break-keep max-w-3xl">
            청구할 수 있는 기간은 적용되는 법과 나라에 따라 다르며, 기한이 지나면 청구할 수 없습니다.
            오래된 항공편이라도 먼저 접수해 주시면 기한 안인지 확인해 드립니다.
          </p>

          <div className="mt-12 rounded-2xl bg-navy px-6 py-10 sm:px-10 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">내 항공편도 보상받을 수 있을까요?</h2>
            <p className="text-white/70 mb-7 break-keep">항공편 정보만 입력하시면 영업일 기준 2일 이내에 보상 가능 여부를 안내드립니다.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/intake" className="btn-primary px-8 py-3.5">
                <FileText className="w-5 h-5" />
                사건 접수하기
              </Link>
              <Link href="/process" className="btn-outline px-8 py-3.5">
                진행 절차와 비용 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
