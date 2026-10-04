import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FIRM } from '@/lib/site'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & intro */}
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs break-keep">
              항공지연·결항 피해 전문 법무법인.<br />
              한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.
            </p>
            {/* 법인 표기: 메인 사이트(sllaw.co.kr) 푸터와 같은 항목·같은 글자로 유지합니다 (src/lib/site.ts) */}
            <div className="mt-6 text-xs text-white/50 space-y-1.5 break-keep">
              <p>{FIRM.name}({FIRM.nameEn})</p>
              <p>{FIRM.address}</p>
              <p className="flex flex-col sm:flex-row sm:gap-3">
                <span>사업자등록번호: {FIRM.taxId}</span>
                <span className="hidden sm:inline" aria-hidden="true">|</span>
                <span>광고책임변호사: {FIRM.adLawyer}</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">안내</h4>
            <ul className="space-y-2.5">
              {[
                ['보상 기준', '/services'],
                ['진행 절차와 비용', '/process'],
                ['자주 묻는 질문', '/faq'],
                ['사건 접수', '/intake'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/60 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-white/50 mt-0.5 shrink-0" />
                <span className="break-keep">{FIRM.addressParts.region} {FIRM.addressParts.locality} (한국 법인)<br />London, UK (영국 법인)</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 text-white/50 shrink-0" />
                <a href={`tel:${FIRM.phone}`} className="hover:text-white transition-colors">{FIRM.phone}</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 text-white/50 shrink-0" />
                <a href={`mailto:${FIRM.email}`} className="hover:text-white transition-colors">{FIRM.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} {FIRM.nameEn}. All rights reserved.
          </p>
          {/* 법적 고지: 메인 사이트와 같은 네 가지 (개인정보처리방침·이용약관·이메일무단수집거부·면책공고) */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="text-white/70 hover:text-white font-bold text-xs transition-colors">개인정보처리방침</Link>
            {[
              ['이용약관', '/terms'],
              ['이메일무단수집거부', '/email-policy'],
              ['면책공고', '/disclaimer'],
              ['법인 소개', '/about'],
              ['연락처', '/about#contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-white/60 hover:text-white/70 text-xs transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
