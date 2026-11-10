# 공개 준비 지침 — EmailJS 연결 · 도메인 연결 (air-delay)

> AI 작업자용 지침. 이 저장소(`chchoi171328-eng/AirDelay`, Next.js 15 + Vercel)의 사이트 **에어리걸클레임**을
> 실제 메일이 오는 상태로 만들고, 구매한 도메인에 연결해 공개하는 작업이다.
> 비밀값(키·토큰)은 이 문서에도, 채팅에도, 커밋에도 적지 않는다. 값은 사용자가 Vercel·EmailJS 화면에 직접 넣거나, 비밀값 입력 전용 도구로만 받는다.

## 0. 현재 상태와 전제

| 항목 | 값 |
|---|---|
| Vercel 팀 / 프로젝트 | `team_yypZ50mPnkZ3JK46HrZCpGFJ` / `air-delay` (`prj_NDCKqGkvDrKXw4eyTyAaSZ3HQUEY`) |
| 운영 브랜치 | `master` (푸시하면 자동 배포) |
| 현재 주소 | `air-delay.vercel.app` — **Vercel 로그인 보호** 상태 (설정: 사용자 지정 도메인을 제외한 모든 배포 보호) |
| 접수 처리 | `src/app/api/intake/route.ts` → EmailJS로 **법인 수신용 알림 메일 한 통** 발송. 고객에게는 완료 화면으로만 알리고 확인 메일은 보내지 않는다. Supabase는 선택(미설정이면 메일만) |
| 지금 접수하면 | EmailJS 미설정이라 503 → 고객에게 "접수를 저장하지 못했습니다" 오류 안내가 뜬다 |

**가장 중요한 순서 규칙:** 보호 설정이 "사용자 지정 도메인 제외"이므로, **도메인을 연결하는 순간 사이트가 누구에게나 공개된다.**
따라서 EmailJS 연결(1절)과 공개 전 점검(2절)을 끝내고 사용자 확인을 받은 뒤에 도메인(3절)을 연결한다. 순서를 바꾸지 않는다.

## 사용자에게 먼저 물을 것 (답을 받기 전에는 진행하지 않는다)

1. 구매한 **도메인 이름**과 **등록 업체**(가비아, 후이즈, Cloudflare, Namecheap 등), 등록 업체 DNS 화면에 접근할 수 있는지
2. 대표 주소를 `example.com`(권장)으로 할지 `www.example.com`으로 할지 — 나머지 하나는 대표 주소로 자동 이동시킨다
3. 접수 메일을 **받을 주소**(기본 후보: `sllaw@sllaw.co.kr`). 메일함 서비스는 Google(Google Workspace)로 정해졌고 개인정보처리방침에 반영돼 있다
4. EmailJS 계정은 누구 명의로 만들지 (법인 메일로 가입 권장), 유료 요금제를 쓸지 — 무료 요금제는 월 요청 200회·템플릿 2개 한도(2026년 11월 기준, EmailJS 화면에서 재확인). 접수 1건당 요청 1회이므로 **월 200건**까지 받을 수 있다. 템플릿은 1개만 쓴다
5. 공개 시점 — 2절 점검이 끝난 뒤 바로 공개할지, 날짜를 정할지

## 1. EmailJS 연결 (도메인 연결 전에 끝낸다)

### 1-1. 코드가 기대하는 것 (바꾸지 말 것)

환경 변수 이름 (`.env.example` 참고):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID          EmailJS 서비스 ID
NEXT_PUBLIC_EMAILJS_FIRM_TEMPLATE_ID    법인 수신용 템플릿 ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY          EmailJS Public Key
EMAILJS_PRIVATE_KEY                     EmailJS Private Key — 서버 전용. 절대 NEXT_PUBLIC_ 을 붙이지 않는다
```

메일은 **서버(Vercel 함수)에서** `https://api.emailjs.com/api/v1.0/email/send`로 보낸다. 그래서 EmailJS 계정 설정이 두 가지 필요하다.
- Account → Security: **"Allow EmailJS API for non-browser applications" 켜기**
- Account → Security: **"Use Private Key" 켜기** (공개 키만으로는 발송이 안 되게 막는다)

코드가 템플릿에 넘기는 변수 (`src/lib/intake-notify.ts`). 발송은 접수 1건당 한 번이고, 429·서버 오류면 1.2초 뒤 한 번만 다시 보낸다.

| 변수 | 내용 |
|---|---|
| `from_name` | `에어리걸클레임 (법무법인 명)` — From Name 칸에 `{{from_name}}` |
| `name`, `phone`, `email` | 고객 이름, 연락처, 이메일 |
| `airline`, `flightNo`, `route`, `date` | 항공사, 편명(없으면 `-`), `출발지 → 도착지`, 운항일 |
| `type`, `delay_hours` | 지연/결항, 지연 시간(없으면 `-`) |
| `detail` | 피해 상세(없으면 `-`) |
| `intake_id` | DB 접수 번호 (Supabase 미설정이면 `-`) |

### 1-2. EmailJS 화면에서 할 일

1. **Email Services**에서 접수 메일을 받을 메일함을 연결한다(사용자가 로그인해 연결해야 한다). 서비스 ID를 기록한다.
2. **법인용 템플릿** 만들기
   - To: 접수 수신 주소 (사용자가 정한 주소)
   - From Name: `{{from_name}}` · Reply-To: `{{email}}` (답장하면 고객에게 가도록)
   - Subject 예: `[에어리걸클레임 접수] {{airline}} {{route}} {{date}} — {{name}}`
   - 본문: 위 표의 법인용 변수를 모두 넣는다. 예:
     ```
     접수 번호: {{intake_id}}
     이름: {{name}} / 연락처: {{phone}} / 이메일: {{email}}
     항공사: {{airline}} / 편명: {{flightNo}}
     노선: {{route}} / 운항일: {{date}}
     피해 유형: {{type}} / 지연 시간: {{delay_hours}}
     상세 내용:
     {{detail}}
     ```
3. **고객용 템플릿은 만들지 않는다.** 고객에게는 완료 화면("접수가 완료됐습니다 — 영업일 기준 2일 이내에 연락드립니다")으로 알리고 확인 메일은 보내지 않는다. 코드에도 고객 발송이 없다. 템플릿을 하나만 쓰므로 무료 요금제의 템플릿 2개 한도에도 걸리지 않는다.
4. **Email History(발송 기록) 보관 설정**을 확인한다. EmailJS는 보낸 메일의 내용(접수 내용 = 고객 개인정보)을 대시보드 History에 일정 기간 보관한다(외부 비교 사이트 기준 무료 7일·Personal 30일 — EmailJS 화면·요금제 페이지에서 직접 확인). 템플릿 설정에서 기록 저장을 끌 수 있다. 끄거나, 실제 보관 기간을 2절의 개인정보처리방침 제6조 EmailJS 행에 적는다.

### 1-3. Vercel 환경 변수

- Vercel → 프로젝트 `air-delay` → Settings → Environment Variables에 위 4개를 넣는다. 환경은 **Production과 Preview 모두**.
- 값은 사용자가 직접 붙여 넣는다. AI는 이름과 환경만 안내한다. 채팅으로 값을 받지 않는다.
- 환경 변수는 **다음 배포부터** 적용된다. 넣은 뒤 Deployments에서 최신 배포를 Redeploy 한다.

### 1-4. 테스트

1. `air-delay.vercel.app/intake`(로그인 보호 상태라 사용자가 Vercel에 로그인한 브라우저로)에서 실제 양식으로 한 건 접수한다. 이름에 `테스트`를 넣는다.
   - 양식에는 스팸 방지가 있다: 3초 안에 제출하면 저장 없이 성공처럼 응답한다. 천천히 입력한다.
2. 확인할 것: 완료 화면이 뜨는지 / 법인 메일함에 접수 메일이 왔는지 / 발신명이 `에어리걸클레임 (법무법인 명)`인지 / 답장이 고객 주소로 가는지. 고객 주소로는 아무 메일도 가지 않는 것이 정상이다.
3. 실패하면 Vercel → 프로젝트 → Logs에서 `[intake]`로 시작하는 오류를 본다. 요금제상 로그는 짧게만 남으니 테스트 직후에 본다.

## 2. 공개 전 점검 (도메인 연결 전에 끝내고 사용자 확인을 받는다)

1. **개인정보처리방침 미기재 표시 채우기** — `src/app/privacy/page.tsx`에 `<Blank>…</Blank>`로 표시된 곳이 화면에 노란 〔 〕로 그대로 보인다. 안의 값은 제안값이다. 확인한 값으로 바꾸고 `<Blank>` 표시를 지운다. (2026-11-10 기준 남은 곳 4군데)
   - 제3조 온라인 접수 정보 보유 기간 〔1년〕: 사용자가 정한다
   - 제6조(국외 이전) EmailJS 행: 연락처 〔support@emailjs.com〕, 국가 〔싱가포르(법인) · 미국(서버)〕, 보관 기간 〔7일〕 — EmailJS 이용약관·개인정보처리방침·요금제 페이지와 1-2의 4에서 확인한 값으로 맞춘다(추측하지 않는다)
   - 이미 채운 것: 제5조 EmailJS 운영 법인(EmailJS Pte. Ltd., 이용약관 기준) / 법인 메일 = Google LLC(Google Workspace) / 제6조 Vercel 행(privacy@vercel.com, 미국 iad1) / Google 행 / 영국 협업 변호사는 접수 단계에서 전달하지 않고 위임 후 별도 동의로 정리
   - 다 채운 뒤 `PRIVACY_POLICY_VERSION`(`src/lib/intake.ts`)을 공개일로 바꾼다. 접수 양식의 동의 기록이 이 값을 쓴다
2. `npm run lint && npm run build`가 통과하는지, `/privacy`에 〔 〕가 남아 있지 않은지 확인한다.
3. 접수가 실제로 도착하는 것(1-4)을 사용자가 직접 확인했는지 묻는다.
4. **사용자 최종 검토** — 공개 전에 사용자가 사이트 전체(특히 가이드 30편)를 한 번 보기로 되어 있다. 검토를 마쳤는지 묻고, 마치지 않았으면 도메인을 연결하지 않는다.

## 3. 도메인 연결

1. Vercel → 프로젝트 `air-delay` → Settings → **Domains**에서 대표 도메인과 `www`를 둘 다 추가한다. 대표가 아닌 쪽은 대표로 **Redirect(308)** 되게 설정한다. (Vercel MCP가 있으면 `add_project_domain` → `get_project_domain`/`verify_project_domain`으로 같은 일을 할 수 있다.)
2. Vercel이 보여 주는 DNS 값을 **그대로** 등록 업체 DNS에 넣는다. 보통 대표 도메인은 A 레코드, `www`는 CNAME이지만, 화면에 표시된 값을 기준으로 한다. 등록 업체의 네임서버를 Vercel로 옮기는 방법도 있다(Vercel이 안내하는 네임서버 2개). 등록 업체에 기본으로 들어 있는 파킹용 A/CNAME 레코드가 있으면 지운다.
3. Vercel Domains 화면에서 **Valid Configuration**이 되고 SSL 인증서가 발급될 때까지 기다린다(보통 몇 분, 길면 수십 분).
4. **사이트 주소 설정**: `src/lib/site.ts`의 `SITE_URL`은 `NEXT_PUBLIC_SITE_URL`이 있으면 그 값을, 없으면 Vercel의 운영 도메인을 쓴다. 검색엔진용 정규 주소·OG 이미지 주소·sitemap·구조화 데이터가 모두 이 값을 쓰므로, Production 환경 변수에 `NEXT_PUBLIC_SITE_URL=https://대표도메인` (끝에 슬래시 없이)을 넣고 Redeploy 한다.

## 4. 연결 후 확인

- `https://대표도메인`이 로그인 없이 열리고, 다른 쪽(`www` 또는 대표 없는 쪽)이 대표로 이동한다. `https://`로 자동 전환된다
- `https://대표도메인/robots.txt`와 `/sitemap.xml`에 대표 도메인이 적혀 있다
- 홈 HTML의 `<meta property="og:image">`와 `<link rel="canonical">`이 대표 도메인으로 시작한다
- `/intake`에서 한 번 더 실제 접수 테스트 (공개 주소에서 메일 도착 확인)
- `/privacy`에 〔 〕가 없다
- 사용자가 원하면 Google Search Console에 도메인 속성을 추가하고 sitemap을 제출한다(소유 확인은 Vercel DNS에 TXT 레코드 추가)
- 기존 `air-delay.vercel.app` 주소는 Vercel 보호가 그대로 남아도 된다. 대표 도메인만 공개된다

## 5. 공개 후 저장소 정리 (같은 PR/커밋으로)

1. `.claude/skills/air-guide-writer/SKILL.md` 6단계의 "공개 전/후" 안내를 **공개 후** 기준으로 바꾼다: 새 가이드는 `draft: true`로 올려 검토 후 공개. 날짜를 적는다.
2. `README.md`에 공개 주소 한 줄.
3. 커밋 메시지는 한국어로, 무엇을 왜 바꿨는지. 비밀값이 섞이지 않았는지 `git diff`로 확인한다. `.env*` 파일은 커밋하지 않는다.

## 6. 하지 말 것

- 키·토큰을 채팅, 문서, 커밋, 로그에 적는 것. `EMAILJS_PRIVATE_KEY`에 `NEXT_PUBLIC_` 접두어를 붙이는 것
- 2절이 끝나기 전에 도메인을 연결하는 것 (= 미완성 상태로 공개)
- 코드가 기대하는 환경 변수 이름이나 템플릿 변수 이름을 바꾸는 것
- 고객 확인 메일용 템플릿을 만들거나 코드에 고객 발송을 추가하는 것 (요청 한도를 두 배로 쓰게 된다)
- 사이트 본문·가격·절차 문구를 이 작업에서 고치는 것 (범위 밖)

## 7. 보고 형식

작업이 끝나면 아래를 사용자에게 보고한다.
- EmailJS: 연결한 메일함(주소만), 템플릿 2개 ID의 **존재 여부**(값은 적지 않음), Security 설정 2개 상태, 테스트 접수 결과(법인 메일·고객 메일 도착 여부, 발신명)
- 개인정보처리방침: 채운 항목 목록, 바꾼 시행일
- 도메인: 대표 주소, 리다이렉트 방향, DNS 방식(레코드/네임서버), SSL 발급 시각, `NEXT_PUBLIC_SITE_URL` 설정 여부
- 연결 후 확인 항목(4절) 각각의 결과
- 사용자가 결정해야 남은 것, 확인하지 못한 것
