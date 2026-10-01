// 미리보기에서만 보이는 초안 표시 (운영 사이트에는 초안이 아예 나오지 않습니다)
export default function DraftBadge({ className = '' }: { className?: string }) {
  return <span className={`badge bg-amber-100 text-amber-800 text-xs ${className}`}>초안 · 미리보기 전용</span>
}
