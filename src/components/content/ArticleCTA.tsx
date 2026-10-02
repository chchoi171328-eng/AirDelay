import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function ArticleCTA() {
  return (
    <div className="mt-12 rounded-2xl bg-navy p-8 text-center">
      <h2 className="text-xl font-extrabold text-white mb-2">내 항공편도 보상받을 수 있을까요?</h2>
      <p className="text-white/60 text-sm mb-6">접수하시면 영업일 기준 2일 이내에 연락드립니다.</p>
      <Link href="/intake" className="btn-primary">
        <FileText className="w-4 h-4" />
        사건 접수하기
      </Link>
    </div>
  )
}
