import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'

// 가이드 맺음 안내 — 본문에는 광고성 문장을 두지 않고, 접수 안내는 이 상자 하나로만 합니다.
// 글마다 ctaSituation을 적으면 첫 문장을 주제에 맞게 바꿉니다. ctaNote를 적으면 그 글에만 한 문단을 덧붙입니다
// (법인이 그 주제와 어떤 관계인지 밝히는 문장 — 본문이 아니라 이 상자에만 둡니다).
export default function ArticleCTA({ cta }: { cta?: { situation: string; note?: string } | null }) {
  return (
    <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
      <h2 className="text-xl font-extrabold text-white mb-3">내 항공편도 보상받을 수 있을까요?</h2>
      <p className="text-white/80 leading-relaxed break-keep max-w-xl mx-auto">
        {cta ? `${cta.situation}, 접수하시면 적용 규정과 진행 방법을 안내드립니다.` : '항공편 정보만 입력하시면 접수가 끝나고, 적용 규정과 진행 방법을 안내드립니다.'}
      </p>
      {cta?.note && <p className="text-white/80 leading-relaxed break-keep max-w-xl mx-auto mt-3">{cta.note}</p>}
      <p className="text-white/60 text-sm mt-2 mb-6 break-keep">
        접수 후 영업일 기준 2일 이내에 연락드리며, 보상금을 받은 경우에만 성공보수 30%(부가세&nbsp;별도)가 발생합니다.
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
