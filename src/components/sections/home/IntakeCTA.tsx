import Link from 'next/link'
import { FileText, Phone } from 'lucide-react'
import { FIRM } from '@/lib/site'

// 페이지 맨 아래 접수 안내 — 남색 푸터와 붙어 보이지 않도록 밝은 바탕 위의 카드로 둡니다.
export default function IntakeCTA() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-wide section-padding">
        <div className="bg-navy rounded-3xl px-6 py-12 sm:px-12 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 text-balance">
            지금 바로 사건을 접수하세요
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            검토 후 48시간 내에 담당 변호사가 연락드립니다.<br />
            모든 검토는 무료로 진행됩니다.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link href="/intake" className="btn-primary px-8 sm:px-10 py-4 text-base">
              <FileText className="w-5 h-5" />
              무료 사건 접수
            </Link>
            <a href={`tel:${FIRM.phone}`} className="btn-outline px-8 sm:px-10 py-4 text-base">
              <Phone className="w-5 h-5" />
              전화 문의 {FIRM.phone}
            </a>
          </div>

          <p className="text-white/60 text-sm mt-6">
            ※ 승소 시에만 수임료가 발생합니다 (성공 보수 방식)
          </p>
        </div>
      </div>
    </section>
  )
}
