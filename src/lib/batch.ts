// 공동소송 차수 계산 — 진행 절차 페이지(src/app/process/page.tsx)의 차수 일정과 같은 규칙입니다.
// 운항일 기준 6개월 단위(상반기 1~6월, 하반기 7~12월)로 묶고, 운항 기간이 끝나고 2개월 뒤 접수를 마감합니다.
// 마감이 지난 뒤 접수하면 접수 시점에 열려 있는 차수로 넘어갑니다.

export interface Batch {
  label: string // '2026년 하반기'
  close: string // '2027년 2월 말'
  file: string // '2027년 5월 중'
  rolledOver: boolean // 운항일 기준 차수가 이미 마감되어 다음 차수로 넘어갔는지
}

type Half = 1 | 2

// 상반기는 8월 31일, 하반기는 다음 해 2월 말일까지 접수 (그날 끝까지)
function closeDate(year: number, half: Half) {
  return half === 1 ? new Date(year, 7, 31, 23, 59, 59) : new Date(year + 1, 2, 0, 23, 59, 59)
}

/** flightDate: 'YYYY-MM-DD' 운항 날짜, now: 접수 시각 */
export function batchFor(flightDate: string, now = new Date()): Batch | null {
  const m = /^(\d{4})-(\d{2})-\d{2}$/.exec(flightDate)
  if (!m) return null
  let year = Number(m[1])
  let half: Half = Number(m[2]) <= 6 ? 1 : 2
  let rolledOver = false
  while (closeDate(year, half) < now) {
    rolledOver = true
    if (half === 1) half = 2
    else {
      half = 1
      year += 1
    }
  }
  return {
    label: `${year}년 ${half === 1 ? '상반기' : '하반기'}`,
    close: half === 1 ? `${year}년 8월 말` : `${year + 1}년 2월 말`,
    file: half === 1 ? `${year}년 11월 중` : `${year + 1}년 5월 중`,
    rolledOver,
  }
}

/** 운항 후 1년 4개월이 넘은 항공편 — 다음 차수로는 몬트리올 협약 2년 안에 소송을 내지 못할 수 있어 기한을 따로 확인합니다 */
export function needsDeadlineCheck(flightDate: string, now = new Date()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(flightDate)
  if (!m) return false
  return new Date(Number(m[1]), Number(m[2]) - 1 + 16, Number(m[3])) < now
}

/** 지금 접수 중인 차수 — 운항 기간이 시작됐고 접수 마감 전인 차수 (1~2월, 7~8월에는 두 차수가 겹칩니다) */
export function openBatches(now = new Date()): { label: string; flights: string; close: string }[] {
  const y = now.getFullYear()
  const candidates: [number, Half][] = [[y - 1, 2], [y, 1], [y, 2]]
  return candidates
    .filter(([year, half]) => new Date(year, half === 1 ? 0 : 6, 1) <= now && closeDate(year, half) >= now)
    .map(([year, half]) => ({
      label: `${year}년 ${half === 1 ? '상반기' : '하반기'}`,
      flights: half === 1 ? '1~6월 운항분' : '7~12월 운항분',
      close: half === 1 ? `${year}년 8월 말` : `${year + 1}년 2월 말`,
    }))
}
