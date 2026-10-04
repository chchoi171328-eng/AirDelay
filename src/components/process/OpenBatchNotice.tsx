'use client'
import { useEffect, useState } from 'react'
import { CalendarClock } from 'lucide-react'
import { openBatches } from '@/lib/batch'

// 지금 접수 중인 차수 — 날짜에 따라 바뀌므로 방문한 시점의 브라우저 날짜로 계산합니다
export default function OpenBatchNotice() {
  const [batches, setBatches] = useState<ReturnType<typeof openBatches> | null>(null)
  useEffect(() => setBatches(openBatches()), [])

  return (
    <div className="rounded-2xl bg-navy text-white px-6 py-5 flex items-start gap-3">
      <CalendarClock className="w-5 h-5 text-gold mt-0.5 shrink-0" />
      <div className="break-keep">
        <p className="font-bold">모든 항공사의 지연·결항 사건을 접수합니다.</p>
        <p className="text-sm text-white/75 mt-1 min-h-5">
          {batches?.length
            ? <>지금 접수 중인 차수: {batches.map((b) => `${b.label}(${b.flights}, ${b.close} 마감)`).join(' · ')}</>
            : batches && '운항 기간이 끝난 뒤 2개월 동안 접수를 받습니다.'}
        </p>
      </div>
    </div>
  )
}
