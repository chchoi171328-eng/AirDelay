import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function ArticleCTA() {
  return (
    <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
      <h2 className="text-xl font-black text-white mb-2">내 항공편도 보상받을 수 있을까요?</h2>
      <p className="text-white/60 text-sm mb-6">무료로 접수하시면 48시간 내에 담당 변호사가 검토 결과를 알려드립니다.</p>
      <Link href="/intake" className="btn-primary">
        <FileText className="w-4 h-4" />
        무료 사건 접수
      </Link>
    </div>
  )
}
