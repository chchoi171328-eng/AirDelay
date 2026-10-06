// 서비스 로고: A 모노그램 심볼 + '에어리걸클레임' 워드마크 (Noto Serif KR — 에어리걸 900, 클레임 400)
// 글자는 웹폰트로 렌더합니다. 가로형 SVG(public/brand/lockup-*.svg)는 인쇄물·외부 제출용입니다.
// 두 단어는 색으로만 나눕니다 (사이 여백·구분선·밑줄을 넣지 않습니다).
// 색은 사이트 토큰을 씁니다: 남색 배경 = 흰색 + gold, 밝은 배경 = navy + gold-deep(흰 배경 글자용 골드).
type Props = {
  /** 로고가 올라가는 배경 기준. 'dark' = 남색 배경(헤더·푸터), 'light' = 흰색·크림 배경 */
  tone?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  tagline?: boolean
  className?: string
}

export default function Logo({ tone = 'dark', size = 'md', tagline = false, className = '' }: Props) {
  const main = tone === 'dark' ? 'text-white' : 'text-navy'
  const accent = tone === 'dark' ? 'text-gold' : 'text-gold-deep'
  const sub = tone === 'dark' ? 'text-white/70' : 'text-slate-500'
  const text = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' }[size]
  const icon = { sm: 28, md: 38, lg: 48 }[size]
  // 작은 크기에서는 획을 두껍게 해 명조 글자와 무게를 맞춥니다 (48px 이상은 9로 충분)
  const stroke = size === 'lg' ? 9 : 10

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width={icon} height={icon} viewBox="0 0 120 120" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M22 100 L60 18 L98 100" className={main} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 72 L112 50" className={accent} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-serif ${text} tracking-tight whitespace-nowrap`} aria-hidden="true">
          <span className={`${main} font-black`}>에어리걸</span>
          <span className={`${accent} font-normal`}>클레임</span>
        </span>
        {tagline && (
          <span className={`mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] ${sub}`}>
            <span className={`font-sans font-bold tracking-[0.28em] ${accent}`}>AIRLEGAL CLAIM</span>
            <span className="h-3 w-px bg-current opacity-40" aria-hidden="true" />
            <span className="font-sans">항공지연·결항 보상 · 변호사 직접 청구</span>
          </span>
        )}
      </span>
      <span className="sr-only">에어리걸클레임 (AirLegal Claim)</span>
    </span>
  )
}
