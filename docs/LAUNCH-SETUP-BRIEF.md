# 공개 준비 지침 — Brevo 연결 · 도메인 연결 (air-delay)

2026-11-10: 사용자가 EmailJS 대신 Brevo를 선택했습니다. 이 지침은 기존 EmailJS 연결 안내를 대체합니다.

## 확정한 구성

- 저장소: `chchoi171328-eng/AirDelay`, 운영 브랜치 `master`
- Vercel 프로젝트: `air-delay` (`prj_NDCKqGkvDrKXw4eyTyAaSZ3HQUEY`)
- Vercel 팀: `team_yypZ50mPnkZ3JK46HrZCpGFJ`
- 접수 수신 주소: `airlegalclaim@gmail.com` (Gmail), 대표 전화 `070-4421-7100`
- 등록 업체: 가비아. 구매 도메인 `airlegal.co.kr`, 대표 웹 주소는 `https://www.airlegal.co.kr`로 준비합니다.
- 메일 발신 주소: `intake@airlegal.co.kr`. Brevo에서 발신 도메인을 인증하고 발신자를 등록해야 합니다.
- 접수 1건에 대표 메일함으로 알림 1통만 보냅니다. 고객 확인 메일은 보내지 않습니다.
- 기존 두 사이트가 쓰는 EmailJS 계정과 템플릿은 수정하지 않습니다.
- Supabase는 선택 사항이며, 현재는 웹사이트 DB에 접수 내용을 저장하지 않고 메일로 전달합니다.

## 공개 순서

Vercel은 사용자 지정 도메인을 제외한 배포에 로그인 보호를 적용하고 있습니다.
따라서 웹 도메인 연결 전에 Brevo 연결, 개인정보처리방침 확인, 실제 접수 수신 테스트와 사용자 최종 검토를 끝냅니다.
메일 발신 인증을 위한 TXT·DKIM·DMARC 추가는 웹사이트 공개와 별개입니다.

## 1. Brevo 계정과 발신 도메인

1. 가입·전화번호 인증은 사용자가 직접 완료합니다. 무료 한도는 현재 하루 300통이며 계정 화면에서 확인합니다.
2. Settings → Senders, domains, IPs → Domains에서 `airlegal.co.kr`을 추가합니다.
3. 불필요한 링크 추적용 서브도메인은 추가하지 않고 수동 인증을 선택합니다.
4. Brevo가 해당 계정에 표시하는 Brevo code(TXT), DKIM(CNAME 2개 또는 TXT 1개), DMARC(TXT)를 가비아 DNS에 그대로 추가합니다.
   기존 MX·TXT·웹 레코드가 있으면 보존하고, 기존 DMARC가 있으면 중복 생성하지 않습니다.
5. Brevo에서 Verify records → Authenticate domain을 실행해 인증 상태를 확인합니다.
6. Senders에서 `intake@airlegal.co.kr`, 이름 `에어리걸클레임 (법무법인 명)`을 등록하고 검증 상태를 확인합니다.
7. 트랜잭션 메일 발송 기능이 활성화됐는지 확인합니다. 승인 요청이나 추가 본인 확인이 필요하면 사용자가 완료합니다.

## 2. API 키와 개인정보 보관 설정

- Settings → SMTP & API → API keys & MCP에서 사용자가 API 키를 직접 생성합니다.
- Access는 Restricted, Transactional email은 All, 나머지 권한은 None으로 선택합니다. Read 권한만으로는 발송할 수 없습니다.
- 키·비밀번호·토큰은 채팅, 문서, 커밋, 로그에 적지 않습니다. SMTP 키 대신 API 키를 사용합니다.
- Vercel → air-delay → Environment Variables에 다음 두 변수를 Production과 Preview에 설정합니다.
  - `BREVO_API_KEY`: Secret 유형, 서버 전용. 사용자가 직접 붙여 넣습니다.
  - `BREVO_SENDER_EMAIL`: `intake@airlegal.co.kr`, 서버 발신 주소.
- Next.js의 클라이언트 공개 접두어 `NEXT_PUBLIC_`를 API 키에 붙이지 않습니다.
- Settings → Transactional emails → Retention rules에서 사용자가 발송 로그 보관을 **1개월**, 본문 미리보기를 **Never store previews**로 설정합니다.
- 실제 설정이 개인정보처리방침과 일치하기 전에는 접수 테스트로도 고객 정보를 보내지 않습니다.
- 환경 변수는 새 배포에 적용됩니다. 설정 후 코드 배포 또는 Redeploy를 합니다.

본문은 서버 코드에서 일반 텍스트로 구성하므로 Brevo의 별도 저장 템플릿은 필요하지 않습니다.
제목은 고객 정보를 포함하지 않는 고정 제목이며, Reply-To에 고객 주소를 넣어 대표 메일함에서 답장할 수 있게 합니다.
일시적 실패는 같은 중복 방지 UUID로 한 번 재시도하고, 서비스 응답 본문과 고객 정보를 서버 로그에 남기지 않습니다.

## 3. 공개 전 점검

1. 개인정보처리방침의 위탁·국외 이전 대상이 Brevo(Sendinblue SAS)로 바뀌었는지 확인합니다.
   연락처는 `dpo@brevo.com`, 저장 위치는 프랑스·독일·벨기에입니다.
2. 본문 미리보기 미저장, 발송 로그 1개월 보관(삭제 처리 최대 24시간)을 계정 설정과 맞춥니다.
3. `PRIVACY_POLICY_VERSION`(`src/lib/intake.ts`)을 실제 공개일로 맞춥니다. 날짜가 바뀌면 다시 수정합니다.
4. 아래 검증을 통과하고 `/privacy`에 미기재 표시가 없는지 확인합니다.
   - `node --test tests/intake-notify.test.cjs`
   - `npm run lint`
   - `npm run build`
5. 로그인 보호된 `air-delay.vercel.app/intake`에서 이름에 '테스트'를 넣어 실제 양식으로 한 건 접수합니다.
   스팸 방지 때문에 3초 이상 천천히 입력하며 실제 사건 정보는 사용하지 않습니다.
6. 완료 화면, 대표 Gmail 수신, 한글 제목·본문·발신명, Reply-To를 확인합니다.
   Brevo에 본문 미리보기가 저장되지 않는지 함께 확인합니다.
7. 사용자가 수신과 사이트 전체(가이드 30편 포함) 최종 검토를 마쳤는지 확인한 뒤 웹 도메인을 연결합니다.

## 4. 웹 도메인 연결과 확인

1. Vercel에 `www.airlegal.co.kr`과 `airlegal.co.kr`을 추가합니다.
   `airlegal.co.kr`은 `www.airlegal.co.kr`로 308 리다이렉트합니다.
2. 가비아 DNS에는 Vercel이 해당 프로젝트·도메인에 표시하는 웹용 레코드를 추가하고 Brevo 메일 인증 레코드를 보존합니다.
3. Valid Configuration 및 SSL 발급, HTTP → HTTPS, 대표 주소 리다이렉트를 확인합니다.
4. Production에 `NEXT_PUBLIC_SITE_URL=https://www.airlegal.co.kr`을 넣고 Redeploy합니다.
5. 로그인 없이 사이트가 열리는지, robots.txt·sitemap.xml·canonical·og:image가 대표 도메인을 쓰는지 확인합니다.
6. 공개 주소에서 접수와 대표 Gmail 수신을 한 번 더 확인합니다.
7. 공개 후 README에 공개 주소를 적고 `.claude/skills/air-guide-writer/SKILL.md` 6단계를 공개 후 기준으로 바꿉니다.
   새 가이드는 `draft: true`로 올리고 검토 후 공개합니다.

## 공식 확인 자료

- API 발송: https://developers.brevo.com/reference/send-transac-email
- 중복 방지: https://developers.brevo.com/docs/heterogenous-versions-batch-emails
- DNS 인증: https://help.brevo.com/hc/en-us/articles/12163873383186
- 보관 설정: https://help.brevo.com/hc/en-us/articles/4415743225746
- 데이터 저장 위치: https://help.brevo.com/hc/en-us/articles/360001005510
- 개인정보 연락처: https://help.brevo.com/hc/en-us/articles/360001258744-How-does-Brevo-comply-with-the-GDPR
- 운영 법인: https://partners.brevo.com/experts-agreement
