'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
  { href: '/services', label: '서비스 안내' },
  { href: '/process', label: '진행 절차' },
  { href: '/cases', label: '보상 사례' },
  { href: '/blog', label: '법률 정보' },
  { href: '/about', label: '법인 소개' },
  { href: '/contact', label: '문의하기' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="container-wide section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  isActive(link.href) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — 태블릿(md~lg)에서는 메뉴 버튼 옆에 둡니다 */}
          <div className="hidden md:block md:ml-auto md:mr-2 lg:m-0">
            <Link href="/intake" className="btn-primary text-sm py-2.5 px-5">
              사건 접수
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="메뉴"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <nav className="container-wide section-padding py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm font-medium px-4 py-3 rounded-lg transition-all ${
                  isActive(link.href) ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/intake"
              onClick={() => setOpen(false)}
              className="btn-primary text-sm mt-2 justify-center"
            >
              사건 접수
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
