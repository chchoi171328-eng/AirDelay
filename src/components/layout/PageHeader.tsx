// 하위 페이지 공통 머리말 — 모든 페이지가 같은 모양을 쓰도록 한곳에서 관리합니다.
export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-navy py-14 sm:py-16">
      <div className="container-wide section-padding text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{title}</h1>
        {subtitle && <p className="text-white/70 text-base sm:text-lg mt-3">{subtitle}</p>}
      </div>
    </div>
  )
}
