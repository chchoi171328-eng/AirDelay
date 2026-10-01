import Link from 'next/link'
import { Plane, Calendar, Clock, ChevronRight } from 'lucide-react'
import type { Case } from '@/lib/types'
import { CASE_TYPE_LABELS } from '@/lib/types'
import DraftBadge from './DraftBadge'
import { formatDate } from './PostCard'

export const CASE_TYPE_COLORS: Record<Case['type'], string> = {
  delay: 'bg-amber-50 text-gold-dark',
  cancel: 'bg-red-50 text-red-600',
}

export default function CaseCard({ c }: { c: Case }) {
  return (
    <div className="card p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={`badge text-xs ${CASE_TYPE_COLORS[c.type]}`}>{CASE_TYPE_LABELS[c.type]}</span>
            {c.draft && <DraftBadge />}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-7 h-7 bg-navy/5 rounded-lg flex items-center justify-center">
              <Plane className="w-3.5 h-3.5 text-navy" />
            </div>
            <span className="font-bold text-navy">{c.airline}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1.5">{c.route}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-gray-400">보상금액</div>
          <div className="text-gold font-black text-lg">{c.amount.toLocaleString()}원</div>
        </div>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed flex-1">{c.summary}</p>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          {formatDate(c.flightDate)}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5 text-gold" />
          {c.delay}
        </div>
      </div>

      {c.html && (
        <Link href={`/cases/${c.slug}`} className="flex items-center gap-1 text-navy text-sm font-semibold hover:text-gold transition-colors">
          자세히 보기 <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
