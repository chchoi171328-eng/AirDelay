import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'

// 가이드 맺음 안내 — 본문에는 광고성 문장을 두지 않고, 접수 안내는 이 상자 하나로만 합니다.
// 글마다 ctaSituation·ctaOffer를 적으면 첫 문장을 주제에 맞게 바꿉니다.
export default function ArticleCTA({ cta }: { cta?: { situation: string; offer: string } | null }) {
  return (
    <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
      <h2 className="text-xl font-extrabold text-white mb-3">내 항공편도 보상받을 수 있을까요?</h2>
      <p className="text-white/80 leading-relaxed break-keep max-w-xl mx-auto">
        {cta ? `${cta.situation}, ${cta.offer}부터 확인해 드립니다.` : '항공편 정보만 입력하시면 보상 가능 여부부터 확인해 드립니다.'}
      </p>
      <p className="text-white/60 text-sm mt-2 mb-6 break-keep">
        접수 후 영업일 기준 2일 이내에 연락드리며, 보상금을 받은 경우에만 성공보수 25%(부가세 포함)가 발생합니다.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/intake" className="btn-primary">
          <FileText className="w-4 h-4" />
          사건 접수하기
        </Link>
        <Link href="/process" className="btn-outline">
          진행 절차와 비용
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
