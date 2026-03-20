import Link from 'next/link'
import { Plane, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & intro */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-navy" />
              </div>
              <div className="leading-tight">
                <div className="text-white/70 text-xs tracking-wide">법무법인</div>
                <div className="text-gold font-black text-lg tracking-tight -mt-0.5">명</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              항공지연·결항 피해 전문 법무법인.<br />
              한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm mb-4 tracking-wide uppercase">서비스</h4>
            <ul className="space-y-2.5">
              {[
                ['항공 지연 보상', '/services'],
                ['항공 결항 보상', '/services'],
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
            <h4 className="text-gold font-semibold text-sm mb-4 tracking-wide uppercase">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>서울특별시 (한국 법인)<br />London, UK (영국 법인)</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>02-000-0000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@lawfirm-myung.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} 법무법인 명. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-white/40 hover:text-white/70 text-xs transition-colors">법인 소개</Link>
            <Link href="/contact" className="text-white/40 hover:text-white/70 text-xs transition-colors">문의하기</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
