# 에어리걸클레임 (AirLegal Claim)

항공지연·결항 보상 전문 서비스 **에어리걸클레임** 웹사이트입니다. 운영: 법무법인 명(SOL & LUNA).

- 기술: Next.js 14 (App Router) · Tailwind CSS · Vercel 배포
- 콘텐츠(가이드·사례·자주 묻는 질문) 작성법: [`content/README.md`](content/README.md)
- 브랜드 표기: 서비스 이름은 항상 붙여 쓰는 '에어리걸클레임'. 헤더·제목·OG는 서비스 이름, 푸터·운영 법인 소개·법적 고지·계약 주체는 법무법인 명 (`src/lib/site.ts`의 `BRAND`·`FIRM`)
- 로고: 웹은 `src/components/brand/Logo.tsx`(웹폰트로 글자 렌더), 인쇄·외부 제출용 SVG는 `public/brand/`
