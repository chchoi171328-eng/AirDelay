// 긴 페이지의 섹션 바로가기 — 머리말 바로 아래에 두면 스크롤해도 상단에 붙어 따라옵니다.
// 이동할 섹션에는 scroll-mt-32를 주어 상단 메뉴와 이 줄에 가려지지 않게 합니다.
export default function SectionNav({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="이 페이지의 내용" className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container-wide section-padding">
        <ul className="flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
          {items.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <a href={href} className="block rounded-full px-3.5 py-1.5 text-sm font-semibold text-navy/80 hover:bg-navy/5 hover:text-navy transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
