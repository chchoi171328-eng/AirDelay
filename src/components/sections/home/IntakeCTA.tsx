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
            접수 후 영업일 기준 2일 이내에 연락드립니다.<br />
            보상 가능 여부를 안내드리거나, 판단에 필요한 내용을 여쭤봅니다.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <Link href="/intake" className="btn-primary px-8 sm:px-10 py-4 text-base">
              <FileText className="w-5 h-5" />
              사건 접수하기
            </Link>
            <a href={`tel:${FIRM.phone}`} className="btn-outline px-8 sm:px-10 py-4 text-base">
              <Phone className="w-5 h-5" />
              전화 문의 {FIRM.phone}
            </a>
          </div>

          <p className="text-white/60 text-sm mt-6">
            ※ 항공사 청구 단계는 비용이 없고, 보상금을 받은 경우에만 성공보수 25%(부가세 포함)가 발생합니다.{' '}
            <Link href="/services#cost" className="underline underline-offset-2 hover:text-white">비용 안내</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
