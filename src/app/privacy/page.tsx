import type { Metadata } from 'next'
import { FIRM } from '@/lib/site'
import { PRIVACY_POLICY_VERSION } from '@/lib/intake'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: `에어리걸클레임을 운영하는 ${FIRM.name}의 개인정보 처리 목적, 항목, 보유기간 및 정보주체의 권리를 안내합니다.`,
}

// 현재 구성: 접수 내용을 웹사이트 DB에 저장하지 않고 Brevo로 대표 메일함에 전달합니다.
// DB(Supabase)를 연결하면 제5·6·9조에 Supabase를 추가하고 시행일을 바꿔야 합니다.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-navy">{title}</h2>
      <div className="space-y-2 text-[15px] text-gray-600 leading-relaxed">{children}</div>
    </section>
  )
}

const tableCls = 'w-full text-sm border border-gray-200 rounded-lg overflow-hidden [&_th]:bg-gray-50 [&_th]:text-navy [&_th]:font-semibold [&_th]:text-left [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_td]:border-t [&_td]:border-gray-100 [&_td]:align-top'

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader title="개인정보처리방침" subtitle={`시행일 ${PRIVACY_POLICY_VERSION}`} />

      <div className="container-wide section-padding py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 space-y-10">
          <p className="text-[15px] text-gray-600 leading-relaxed">
            {FIRM.name}(이하 &lsquo;법인&rsquo;)은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
            관련 고충을 원활하게 처리하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <Section title="제1조 개인정보의 처리 목적">
            <p>법인은 다음 목적을 위하여 개인정보를 처리하며, 목적이 변경되는 경우에는 별도의 동의를 받습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>항공 지연·결항 피해 사건의 온라인 접수</li>
              <li>접수 내용 확인 및 적용 규정 안내</li>
              <li>안내 및 상담을 위한 연락</li>
            </ul>
          </Section>

          <Section title="제2조 처리하는 개인정보 항목">
            <table className={tableCls}>
              <thead><tr><th className="w-24">구분</th><th>항목</th></tr></thead>
              <tbody>
                <tr><td>필수</td><td>이름, 연락처, 이메일, 항공편 정보(항공사, 출발지·도착지, 운항일, 피해 유형)</td></tr>
                <tr><td>선택</td><td>항공편명, 지연 시간, 피해 상세 내용, 상담 과정에서 제출하시는 증빙 서류(항공권·탑승권·지연확인서 등)</td></tr>
                <tr><td>자동 생성</td><td>서비스 이용 과정에서 IP 주소, 접속 일시 등 접속 기록이 생성될 수 있습니다.</td></tr>
              </tbody>
            </table>
            <p>증빙 서류에 여권번호 등 고유식별정보가 포함된 경우 해당 부분을 가린 뒤 제출해 주시기 바랍니다.</p>
          </Section>

          <Section title="제3조 개인정보의 처리 및 보유 기간">
            <ul className="list-disc pl-5 space-y-1">
              <li>온라인 접수 정보: 접수일로부터 1년</li>
              <li>사건을 수임한 경우: 위임계약 종료 후 관계 법령에서 정한 기간</li>
            </ul>
            <p>보유 기간이 지나거나 처리 목적이 달성되면 지체 없이 파기합니다.</p>
          </Section>

          <Section title="제4조 개인정보의 제3자 제공">
            <p>
              법인은 접수 단계에서 개인정보를 제3자에게 제공하지 않습니다. 사건 수임 후 항공사, 법원 등에 제공이
              필요한 경우에는 제공받는 자, 목적, 항목, 보유 기간을 알리고 별도의 동의를 받습니다.
            </p>
          </Section>

          <Section title="제5조 개인정보 처리의 위탁">
            <table className={tableCls}>
              <thead><tr><th>수탁자</th><th>위탁 업무</th></tr></thead>
              <tbody>
                <tr><td>Vercel Inc.</td><td>웹사이트 호스팅 및 접수 요청 처리</td></tr>
                <tr><td>Brevo (Sendinblue SAS)</td><td>접수 알림 메일 발송</td></tr>
                <tr><td>Google LLC (Gmail)</td><td>대표 메일함 제공 — 접수 알림 메일 수신 및 보관</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="제6조 개인정보의 국외 이전">
            <p>법인은 위탁 업무 수행을 위하여 다음과 같이 개인정보를 국외로 이전합니다(「개인정보 보호법」 제28조의8).</p>
            <div className="overflow-x-auto">
              <table className={`${tableCls} min-w-[560px]`}>
                <thead><tr><th>이전받는 자(연락처)</th><th>국가</th><th>이전 항목</th><th>일시·방법</th><th>보유 기간</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Vercel Inc. (privacy@vercel.com)</td>
                    <td>미국 (워싱턴 D.C. iad1 리전)</td>
                    <td>제2조의 접수 정보</td>
                    <td>접수 시 네트워크를 통해 전송</td>
                    <td>요청 처리 후 즉시 삭제(접속 기록 제외)</td>
                  </tr>
                  <tr>
                    <td>Brevo (Sendinblue SAS, dpo@brevo.com)</td>
                    <td>프랑스·독일·벨기에 (서버 및 데이터 저장 소재지)</td>
                    <td>이름, 연락처, 이메일, 항공편 정보, 피해 상세 내용</td>
                    <td>접수 시 네트워크를 통해 전송</td>
                    <td>메일 본문 미리보기는 저장하지 않음. 발송 로그(메일 주소, 발송 시각·상태 등)는 1개월 보관 후 삭제(삭제 처리에 최대 24시간 소요)</td>
                  </tr>
                  <tr>
                    <td>Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA · policies.google.com/privacy)</td>
                    <td>미국 등 Google 데이터센터 소재국</td>
                    <td>이름, 연락처, 이메일, 항공편 정보, 피해 상세 내용</td>
                    <td>접수 시 대표 메일함으로 이메일 전송</td>
                    <td>제3조와 같음</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              온라인 접수 단계에서는 영국 협업 변호사에게 개인정보를 전달하지 않습니다. 사건을 위임하신 뒤 유럽·영국 노선 등
              영국 변호사의 확인이 필요한 경우에는 전달 항목·방법·보유 기간을 안내하고 별도 동의를 받은 뒤 전달합니다.
            </p>
            <p>국외 이전을 원하지 않으시면 온라인 접수 대신 전화로 접수하실 수 있습니다.</p>
          </Section>

          <Section title="제7조 개인정보의 파기 절차 및 방법">
            <p>
              보유 기간이 지난 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는 방법으로 삭제하고,
              종이 문서는 분쇄하거나 소각합니다.
            </p>
          </Section>

          <Section title="제8조 정보주체의 권리와 행사 방법">
            <p>
              정보주체는 언제든지 개인정보 열람, 정정·삭제, 처리정지 및 동의 철회를 요구할 수 있습니다.
              아래 제10조의 연락처로 서면, 전화, 이메일을 통해 요청하시면 지체 없이 조치하겠습니다.
            </p>
          </Section>

          <Section title="제9조 개인정보의 안전성 확보 조치">
            <ul className="list-disc pl-5 space-y-1">
              <li>전송 구간 암호화(HTTPS)</li>
              <li>접수 내용은 웹사이트에 저장하지 않고 법인 업무용 메일함으로만 전달</li>
              <li>개인정보에 접근할 수 있는 담당자를 최소한으로 제한</li>
            </ul>
          </Section>

          <Section title="제10조 개인정보 보호책임자">
            <table className={tableCls}>
              <tbody>
                <tr><th className="w-28">담당</th><td>경영지원팀</td></tr>
                <tr><th>전화</th><td><a href={`tel:${FIRM.phone}`} className="hover:text-navy">{FIRM.phone}</a></td></tr>
                <tr><th>이메일</th><td><a href={`mailto:${FIRM.email}`} className="hover:text-navy">{FIRM.email}</a></td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="제11조 권익침해 구제 방법">
            <p>개인정보 침해에 대한 신고나 상담이 필요하시면 아래 기관에 문의하실 수 있습니다.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
              <li>개인정보침해신고센터: (국번 없이) 118 (privacy.kisa.or.kr)</li>
              <li>대검찰청: (국번 없이) 1301 (www.spo.go.kr)</li>
              <li>경찰청: (국번 없이) 182 (ecrm.police.go.kr)</li>
            </ul>
          </Section>

          <Section title="제12조 개인정보처리방침의 변경">
            <p>이 개인정보처리방침은 {PRIVACY_POLICY_VERSION}부터 적용됩니다.</p>
          </Section>
        </div>
      </div>
    </div>
  )
}
