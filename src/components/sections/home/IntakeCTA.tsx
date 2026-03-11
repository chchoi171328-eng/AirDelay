import Link from 'next/link'
import { FileText, Phone } from 'lucide-react'

export default function IntakeCTA() {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/3 rounded-full" />

      <div className="container-wide section-padding relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 text-balance">
          지금 바로 사건을 접수하세요
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
          검토 후 48시간 내에 담당 변호사가 연락드립니다.<br />
          모든 검토는 무료로 진행됩니다.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/intake" className="btn-primary px-10 py-4 text-base">
            <FileText className="w-5 h-5" />
            무료 사건 접수
          </Link>
          <Link href="/contact" className="btn-outline px-10 py-4 text-base">
            <Phone className="w-5 h-5" />
            전화 문의하기
          </Link>
        </div>

        <p className="text-white/30 text-sm mt-6">
          ※ 승소 시에만 수임료가 발생합니다 (성공 보수 방식)
        </p>
      </div>
    </section>
  )
}
