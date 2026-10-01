import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-wide section-padding py-24 text-center">
      <p className="text-navy/30 font-extrabold text-5xl mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 mb-8">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-navy">홈으로</Link>
        <Link href="/intake" className="btn-primary">무료 사건 접수</Link>
      </div>
    </div>
  )
}
