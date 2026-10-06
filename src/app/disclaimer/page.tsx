import type { Metadata } from 'next'
import { FIRM } from '@/lib/site'
import LegalDoc from '@/components/layout/LegalDoc'

export const metadata: Metadata = {
  title: '면책공고',
  description: `${FIRM.name}(SOL & LUNA)이 운영하는 항공 지연·결항 보상 웹사이트 에어리걸클레임의 면책공고입니다.`,
}

// 첫 세 문단은 메인 사이트 면책공고와 같은 내용이고, 뒤 두 문단은 이 사이트의 보상 안내·사례에 맞춰 더했습니다.
export default function DisclaimerPage() {
  return (
    <LegalDoc title="면책공고">
      <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
        <p>
          {FIRM.name}이 운영하는 항공 지연·결항 보상 웹사이트 에어리걸클레임(이하 &lsquo;본 사이트&rsquo;)에 게재된 모든 내용은 일반적인 정보 제공을 목적으로 작성된 것이며,{' '}
          <strong className="text-navy">구체적인 사안에 대한 법률적 자문이나 해석을 의미하지 않습니다.</strong>
        </p>
        <p>
          본 사이트의 방문자는 본 사이트에서 제공하는 정보에 기초하여 어떠한 조치를 취하시기에 앞서, 반드시 본 법인의 변호사로부터 실질적인 법률 자문을 구하시기 바랍니다.
        </p>
        <p>
          본 사이트의 정보에 의존하여 발생한 어떠한 결과에 대해서도 {FIRM.name}은 법적 책임을 지지 않음을 알려드립니다. 본 사이트의 내용은 예고 없이 변경될 수 있습니다.
        </p>
        <p>
          본 사이트에 안내한 EU261·UK261 등의 보상 금액은 항공사에 청구할 때의 규정 기준입니다. 실제 보상 여부와 금액은 항공편과 지연·결항 사유 등 구체적인
          사실관계에 따라 달라지며, 소송으로 진행하는 경우 법원이 한국법에 따라 판단할 수 있어 인정 금액이 이와 다르거나 적을 수 있습니다.
        </p>
        <p>본 사이트에 게재된 보상 사례는 개별 사건의 결과이며, 다른 사건에서 같은 결과를 보장하지 않습니다.</p>
      </div>
    </LegalDoc>
  )
}
