// 항공 보상 가이드 본문 렌더러 — 마크다운에 가이드 전용 블록을 더해 HTML로 바꿉니다.
// 블록 문법은 content/README.md와 .claude/skills/air-guide-writer를 참고하세요.
//
//   :::summary            핵심 정리 상자 (본문 맨 앞)
//   :::toc                목차 — '## 제목 {#english-id}' 형식의 H2로 자동 생성
//   :::term               용어 풀이 (작은 회색 문장)
//   :::caption            바로 위 사진의 설명
//   :::callout            주의할 점 한 가지 (노란 상자)
//   :::deadline 제목      기한 상자 (어두운 상자, 제목 생략 시 '기한')
//   :::flow 제목          번호 목록을 단계 흐름으로 표시
//   :::faq                '### 질문' + 답변 문단의 반복 → 펼치는 목록
//   :::                   블록 끝
import { Marked, type Tokens, type TokenizerExtension, type RendererExtension } from 'marked'

export type TocItem = { id: string; text: string }
export type FaqPair = { q: string; a: string }
export type GuideHtml = { html: string; toc: TocItem[]; faq: FaqPair[] }

type BlockToken = Tokens.Generic & { kind: string; title: string; tokens: Tokens.Generic[] }
type HeadingWithId = Tokens.Heading & { gid?: string }

const KINDS = ['summary', 'toc', 'term', 'caption', 'callout', 'deadline', 'flow', 'faq'] as const
const BLOCK_RE = new RegExp(`^:::(${KINDS.join('|')})[ \\t]*([^\\n]*)\\n([\\s\\S]*?)^:::[ \\t]*(?:\\n|$)`, 'm')
const ID_RE = /\s*\{#([a-z0-9][a-z0-9-]*)\}\s*$/

// 취소선은 물결 두 개(~~글자~~)일 때만. 한국어 글의 '3~4시간', '€250~600' 같은 범위 표기가
// 한 줄에 두 번 나오면 마크다운이 그 사이를 취소선으로 바꾸는 것을 막습니다. (content.ts에서도 씁니다)
export const tildeSafeTokenizer = {
  del(this: { lexer: { inlineTokens: (src: string) => Tokens.Generic[] } }, src: string) {
    const m = /^~~(?=\S)([\s\S]*?\S)~~(?!~)/.exec(src)
    if (!m) return undefined
    return { type: 'del', raw: m[0], text: m[1], tokens: this.lexer.inlineTokens(m[1]) } as Tokens.Del
  },
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const plain = (html: string) =>
  html.replace(/<\/(p|li|div|h\d)>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

export function renderGuide(body: string): GuideHtml {
  let toc: TocItem[] = []
  const faq: FaqPair[] = []
  let autoId = 0

  const block: TokenizerExtension & RendererExtension = {
    name: 'guideBlock',
    level: 'block',
    start: (src) => src.match(/^:::/m)?.index,
    tokenizer(src) {
      const m = BLOCK_RE.exec(src)
      if (!m || m.index !== 0) return undefined
      const token: BlockToken = { type: 'guideBlock', raw: m[0], kind: m[1], title: m[2].trim(), tokens: [] }
      this.lexer.blockTokens(m[3], token.tokens)
      return token
    },
    renderer(t) {
      const token = t as BlockToken
      const inner = () => this.parser.parse(token.tokens)
      switch (token.kind) {
        case 'summary':
          return `<div class="g-summary"><div class="g-label">핵심 정리</div>${inner()}</div>\n`
        case 'toc':
          if (toc.length === 0) return ''
          return `<nav class="g-toc" aria-label="목차"><div class="g-label">목차</div><ol>${toc
            .map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`)
            .join('')}</ol></nav>\n`
        case 'term':
          return `<div class="g-term">${inner()}</div>\n`
        case 'caption':
          return `<div class="g-caption">${inner()}</div>\n`
        case 'callout':
          return `<div class="g-callout">${inner()}</div>\n`
        case 'deadline':
          return `<div class="g-deadline"><div class="g-label">${esc(token.title || '기한')}</div>${inner()}</div>\n`
        case 'flow':
          return `<div class="g-flow">${token.title ? `<div class="g-label">${esc(token.title)}</div>` : ''}${inner()}</div>\n`
        case 'faq': {
          // '### 질문'마다 하나의 문항으로 묶습니다
          const items: { q: Tokens.Heading; a: Tokens.Generic[] }[] = []
          for (const tk of token.tokens) {
            if (tk.type === 'heading' && (tk as Tokens.Heading).depth === 3) items.push({ q: tk as Tokens.Heading, a: [] })
            else if (items.length) items[items.length - 1].a.push(tk)
          }
          return `<div class="g-faq">${items
            .map(({ q, a }) => {
              const qHtml = this.parser.parseInline(q.tokens)
              const aHtml = this.parser.parse(a)
              faq.push({ q: plain(qHtml), a: plain(aHtml) })
              return `<details><summary>${qHtml}</summary><div class="g-faq-a">${aHtml}</div></details>`
            })
            .join('')}</div>\n`
        }
      }
      return ''
    },
  }

  const md = new Marked({
    extensions: [block],
    tokenizer: tildeSafeTokenizer,
    renderer: {
      // '## 제목 {#english-id}' → <h2 id="english-id">. id를 적지 않으면 section-1, section-2 …
      heading(token) {
        const { tokens, depth, gid } = token as HeadingWithId
        return `<h${depth}${gid ? ` id="${gid}"` : ''}>${this.parser.parseInline(tokens)}</h${depth}>\n`
      },
    },
  })

  // '<!-- TODO: … -->' 같은 편집용 메모는 공개 HTML에 남기지 않습니다
  const tokens = md.lexer(body.replace(/<!--[\s\S]*?-->/g, ''))
  // H2·H3의 {#id}를 떼어 내고 목차를 만듭니다
  md.walkTokens(tokens, (tk) => {
    if (tk.type !== 'heading') return
    const h = tk as Tokens.Heading
    if (h.depth > 3) return
    const last = h.tokens[h.tokens.length - 1] as Tokens.Text | undefined
    const m = last && last.type === 'text' ? last.text.match(ID_RE) : null
    let id: string | undefined
    if (m && last) {
      id = m[1]
      last.text = last.text.replace(ID_RE, '')
      last.raw = last.raw.replace(ID_RE, '')
      h.text = h.text.replace(ID_RE, '')
    } else if (h.depth === 2) {
      id = h.text.trim() === '자주 묻는 질문' ? 'faq' : `section-${++autoId}`
    }
    if (id) (h as HeadingWithId).gid = id
  })
  toc = tokens
    .filter((tk): tk is HeadingWithId => tk.type === 'heading' && (tk as Tokens.Heading).depth === 2)
    .map((h) => ({ id: h.gid ?? '', text: h.text.replace(/[*_`]/g, '').trim() }))
    .filter((h) => h.id && h.text !== '자주 묻는 질문')

  const html = md.parser(tokens)
  return { html, toc, faq }
}
