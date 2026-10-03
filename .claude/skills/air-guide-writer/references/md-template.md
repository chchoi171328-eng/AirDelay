# Markdown Template — frontmatter · 파일 위치 · 예시 · 확인

가이드는 저장소 파일로 관리한다. **파일 1개 = 가이드 1편.** 목록·묶음·관련 글 연결은 frontmatter로
빌드할 때 자동으로 만들어진다. 렌더러: `src/lib/guide-markdown.ts`, 읽기: `src/lib/content.ts`(`getPosts`).

## 1. 파일 위치

```
content/blog/{slug}.md                 ← frontmatter + 본문   →  /guide/{slug}
public/images/guide/{slug}/cover.jpg   ← 16:9 대표 사진
public/images/guide/{slug}/image-1.jpg ← 본문 사진 (필요 시)
```

## 2. frontmatter

```yaml
---
title: "EU261 지연 보상"                                         # 필수. 목록·링크용 짧은 주제명 (8~18자)
seoTitle: "EU261 지연 보상 — 유럽 출발 항공편이 3시간 늦었을 때 받는 금액"  # 글 제목(H1)·검색 결과 제목
category: claim                                                  # 필수. claim | aviation
summary: "유럽에서 출발한 항공편이 3시간 넘게 늦었을 때 EU261에 따라 받는 금액과 조건을 정리했습니다."  # 필수. 80자 이내
keywords: ["EU261", "항공 지연 보상", "유럽 항공편 지연"]
reviewedAt: 2026-10                                              # 필수. 검토한 달 (발행일은 쓰지 않는다)
cover: /images/guide/eu261-delay-compensation/cover.jpg          # 없으면 묶음별 기본 사진
related: []                                                      # 함께 읽을 만한 글의 파일 이름. 있을 때만 화면에 나온다
ctaSituation: "유럽에서 출발한 항공편이 3시간 넘게 늦었다면"            # 맺음 상자 첫 문장 앞부분
ctaOffer: "EU261 적용 여부와 비행거리 기준 금액"                      # "…부터 확인해 드립니다" 앞부분
author: "법무법인 명"                                              # 생략하면 src/lib/site.ts의 GUIDE_AUTHOR
draft: true                                                      # 검토 전에는 반드시 true
---
```

- `reviewedAt`은 `YYYY-MM`. 형식이 틀리면 빌드가 실패한다
- `ctaSituation`·`ctaOffer`는 둘 다 있어야 적용된다. 맺음 상자 문장: `{ctaSituation}, {ctaOffer}부터 확인해 드립니다.`
- `related`는 실제로 함께 읽을 만한 글이 있을 때만 적는다. 비어 있으면 「함께 보면 좋은 글」 칸이 나오지 않는다

## 3. 본문 예시 (보상·청구 기본 글의 뼈대)

```md
:::summary
- 유럽연합(EU)에서 **출발한** 항공편은 항공사와 관계없이 EU261이 적용됩니다.
- 최종 목적지에 **3시간 이상 늦게 도착**하면 비행거리에 따라 €250·400·600을 청구할 수 있습니다.
- 3,500km를 넘는 노선에서 3~4시간 늦었다면 금액은 **절반**입니다.
- 기상 악화처럼 **피할 수 없었던 사정**이면 정액 보상 대상이 아닐 수 있습니다.
:::

파리에서 인천으로 오는 항공편이 네 시간 넘게 늦어지셨다면 … (도입 — 상황 + 핵심 개념 정의, 1~2문단)

## 1. EU261이 적용되는 항공편

…

:::term
EU261은 유럽연합 규정 제261/2004호로, 항공편 지연·결항·탑승 거부 때 승객의 권리를 정한 규정입니다.
:::

| 이런 항공편이라면 | EU261 적용 | 근거 |
| --- | --- | --- |
| EU에서 출발 (항공사 무관) | 적용 | EU261 제3조 |
| EU 밖에서 EU로 도착, EU 항공사 | 적용 | EU261 제3조 |
| EU 밖에서 EU로 도착, EU 외 항공사 | 적용 안 됨 | EU261 제3조 |

## 2. 비행거리별 금액

…

![비 내리는 밤, 승객이 떠난 탑승구 — 항공편 지연](/images/guide/eu261-delay-compensation/image-1.jpg)

:::caption
금액은 지연 시간이 아니라 비행거리로 정해집니다.
:::

## 3. 금액이 줄거나 받지 못하는 경우

…

:::callout
**바우처를 바로 받지 마세요.** EU261 보상은 현금 지급이 원칙이고, 바우처는 승객이 서면으로 동의한 경우에만 대신할 수 있습니다.
:::

## 자주 묻는 질문            ← 본문에서 못 다룬 질문이 있을 때만

:::faq
### 경유편이 늦어 연결편을 놓쳤다면요?
…
:::
```

- 목차(`:::toc`)·기한 상자(`:::deadline`)는 위 뼈대에 넣지 않는다. 용어 사전처럼 긴 문서나, 놓치면 안 되는 기한이 실제로 있을 때만 쓴다 (`guide-structure.md` 6절)
- 블록 모양은 미리보기 사이트의 형식 예시 글 `/guide/eu261-delay-600-euro`(draft)에서 볼 수 있다

## 4. 확인

```bash
npm run lint && npm run build          # frontmatter 오류는 파일 이름과 함께 빌드 실패로 나온다
npx next start -p 3100                 # /guide/{slug} 확인 (데스크톱 1280px, 모바일 390px)
```
- 사진·캡션·블록이 깨지지 않는지 본다 (용어 사전이면 목차 링크가 각 소제목으로 이동하는지도)
- 미리보기 배포(Vercel preview)에서는 `draft: true` 글도 보인다. 운영 사이트에는 `draft` 줄을 지워야 나온다

## 5. 보고 형식

```
가이드 작성 완료 (초안, draft: true)

- title      : EU261 지연 보상
- seoTitle   : EU261 지연 보상 — 유럽 출발 항공편이 3시간 늦었을 때 받는 금액
- 묶음       : claim (보상·청구)
- 주소       : /guide/eu261-delay-compensation
- 글자 수    : 2,840자 (공백 제외, 기본 글 범위)
- 이미지     : cover + 본문 1장, 검증 통과 (인물 없음·글자 없음·로고 없음)
- 유럽사법재판소 판단 언급 : 1곳 (3시간 지연 보상의 근거)
- 확인 필요  : EU261 제7조 금액, 3~4시간 50% 감액 조건, 바우처 서면 동의 조항
```

사용자 확인이 필요한 사실은 **반드시 목록으로** 제시한다.
