'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, X } from 'lucide-react'

type Props = { id: string; href: string; label: string; text: string; textShort: string }

// 헤더 바로 아래에 한 줄로 나오는 알림 띠. 화면을 가리지 않고 본문과 함께 스크롤됩니다.
// 닫으면 같은 브라우저에서는 다시 나오지 않습니다 (연결된 글 화면에서는 띄우지 않습니다).
export default function AnnouncementBar({ id, href, label, text, textShort }: Props) {
  const pathname = usePathname()
  const [closed, setClosed] = useState(false)
  const key = `notice-closed:${id}`

  useEffect(() => {
    try {
      if (window.localStorage.getItem(key)) setClosed(true)
    } catch {
      // 저장소를 쓸 수 없는 브라우저에서는 닫은 기록 없이 계속 보여 줍니다
    }
  }, [key])

  if (closed || pathname === href) return null

  const close = () => {
    setClosed(true)
    try {
      window.localStorage.setItem(key, '1')
    } catch {
      // 기록하지 못해도 이번 화면에서는 닫힙니다
    }
  }

  return (
    <div className="bg-gold text-navy">
      <div className="container-wide section-padding flex items-center gap-2 py-2">
        <Link href={href} className="group flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] sm:text-sm leading-snug">
          <span className="shrink-0 rounded-full bg-navy px-2 py-0.5 text-[11px] font-bold text-white">{label}</span>
          <span className="font-semibold break-keep">
            <span className="sm:hidden">{textShort}</span>
            <span className="hidden sm:inline">{text}</span>
          </span>
          <span className="inline-flex shrink-0 items-center font-bold underline underline-offset-2 group-hover:no-underline">
            자세히 보기 <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </Link>
        <button type="button" onClick={close} aria-label="알림 닫기" className="shrink-0 rounded p-1.5 hover:bg-navy/10 transition-colors">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
