'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Share2, Check } from 'lucide-react'

type Props = {
  /** 공유할 주소의 앞부분(운영 도메인). 서버 컴포넌트에서 SITE_URL을 넘겨 줍니다 */
  siteUrl: string
  label?: string
  className?: string
  tabIndex?: number
}

// 공유하기 — 휴대폰에서는 기본 공유 창(카카오톡·문자 등)을 열고,
// 공유 창이 없는 환경(PC, 일부 앱 내 브라우저)에서는 주소를 복사합니다.
export default function ShareButton({ siteUrl, label = '공유하기', className = '', tabIndex }: Props) {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = `${siteUrl}${pathname === '/' ? '' : pathname}`
    const title = document.title

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
        return
      } catch (e) {
        // 공유 창을 그냥 닫은 경우에는 아무것도 하지 않습니다
        if (e instanceof DOMException && e.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.prompt('아래 주소를 복사해 주세요', url)
    }
  }

  return (
    <button type="button" onClick={share} tabIndex={tabIndex} className={className}>
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      <span aria-live="polite">{copied ? '주소 복사됨' : label}</span>
    </button>
  )
}
