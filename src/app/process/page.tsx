import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileEdit, Search, Send, Users, Banknote, Clock, ArrowRight, CheckCircle,
  Scale, Wallet, AlertTriangle, CornerDownRight,
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import SectionNav from '@/components/layout/SectionNav'
import IntakeCTA from '@/components/sections/home/IntakeCTA'
import { PROCESS_STEPS } from '@/lib/process'

export const metadata: Metadata = {
  title: '진행 절차와 비용',
  description: '사건 접수부터 보상 가능 여부 판단, 항공사 청구, 공동소송, 보상금 수령까지의 단계와 비용(성공보수 25%, 공동소송 진행비 1만 원), 공동소송 일정을 안내합니다.',
}

const ICONS = [FileEdit, Search, Send, Users, Banknote]

// 단계별 자세한 안내 — 단계 이름·요약은 src/lib/process.ts, 단계별 비용은 아래 fees와 같은 내용을 유지해 주세요
type Detail = {
  timing: string
  we: string[]
  you: string[]
  outcomes?: { when: string; text: string; href?: string }[]
  fee: React.ReactNode
  more?: { label: string; href: string }
}

const details: Detail[] = [
  {
    timing: '언제든 온라인으로',
    we: ['접수 내용을 확인하고 보상 가능 여부 판단을 시작합니다.'],
    you: [
      '항공사, 항공편, 출발지·도착지, 운항 날짜, 지연·결항 내용과 연락처를 입력해 주세요.',
      '탑승권, 예약 확인서, 항공사 안내 문자 등이 있으면 함께 첨부해 주세요. 판단이 빨라집니다.',
    ],
    fee: <>없음</>,
  },
  {
    timing: '접수 후 영업일 기준 2일 이내 연락',
    we: [
      '운항 기록과 지연·결항 사유를 확인합니다.',
      '적용할 기준(EU 규정, 몬트리올 협약, 소비자분쟁해결기준 등)과 관할을 검토합니다.',
      '판단에 필요한 내용이 더 있으면 여쭤봅니다.',
    ],
    you: ['안내를 확인하시고, 청구를 진행하기로 하시면 위임 절차를 마쳐 주세요.'],
    outcomes: [
      { when: '보상 대상이면', text: '청구 방법과 위임 절차를 안내드립니다.', href: '#step-3' },
      { when: '보상 대상이 아니면', text: '이유를 안내드리고 마무리합니다. 비용은 없습니다.' },
    ],
    fee: <>없음</>,
  },
  {
    timing: '항공사마다 답변 기간이 다릅니다',
    we: [
      '변호사가 고객님을 대리해 항공사에 보상금을 청구합니다.',
      '항공사의 답변에 대응하고 지급 여부를 확인합니다.',
    ],
    you: ['항공사가 고객님께 직접 연락하거나 바우처·마일리지를 제안하면, 받아들이기 전에 저희에게 먼저 알려 주세요.'],
    outcomes: [
      { when: '항공사가 지급하면', text: '보상금 수령 단계로 넘어갑니다.', href: '#step-5' },
      { when: '항공사가 거절하면', text: '같은 항공사 사건과 함께 공동소송을 준비합니다. 기한 안에 답하지 않아도 거절로 봅니다.', href: '#step-4' },
    ],
    fee: <>보상금을 받은 경우에만 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</>,
  },
  {
    timing: '6월 말·12월 말 마감 → 8월·2월 중 소장 접수',
    we: [
      '같은 항공사 사건을 운항일 기준 6개월 단위로 모아, 마감 후 항공사별 소송 진행 여부를 한꺼번에 안내드립니다.',
      '동의하신 분들을 원고로 소장을 접수하고, 재판은 변호사가 대리해 진행합니다.',
    ],
    you: [
      '안내받은 날부터 1개월 안에 소송 진행 동의 여부를 알려 주세요.',
      '동의하실 때 소송 진행비 1만 원을 내 주세요.',
      '법원에 나오실 일은 없습니다.',
    ],
    fee: <>참여 동의 시 진행비 1인 <strong className="text-navy">1만 원</strong> + 판결금·합의금을 받은 경우 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</>,
    more: { label: '공동소송 일정과 기준 자세히 보기', href: '#group' },
  },
  {
    timing: '지급을 확인한 뒤 송금',
    we: [
      '항공사 보상금이나 판결금·합의금이 들어오면 지급 내역을 확인합니다.',
      '성공보수만 제외하고 나머지를 고객님 계좌로 송금합니다.',
    ],
    you: ['송금받으실 계좌를 알려 주세요.'],
    fee: <>성공보수는 항공사로부터 실제로 받은 금액을 기준으로 계산합니다.</>,
  },
]

// 한눈에 보기 — 모든 사건은 항공사 청구부터 시작하고, 거절된 경우에만 공동소송을 거칩니다
const routes = [
  { label: '항공사가 지급하는 경우', steps: [0, 1, 2, 4] },
  { label: '항공사가 거절하는 경우', steps: [0, 1, 2, 3, 4] },
]

const reasons = [
  { icon: Users, title: '같은 항공사끼리 함께', desc: '항공편이 달라도 같은 기간에 운항한 같은 항공사 사건이면 하나의 소송으로 모아 진행합니다.' },
  { icon: Scale, title: '변호사가 모두 대리', desc: '법무법인이 원고 모두를 대리해 소장 작성부터 재판까지 맡습니다. 고객님이 법원에 나오실 일은 없습니다.' },
  { icon: Wallet, title: '부담은 진행비 1만 원', desc: '참여하실 때 진행비 1만 원만 내시면 되고, 성공보수는 소송으로 가도 25% 그대로입니다.' },
]

// 공동소송 차수 일정 — 자주 묻는 질문(content/faq/09-litigation-timing.md)과 같은 내용을 유지해 주세요
const batches = [
  { label: '상반기 차수', flights: '1월~6월 운항 항공편', close: '6월 말', file: '8월 중' },
  { label: '하반기 차수', flights: '7월~12월 운항 항공편', close: '12월 말', file: '다음 해 2월 중' },
]

const sections = [
  { href: '#overview', label: '한눈에 보기' },
  { href: '#steps', label: '단계별 안내' },
  { href: '#group', label: '공동소송' },
  { href: '#cost', label: '비용' },
]

// 비용 안내 — 자주 묻는 질문(content/faq/01-cost.md)과 같은 내용을 유지해 주세요
const fees = [
  { step: '접수·보상 가능 여부 판단', fee: <>비용 없음</> },
  { step: '항공사 청구', fee: <>보상금을 받은 경우에만 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</> },
  { step: '공동소송', fee: <>참여 동의 시 소송 진행비 1인 <strong className="text-navy">1만 원</strong> + 판결금·합의금을 받은 경우 성공보수 <strong className="text-navy">25%</strong> (부가세 포함)</> },
]

const feeNotes = [
  '성공보수는 항공사로부터 실제로 받은 금액을 기준으로 계산합니다.',
  '소송 진행비는 인지대·송달료 등에 쓰이는 정액입니다. 법인이 소송을 제기하지 않게 되면 돌려드립니다.',
]

const rules = [
  '항공사가 기한 안에 답하지 않으면 거절로 보고 같은 차수에 포함합니다.',
  '기한 안에 동의하신 분만 원고로 소장에 포함됩니다. 동의하지 않으시면 소송에 참여하지 않으며, 따로 드는 비용은 없습니다.',
  '같은 항공사 사건이 너무 적으면 다음 차수로 한 번 넘겨 함께 진행합니다. 그래도 진행이 어려우면 미리 알려드립니다.',
  '소송 진행비는 인지대·송달료 등에 쓰이는 정액입니다. 법인이 소송을 제기하지 않게 되면 돌려드립니다.',
]

export default function ProcessPage() {
  return (
    <div>
      <PageHeader title="진행 절차와 비용" subtitle="접수부터 보상금 수령까지, 단계와 비용을 안내합니다" />
      <SectionNav items={sections} />

      {/* 한눈에 보기 */}
      <section id="overview" className="bg-white py-14 sm:py-16 border-b scroll-mt-32">
        <div className="container-wide section-padding max-w-4xl">
          <h2 className="section-title mb-4">한눈에 보기</h2>
          <p className="text-gray-600 leading-relaxed mb-8 break-keep">
            모든 사건은 변호사가 항공사에 청구하는 것부터 시작합니다. 항공사가 지급을 거절한 경우에만 공동소송으로 넘어갑니다.
          </p>
          <div className="space-y-4">
            {routes.map(({ label, steps }) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-surface px-5 py-5 sm:px-6">
                <div className="text-sm font-bold text-navy/70 mb-3">{label}</div>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
                  {steps.map((s, i) => {
                    const step = PROCESS_STEPS[s]
                    return (
                      <li key={s} className="flex items-center gap-2">
                        <a
                          href={`#step-${s + 1}`}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                            step.when
                              ? 'bg-orange/10 text-orange-dark border border-dashed border-orange/50 hover:bg-orange/15'
                              : 'bg-white text-navy border border-navy/15 hover:border-navy/40'
                          }`}
                        >
                          <span className="text-xs opacity-70">{s + 1}</span>
                          {step.title}
                        </a>
                        {i < steps.length - 1 && <ArrowRight aria-hidden="true" className="w-4 h-4 text-navy/30 shrink-0" />}
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 단계별 안내 */}
      <section id="steps" className="bg-surface py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-4xl">
          <h2 className="section-title mb-10 sm:mb-12">단계별 안내</h2>
          <ol>
            {PROCESS_STEPS.map((step, i) => {
              const Icon = ICONS[i]
              const d = details[i]
              const last = i === PROCESS_STEPS.length - 1
              return (
                <li key={step.title} id={`step-${i + 1}`} className="relative pl-14 sm:pl-20 pb-8 last:pb-0 scroll-mt-32">
                  {!last && <div aria-hidden="true" className="absolute left-5 sm:left-7 top-12 sm:top-14 bottom-0 w-px bg-navy/15" />}
                  <div
                    className={`absolute left-0 top-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-sm ${
                      step.when ? 'bg-white text-navy border-2 border-dashed border-navy/50' : 'bg-navy text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold tracking-wider text-navy/70">STEP {String(i + 1).padStart(2, '0')}</span>
                      {step.when && <span className="badge bg-orange/10 text-orange-dark">{step.when}</span>}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-navy mb-3">{step.title}</h3>
                    <div className="inline-flex items-start gap-1.5 text-sm font-semibold text-navy bg-navy/5 rounded-lg px-3 py-1.5 mb-4">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{d.timing}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 break-keep">{step.desc}</p>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {[
                        { heading: '저희가 하는 일', items: d.we },
                        { heading: '고객님이 하실 일', items: d.you },
                      ].map(({ heading, items }) => (
                        <div key={heading}>
                          <div className="text-sm font-bold text-navy mb-2">{heading}</div>
                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-[15px] text-gray-600 leading-relaxed break-keep">
                                <CheckCircle className="w-4 h-4 text-navy/50 mt-1 shrink-0" />{item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {d.outcomes && (
                      <div className="grid gap-3 sm:grid-cols-2 mt-6">
                        {d.outcomes.map(({ when, text, href }) => {
                          const body = (
                            <>
                              <div className="flex items-center gap-1.5 text-sm font-bold text-navy mb-1">
                                <CornerDownRight className="w-4 h-4 text-navy/50" />{when}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed break-keep">{text}</p>
                            </>
                          )
                          return href
                            ? <a key={when} href={href} className="block rounded-xl border border-navy/10 bg-surface px-4 py-3.5 hover:border-navy/30 transition-colors">{body}</a>
                            : <div key={when} className="rounded-xl border border-navy/10 bg-surface px-4 py-3.5">{body}</div>
                        })}
                      </div>
                    )}

                    <div className="mt-6 pt-5 border-t border-gray-100 flex gap-4 text-[15px]">
                      <span className="font-bold text-navy shrink-0">비용</span>
                      <span className="text-gray-700 leading-relaxed break-keep">{d.fee}</span>
                    </div>

                    {d.more && (
                      <a href={d.more.href} className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-navy hover:text-orange-dark transition-colors">
                        {d.more.label}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* 공동소송 안내 */}
      <section id="group" className="bg-white py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-4xl">
          <h2 className="section-title">공동소송 안내</h2>
          <p className="section-subtitle break-keep">항공사가 지급을 거절한 사건은 같은 항공사끼리 모아 함께 소송합니다.</p>

          <div className="grid gap-4 sm:grid-cols-3 mt-10">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-200 p-6">
                <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{desc}</p>
              </div>
            ))}
          </div>

          {/* 차수 일정 */}
          <h3 className="text-xl font-extrabold text-navy mt-14 mb-2">차수 일정</h3>
          <p className="text-gray-600 leading-relaxed mb-6 break-keep">항공편 운항일을 기준으로 6개월씩 묶어 진행합니다.</p>
          <div className="space-y-4">
            {batches.map(({ label, flights, close, file }) => (
              <div key={label} className="rounded-2xl border border-navy/10 overflow-hidden">
                <div className="bg-navy text-white text-sm px-5 py-2.5 flex flex-wrap gap-x-3 gap-y-0.5">
                  <span className="font-bold">{label}</span>
                  <span className="text-white/70">{flights}</span>
                </div>
                <ol className="grid grid-cols-1 sm:grid-cols-4">
                  {[
                    { k: '마감', v: close },
                    { k: '진행 여부 안내', v: '마감 후 한꺼번에' },
                    { k: '동의 확인', v: '안내받은 날부터 1개월' },
                    { k: '소장 접수', v: file },
                  ].map(({ k, v }, i) => (
                    <li key={k} className={`flex sm:flex-col justify-between sm:justify-start gap-1 px-5 py-3.5 ${i ? 'border-t sm:border-t-0 sm:border-l border-navy/5' : ''}`}>
                      <span className="text-sm text-gray-500"><span className="font-bold text-navy/60 mr-1.5">{i + 1}</span>{k}</span>
                      <span className="font-bold text-navy text-right sm:text-left">{v}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 break-keep">예: 3월에 운항한 항공편은 상반기 차수에 포함되며, 항공사가 거절하고 소송에 동의하시면 8월 중 소장이 접수됩니다.</p>

          {/* 진행 기준 */}
          <h3 className="text-xl font-extrabold text-navy mt-14 mb-4">진행 기준</h3>
          <ul className="space-y-3">
            {rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2.5 text-gray-700 leading-relaxed break-keep">
                <CheckCircle className="w-5 h-5 text-navy/60 mt-0.5 shrink-0" />{rule}
              </li>
            ))}
          </ul>

          {/* 소송 결과 안내 */}
          <div className="mt-12 rounded-2xl bg-amber-50 border border-amber-200 p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-navy mb-2">소송으로 받을 금액은 미리 말씀드리기 어렵습니다</h3>
                <ul className="space-y-2 text-[15px] text-gray-700 leading-relaxed break-keep">
                  <li>소송에서는 한국 법원이 한국법에 따라 손해를 판단합니다. 정해진 기준이 없어 재판부마다 인정 금액이 크게 다르고, EU 규정 금액(€250~600)보다 적을 수 있습니다.</li>
                  <li>판결이나 합의까지는 항공사 청구보다 시간이 더 걸립니다.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 비용 안내 */}
      <section id="cost" className="bg-surface py-16 sm:py-20 scroll-mt-32">
        <div className="container-wide section-padding max-w-4xl">
          <h2 className="section-title">비용 안내</h2>
          <p className="section-subtitle">보상금을 받지 못하면 성공보수는 없습니다.</p>
          <div className="mt-10 bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm">
            {fees.map(({ step, fee }, i) => (
              <div key={step} className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 px-6 py-5 ${i ? 'border-t border-navy/5' : ''}`}>
                <div className="font-bold text-navy">{step}</div>
                <div className="text-gray-700 leading-relaxed break-keep">{fee}</div>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {feeNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed break-keep">
                <CheckCircle className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />{note}
              </li>
            ))}
          </ul>

          {/* 더 알아보기 */}
          <div className="mt-12 flex flex-wrap gap-3">
            {[
              { label: '보상 기준', href: '/services' },
              { label: '자주 묻는 질문', href: '/faq' },
              { label: '사무소·연락처', href: '/about#contact' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-navy/40 transition-colors">
                {label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <IntakeCTA />
    </div>
  )
}
