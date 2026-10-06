import type { Metadata } from 'next'
import { FIRM } from '@/lib/site'
import LegalDoc from '@/components/layout/LegalDoc'

export const metadata: Metadata = {
  title: '이메일무단수집거부',
  description: `${FIRM.name}(SOL & LUNA)의 이메일무단수집거부 안내입니다.`,
}

// 메인 사이트 이메일무단수집거부와 같은 내용입니다.
export default function EmailPolicyPage() {
  return (
    <LegalDoc title="이메일무단수집거부">
      <div className="rounded-xl bg-red-50 border-l-4 border-red-500 px-5 py-4">
        <p className="font-bold text-red-800 leading-relaxed">
          본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.
        </p>
      </div>
      <p className="text-[15px] text-gray-600 leading-relaxed">
        이를 위반 시 <strong className="text-navy">정보통신망 이용촉진 및 정보보호 등에 관한 법률</strong> 등에 의해 형사처벌 될 수 있음을 유념하시기 바랍니다.
      </p>
      <p className="text-right text-xs text-gray-500">
        게시일: 2026년 10월 4일
        <br />
        {FIRM.name}(SOL &amp; LUNA)
      </p>
    </LegalDoc>
  )
}
