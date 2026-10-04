// 보상 사례·항공 보상 가이드 콘텐츠 — content/ 폴더의 마크다운 파일을 빌드할 때 읽습니다. (작성법: content/README.md)
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { renderGuide, tildeSafeTokenizer } from './guide-markdown'
import { GUIDE_AUTHOR } from './site'
import { BLOG_CATEGORY_LABELS, CASE_TYPE_LABELS, FAQ_CATEGORY_LABELS, LAWSUIT_STAGE_LABELS } from './types'
import type { BlogCategory, BlogPost, Case, CaseType, FaqCategory, FaqItem, Lawsuit, LawsuitStage } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// draft: true 인 글은 미리보기·개발 환경에서만 보이고 운영 사이트(production)에서는 숨깁니다.
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== 'production'

function readDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, file), 'utf8'))
      return { slug: file.replace(/\.md$/, ''), file: `content/${dir}/${file}`, data, body: content.trim() }
    })
}

// 형식이 틀린 파일은 빌드를 멈춰 바로 알 수 있게 합니다.
function fail(file: string, msg: string): never {
  throw new Error(`[content] ${file}: ${msg}`)
}

function toDate(file: string, field: string, v: unknown): string {
  const s = v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) fail(file, `${field}는 YYYY-MM-DD 형식이어야 합니다 (현재: ${s || '없음'})`)
  return s
}

function required(file: string, data: Record<string, unknown>, field: string): string {
  const v = data[field]
  if (typeof v !== 'string' || !v.trim()) fail(file, `${field} 항목이 필요합니다`)
  return v.trim()
}

const strings = (v: unknown) => (Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean) : [])

marked.use({ tokenizer: tildeSafeTokenizer })
const toHtml = (body: string) => (body ? (marked.parse(body, { async: false }) as string) : null)

let postsCache: BlogPost[] | null = null
let casesCache: Case[] | null = null

export function getPosts(): BlogPost[] {
  postsCache ??= readDir('blog')
    .map(({ slug, file, data, body }) => {
      const category = data.category as BlogCategory
      if (!(category in BLOG_CATEGORY_LABELS)) fail(file, `category는 ${Object.keys(BLOG_CATEGORY_LABELS).join(', ')} 중 하나여야 합니다`)
      const title = required(file, data, 'title')
      const reviewedAt = String(data.reviewedAt ?? '')
      if (!/^\d{4}-\d{2}$/.test(reviewedAt)) fail(file, `reviewedAt은 YYYY-MM 형식이어야 합니다 (현재: ${reviewedAt || '없음'})`)
      const guide = body ? renderGuide(body) : null
      const ctaOk = typeof data.ctaSituation === 'string' && typeof data.ctaOffer === 'string'
      return {
        slug,
        title,
        seoTitle: typeof data.seoTitle === 'string' && data.seoTitle.trim() ? data.seoTitle.trim() : title,
        category,
        summary: required(file, data, 'summary'),
        keywords: strings(data.keywords),
        reviewedAt,
        author: typeof data.author === 'string' && data.author.trim() ? data.author.trim() : GUIDE_AUTHOR,
        cover: typeof data.cover === 'string' && data.cover ? data.cover : null,
        related: strings(data.related),
        cta: ctaOk ? { situation: String(data.ctaSituation).trim(), offer: String(data.ctaOffer).trim() } : null,
        html: guide?.html ?? null,
        toc: guide?.toc ?? [],
        faq: guide?.faq ?? [],
        draft: data.draft === true,
      }
    })
    .sort((a, b) => b.reviewedAt.localeCompare(a.reviewedAt) || a.title.localeCompare(b.title, 'ko'))
  return postsCache.filter((p) => SHOW_DRAFTS || !p.draft)
}

export function getCases(): Case[] {
  casesCache ??= readDir('cases')
    .map(({ slug, file, data, body }) => {
      const type = data.type as CaseType
      if (!(type in CASE_TYPE_LABELS)) fail(file, `type은 ${Object.keys(CASE_TYPE_LABELS).join(', ')} 중 하나여야 합니다`)
      const amount = Number(data.amount)
      if (!Number.isFinite(amount) || amount <= 0) fail(file, 'amount는 원 단위 숫자여야 합니다 (예: 800000)')
      return {
        slug,
        airline: required(file, data, 'airline'),
        route: required(file, data, 'route'),
        flightDate: toDate(file, 'flightDate', data.flightDate),
        delay: required(file, data, 'delay'),
        amount,
        type,
        summary: required(file, data, 'summary'),
        html: toHtml(body),
        draft: data.draft === true,
      }
    })
    .sort((a, b) => b.flightDate.localeCompare(a.flightDate))
  return casesCache.filter((c) => SHOW_DRAFTS || !c.draft)
}

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }
const decodeEntities = (s: string) => s.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m])

let faqCache: FaqItem[] | null = null

export function getFaqs(): FaqItem[] {
  faqCache ??= readDir('faq')
    .map(({ slug, file, data, body }) => {
      if (!body) fail(file, '답변 본문이 비어 있습니다')
      const category = required(file, data, 'category') as FaqCategory
      if (!(category in FAQ_CATEGORY_LABELS)) fail(file, `category는 ${Object.keys(FAQ_CATEGORY_LABELS).join(', ')} 중 하나여야 합니다`)
      const html = toHtml(body) as string
      return {
        slug,
        question: required(file, data, 'question'),
        order: Number.isFinite(Number(data.order)) ? Number(data.order) : 999,
        category,
        html,
        text: decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim(),
        draft: data.draft === true,
      }
    })
    .sort((a, b) => a.order - b.order)
  return faqCache.filter((f) => SHOW_DRAFTS || !f.draft)
}

let lawsuitsCache: Lawsuit[] | null = null
const optional = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null)
const STAGE_ORDER = Object.keys(LAWSUIT_STAGE_LABELS) as LawsuitStage[]

export function getLawsuits(): Lawsuit[] {
  lawsuitsCache ??= readDir('lawsuits')
    .map(({ slug, file, data }) => {
      const stage = data.stage as LawsuitStage
      if (!STAGE_ORDER.includes(stage)) fail(file, `stage는 ${STAGE_ORDER.join(', ')} 중 하나여야 합니다`)
      const filedAt = data.filedAt == null ? null : String(data.filedAt)
      if (filedAt !== null && !/^\d{4}-\d{2}$/.test(filedAt)) fail(file, `filedAt은 YYYY-MM 형식이어야 합니다 (현재: ${filedAt})`)
      if (stage !== 'preparing' && !filedAt) fail(file, '소장을 접수한 사건은 filedAt(YYYY-MM)이 필요합니다')
      return {
        slug,
        airline: required(file, data, 'airline'),
        flights: required(file, data, 'flights'),
        stage,
        filedAt,
        court: optional(data.court),
        note: optional(data.note),
        caseSlug: optional(data.caseSlug),
        updatedAt: toDate(file, 'updatedAt', data.updatedAt),
        draft: data.draft === true,
      }
    })
    // 진행 중인 사건을 먼저, 그 안에서는 단계가 앞선 순서·최근 접수 순
    .sort((a, b) => {
      const done = (s: LawsuitStage) => (s === 'judgment' || s === 'closed' ? 1 : 0)
      return done(a.stage) - done(b.stage) || (b.filedAt ?? '9999').localeCompare(a.filedAt ?? '9999') || a.airline.localeCompare(b.airline, 'ko')
    })
  return lawsuitsCache.filter((l) => SHOW_DRAFTS || !l.draft)
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug)
export const getCase = (slug: string) => getCases().find((c) => c.slug === slug)
