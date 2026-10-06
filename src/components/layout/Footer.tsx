import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { BRAND, FIRM } from '@/lib/site'
import Logo from '@/components/brand/Logo'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 서비스 로고 & 소개 */}
          <div className="md:col-span-2">
            <Logo tone="dark" tagline className="mb-5" />
            <p className="text-white/60 text-sm leading-relaxed max-w-lg break-keep">
              항공지연·결항 보상 전문 서비스. 접수와 진행 확인은 이&nbsp;사이트에서 이루어집니다.<br />
              한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.
            </p>
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

        {/* 운영 주체 — 모든 페이지에 표시합니다. 법인 정보는 메인 사이트와 같은 값(src/lib/site.ts), 소개는 이 사이트의 /about으로만 연결합니다. */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
          <Image src="/images/logo.png" alt={`${FIRM.name} 로고`} width={44} height={43} className="w-11 h-11 object-contain shrink-0" />
          <div className="text-xs text-white/50 space-y-1.5 break-keep">
            <p className="text-sm font-bold text-white">
              {BRAND.name}은 {FIRM.name}(SOL &amp; LUNA)이 운영하는 서비스입니다.
            </p>
            <p>{FIRM.address}</p>
            <p className="flex flex-col sm:flex-row sm:gap-3">
              <span>사업자등록번호: {FIRM.taxId}</span>
              <span className="hidden sm:inline" aria-hidden="true">|</span>
              <span>광고책임변호사: {FIRM.adLawyer}</span>
            </p>
            <p className="pt-1">
              <Link href="/about" className="inline-flex items-center gap-1 font-semibold text-white/70 hover:text-white transition-colors">
                운영 법인 소개 <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {FIRM.name} ({FIRM.nameEn}). All rights reserved.
          </p>
          {/* 법적 고지: 메인 사이트와 같은 네 가지 (개인정보처리방침·이용약관·이메일무단수집거부·면책공고) */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="text-white/70 hover:text-white font-bold text-xs transition-colors">개인정보처리방침</Link>
            {[
              ['이용약관', '/terms'],
              ['이메일무단수집거부', '/email-policy'],
              ['면책공고', '/disclaimer'],
              ['운영 법인 소개', '/about'],
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
