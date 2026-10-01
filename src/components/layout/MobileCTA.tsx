'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FileText, Phone } from 'lucide-react'
import { FIRM } from '@/lib/site'

// 모바일 화면 아래에 늘 보이는 접수·전화 버튼 (접수 페이지에서는 숨김)
// 홈에서는 첫 화면에 같은 버튼이 이미 있으므로, 조금 내려간 뒤부터 보여 줍니다.
export default function MobileCTA() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (pathname.startsWith('/intake')) return null
  const visible = !isHome || scrolled

  return (
    <>
    {/* 고정 버튼에 푸터가 가리지 않도록 같은 높이의 빈칸을 둡니다 */}
    <div className="md:hidden h-[72px]" aria-hidden="true" />
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex gap-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <a href={`tel:${FIRM.phone}`} tabIndex={visible ? undefined : -1} className="flex items-center justify-center gap-1.5 rounded-xl border border-navy/20 text-navy font-bold text-sm px-4 py-3">
        <Phone className="w-4 h-4" />
        전화
      </a>
      <Link href="/intake" tabIndex={visible ? undefined : -1} className="btn-primary flex-1 text-sm py-3">
        <FileText className="w-4 h-4" />
        무료 사건 접수
      </Link>
    </div>
    </>
  )
}
