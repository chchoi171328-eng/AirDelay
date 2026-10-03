# Image Guide — Artlist MCP + GPT Image 2.0 (항공 보상 가이드용)

**이 문서를 읽지 않고 이미지를 생성하지 말 것.** 메인 사이트 가이드 스킬의 이미지 원칙을 바탕으로,
이 사이트에서 사용자가 정한 기준(얼굴이 정면으로 보이는 AI 인물 사진 금지, 전광판은 영어만)을 더했다.

## 1. 하드 규칙

1. **인물 없는 장면을 우선한다.** 공항 터미널, 탑승구, 활주로, 항공기 창밖, 격납고, 관제탑 원경, 수하물, 여권·탑승권 같은 사물로 대부분 표현할 수 있다.
2. **인물이 필요하면 얼굴 비노출.** 뒷모습, 목 아래 크롭, 손 클로즈업, 아웃포커스 원경만. 주인공 인물은 한국인으로 지정한다("Korean traveler").
3. **글자 없음.** 읽을 수 있는 글자·간판·문서를 넣지 않는다. 한국 배경은 한글이 자동 생성되기 쉬우므로 `no Korean characters, no Hangul` 를 반드시 적는다.
   - **예외: 출발 안내 전광판(FIDS).** 지연·결항을 보여 줘야 하는 주제에 한해 **영어만** 허용 (DEPARTURES / DELAYED / CANCELLED, 도시 이름, 시각). 한글·항공사 이름은 금지.
4. **항공사 로고·기체 도장(livery)·상표 금지.** 기체는 흰색 무지 도장으로. 실존 공항을 특정할 수 있는 외관·간판 금지.
5. **법률 상투 상징물 금지.** 법봉·저울·법전 클로즈업.

## 2. 가이드 고유 사양

- 대표 사진(cover) 1장 + 본문 0~2장, **16:9**
- 절차·구조·코드표는 이미지로 만들지 않는다 → 표, 또는 절차가 주제일 때 `:::flow`
- 사진 바로 아래 `:::caption`에 그 위치의 핵심 사실 한 문장
- 대체 텍스트(`![…]`)에 주제 키워드를 자연스럽게
- 핵심 정리 상자와 목차 사이에는 사진을 넣지 않는다

주제별 장면 예:
| 주제 | 장면 |
|---|---|
| 지연·결항 일반 | 비 내리는 밤의 빈 탑승구, 영어 출발 안내판, 창밖 대기 중인 무지 도장 항공기 |
| 기상 | 안개 낀 활주로, 눈 덮인 계류장, 제빙액을 뿌리는 장면(사람은 원경) |
| 정비 | 격납고 안 엔진 클로즈업(로고 없음), 공구와 점검대 |
| 관제·공항 | 해 질 녘 관제탑 실루엣(특정 불가), 유도로 조명 |
| 연결·환승 | 환승 통로, 빈 대기석, 손에 든 여권과 탑승권(글자 없음) |
| 청구·소송 | 책상 위 서류철과 계산기(글자 없음), 노트북 앞 손 |

## 3. 도구 호출 흐름 (Artlist MCP)

1. `list_models`(kind: "image")로 **GPT Image 2.0 - T2I** 를 찾는다 (메인 스킬 기준 `modelId` 2340 = Medium, 2338 = Low, 2341 = High). 없으면 사용자에게 보고.
2. `generate_image`
   ```
   prompt: "{4절 템플릿}"           # 1000자 이내. 줄일 때도 네거티브 지시어는 남긴다
   modelId: 2340
   settings: { aspect_ratio: "16:9", resolution: "low" 또는 "medium" }
   ```
3. `{ status: "queued", generationId }` → 곧바로 `get_generation_status`. `pending`이면 다시 호출.
4. `{ status: "confirmation_required" }` → **멈추고** 비용을 보여 준 뒤 승인받는다. 스스로 `confirmCost: true`를 켜지 않는다.
5. 완료 → 이미지 URL을 받아 내려받는다 (`cms-toolkit-artifacts.artlist.io`는 접근 가능, `fal.media`·`imgix` 등은 막혀 있을 수 있음).
6. 저장한 파일을 열어 **검증 게이트**(6절).
7. 프롬프트가 확정되면 최종본만 `resolution: "high"`로 한 번 더.

작업량이 많으면 `get_balance`로 잔여 크레딧부터 확인한다.

## 4. 프롬프트 템플릿

```
{장면 묘사 — 주제와 연결되는 구체적 상황}.
{인물이 있으면: Korean traveler, back view only, camera behind the subject}.
Photorealistic, natural lighting, professional editorial photography style,
muted neutral color palette.
Plain white aircraft with no airline logos, no livery, no brand marks.
Absolutely no text anywhere in the image, no letters, no signage,
no Korean characters, no Hangul, no readable documents, no watermarks.
{인물이 있으면: Face not visible, no identifiable facial features.}
16:9 composition with clear focal point.
```

영어 전광판 예외를 쓸 때는 글자 지시를 이렇게 바꾼다:
```
A flight information display board showing only English text: the header
"DEPARTURES" and rows of city names with "DELAYED" in amber. No other text,
no airline names or logos, no Korean characters, no Hangul.
```

검증된 장면(이 사이트에서 채택) 예:
- 비 내리는 밤, 승객이 떠난 탑승구에 남은 여행가방 (`/images/service-cancel.jpg`)
- 영어로만 된 출발 안내 전광판의 DELAYED 표시 (`/images/service-delay.jpg`)

## 5. 허용/금지 구도

**허용**: 인물 없는 공간·사물 / 뒷모습 / 목 아래 크롭 / 손 클로즈업 / 실루엣 / 아웃포커스 원경

**금지**: 정면·측면 얼굴 / 유리·창에 비친 얼굴 / 얼굴 일부(눈·입) / 항공사 로고·도장 / 실존 공항 특정 외관 / 법봉·저울

## 6. 검증 게이트 (필수)

생성된 각 이미지를 **실제로 열어** 확인한다. 하나라도 해당하면 실패:
- 얼굴을 알아볼 수 있다
- 글자가 보인다 (영어 전광판 예외 외의 모든 글자, 특히 한글·항공사 이름)
- 항공사 로고·도장·상표가 보인다
- 장면이 주제와 무관하거나 오해를 부른다 (예: 결항 글에 정상 이륙 장면)

검증 없이 이미지를 쓰지 않는다. 실패하면 프롬프트를 고쳐 재생성(이미지당 최대 2회):
- 글자가 나옴 → 간판·문서·화면이 생길 요소를 빼고 네거티브 지시어를 앞으로
- 얼굴이 나옴 → "back view only, framed from the neck down"을 강하게, 또는 인물을 뺀다
- 로고가 나옴 → "plain white aircraft"를 앞으로, 기체를 원경·부분 크롭으로

2회 뒤에도 실패하면 사용자에게 보고하고 지시를 받는다.

## 7. 웹용 변환과 저장

```bash
mkdir -p public/images/guide/{slug}
convert raw.png -resize 1600x900^ -gravity center -extent 1600x900 \
  -strip -interlace Plane -sampling-factor 4:2:0 -quality 75 \
  public/images/guide/{slug}/cover.jpg
```
- 대표: `cover.jpg`, 본문: `image-1.jpg`, `image-2.jpg`
- frontmatter `cover: /images/guide/{slug}/cover.jpg`, 본문 `![대체 텍스트](/images/guide/{slug}/image-1.jpg)`
- 원본(PNG)은 저장소에 넣지 않는다
