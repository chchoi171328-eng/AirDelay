import Image from 'next/image'

// 법인 로고: 메인 사이트(sllaw.co.kr, Test_MainSite1)와 같은 구성 — 기호 + 법무법인 명 + SOL & LUNA
// 남색 배경(헤더·푸터) 위에 쓰는 것을 전제로 글자를 흰색으로 둡니다.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image src="/images/logo.png" alt="" width={40} height={39} className="w-10 h-10 object-contain" />
      <span className="flex flex-col leading-tight">
        <span className="text-white font-bold text-base tracking-wide">법무법인 명</span>
        <span className="text-gold text-[0.65rem] font-semibold tracking-[0.2em] uppercase mt-0.5">Sol &amp; Luna</span>
      </span>
    </span>
  )
}
