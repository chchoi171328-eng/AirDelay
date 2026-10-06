import type { Metadata } from 'next'
import Link from 'next/link'
import { FIRM } from '@/lib/site'
import LegalDoc, { LegalSection } from '@/components/layout/LegalDoc'

export const metadata: Metadata = {
  title: '이용약관',
  description: `${FIRM.name}(SOL & LUNA)이 운영하는 항공 지연·결항 보상 웹사이트 에어리걸클레임의 이용약관입니다.`,
}

// 제1~4조와 제7조는 메인 사이트 이용약관과 같은 내용입니다. 약관의 주체(본 법인)는 운영 법인인 법무법인 명입니다. 제5·6조는 이 사이트의 온라인 접수에 맞춰 더했습니다.
export default function TermsPage() {
  return (
    <LegalDoc title="이용약관">
      <LegalSection title="제1조 (목적)">
        <p>
          본 약관은 {FIRM.name}(이하 &lsquo;본 법인&rsquo;)이 제공하는 항공 지연·결항 보상 웹사이트 에어리걸클레임(이하 &lsquo;본 사이트&rsquo;) 서비스의
          이용조건 및 절차, 이용자와 본 법인의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </LegalSection>

      <LegalSection title="제2조 (용어의 정의)">
        <p>&lsquo;서비스&rsquo;라 함은 본 법인이 본 사이트를 통해 이용자에게 제공하는 모든 온라인 정보와 온라인 사건 접수 기능을 의미합니다.</p>
      </LegalSection>

      <LegalSection title="제3조 (저작권의 귀속 및 이용제한)">
        <p>
          본 법인이 작성한 저작물에 대한 저작권 및 기타 지적재산권은 본 법인에 귀속합니다. 이용자는 서비스를 이용함으로써 얻은 정보를
          본 법인의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
        </p>
      </LegalSection>

      <LegalSection title="제4조 (면책조항)">
        <p>본 법인은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
      </LegalSection>

      <LegalSection title="제5조 (온라인 사건 접수)">
        <p>
          본 사이트의 온라인 접수는 보상 가능 여부를 검토받기 위한 신청이며, 접수만으로 본 법인과 이용자 사이에 사건 위임계약이 성립하지 않습니다.
          위임계약은 본 법인이 검토 결과를 안내한 뒤 이용자가 청구를 진행하기로 하여 위임 절차를 마친 때에 성립합니다.
        </p>
        <p>이용자는 접수할 때 사실과 다른 내용이나 다른 사람의 정보를 입력해서는 안 됩니다.</p>
      </LegalSection>

      <LegalSection title="제6조 (개인정보 보호)">
        <p>
          서비스 이용 과정에서 받은 개인정보는 본 법인의 <Link href="/privacy" className="text-navy underline underline-offset-2">개인정보처리방침</Link>에 따라 처리합니다.
        </p>
      </LegalSection>

      <LegalSection title="제7조 (정보의 성격)">
        <p>
          본 사이트에 게재된 정보는 일반적인 정보 제공을 목적으로 하며, 구체적인 사안에 대한 법률 자문이 아닙니다. 자세한 내용은{' '}
          <Link href="/disclaimer" className="text-navy underline underline-offset-2">면책공고</Link>를 참고하시기 바랍니다.
        </p>
      </LegalSection>
    </LegalDoc>
  )
}
