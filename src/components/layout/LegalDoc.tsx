import PageHeader from './PageHeader'

// 법적 고지 페이지(이용약관·이메일무단수집거부·면책공고) 공통 틀 — 개인정보처리방침과 같은 카드 모양입니다.
export default function LegalDoc({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="container-wide section-padding py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 space-y-8 break-keep">
          {children}
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      <div className="space-y-2 text-[15px] text-gray-600 leading-relaxed">{children}</div>
    </section>
  )
}
