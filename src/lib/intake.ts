// 사건 접수 양식의 공통 규칙 — 클라이언트(즉시 안내)와 서버(최종 검증)가 함께 사용합니다.
import type { CaseType } from './types'
import { CASE_TYPE_LABELS } from './types'

export const PRIVACY_POLICY_VERSION = '2026-10-01'

export const INCIDENT_TYPES = (Object.keys(CASE_TYPE_LABELS) as CaseType[]).map((value) => ({
  value,
  label: CASE_TYPE_LABELS[value],
}))

export const DELAY_RANGES = ['3시간 미만', '3~5시간', '5시간 이상', '해당 없음 (결항)'] as const

// ─── 첨부파일 ─────────────────────────────────────────────────────
export const MAX_FILES = 5
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const FILE_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  heic: 'image/heic',
}
export const FILE_ACCEPT = Object.keys(FILE_TYPES).map((ext) => `.${ext}`).join(',')

export interface FileMeta {
  name: string
  size: number
}

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}

export function validateFiles(files: FileMeta[]): string | undefined {
  if (files.length > MAX_FILES) return `첨부파일은 최대 ${MAX_FILES}개까지 올릴 수 있습니다.`
  for (const f of files) {
    if (!FILE_TYPES[fileExtension(f.name)]) return `${f.name}: PDF, JPG, PNG, HEIC 파일만 올릴 수 있습니다.`
    if (f.size > MAX_FILE_SIZE) return `${f.name}: 파일당 10MB 이하만 올릴 수 있습니다.`
    if (f.size === 0) return `${f.name}: 빈 파일입니다.`
  }
}

// ─── 입력값 ──────────────────────────────────────────────────────
export interface IntakeInput {
  airline: string
  flightNo: string
  origin: string
  destination: string
  date: string
  type: string
  delayRange: string
  name: string
  phone: string
  email: string
  detail: string
  consent: boolean
}

export type IntakeField = keyof IntakeInput | 'files'
export type IntakeErrors = Partial<Record<IntakeField, string>>

export const EMPTY_INTAKE: IntakeInput = {
  airline: '', flightNo: '', origin: '', destination: '', date: '',
  type: '', delayRange: '',
  name: '', phone: '', email: '', detail: '',
  consent: false,
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export function normalizeIntake(raw: Record<string, unknown>): IntakeInput {
  return {
    airline: str(raw.airline),
    flightNo: str(raw.flightNo).toUpperCase(),
    origin: str(raw.origin),
    destination: str(raw.destination),
    date: str(raw.date),
    type: str(raw.type),
    delayRange: str(raw.delayRange),
    name: str(raw.name),
    phone: str(raw.phone),
    email: str(raw.email),
    detail: str(raw.detail),
    consent: raw.consent === true,
  }
}

function tooLong(value: string, max: number) {
  return value.length > max ? `${max}자 이내로 입력해 주세요.` : undefined
}

/** 1단계(피해 정보) 검증. latestDate는 'YYYY-MM-DD' — 그 이후 날짜는 거부합니다. */
export function validateFlight(v: IntakeInput, latestDate: string): IntakeErrors {
  const e: IntakeErrors = {}
  if (!v.airline) e.airline = '항공사를 선택해 주세요.'
  else e.airline = tooLong(v.airline, 50)
  if (v.flightNo) e.flightNo = tooLong(v.flightNo, 10)
  if (!v.origin) e.origin = '출발지를 입력해 주세요.'
  else e.origin = tooLong(v.origin, 50)
  if (!v.destination) e.destination = '도착지를 입력해 주세요.'
  else e.destination = tooLong(v.destination, 50)

  if (!v.date) e.date = '운항 날짜를 입력해 주세요.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date) || Number.isNaN(Date.parse(v.date))) e.date = '날짜 형식이 올바르지 않습니다.'
  else if (v.date > latestDate) e.date = '이미 운항한(예정일이 지난) 항공편만 접수할 수 있습니다.'
  else if (v.date < '2000-01-01') e.date = '날짜를 다시 확인해 주세요.'

  if (!INCIDENT_TYPES.some((t) => t.value === v.type)) e.type = '피해 유형을 선택해 주세요.'
  if (v.delayRange && !(DELAY_RANGES as readonly string[]).includes(v.delayRange)) e.delayRange = '지연 시간을 다시 선택해 주세요.'
  return compact(e)
}

/** 2단계(고객 정보·동의) 검증 */
export function validateContact(v: IntakeInput): IntakeErrors {
  const e: IntakeErrors = {}
  if (!v.name) e.name = '이름을 입력해 주세요.'
  else e.name = tooLong(v.name, 50)

  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone) e.phone = '연락처를 입력해 주세요.'
  else if (!/^\+?[\d\s\-()]+$/.test(v.phone) || digits.length < 9 || digits.length > 15) e.phone = '연락처를 정확히 입력해 주세요. (예: 010-1234-5678)'

  if (!v.email) e.email = '이메일을 입력해 주세요.'
  else if (v.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = '이메일 주소를 정확히 입력해 주세요.'

  e.detail = tooLong(v.detail, 2000)
  if (!v.consent) e.consent = '개인정보 수집·이용에 동의해야 접수할 수 있습니다.'
  return compact(e)
}

function compact(e: IntakeErrors): IntakeErrors {
  return Object.fromEntries(Object.entries(e).filter(([, msg]) => msg)) as IntakeErrors
}

// ─── API 응답 ────────────────────────────────────────────────────
export interface UploadTarget {
  index: number
  signedUrl: string
  contentType: string
}

export type CreateIntakeResponse =
  | { ok: true; id: string | null; uploads: UploadTarget[]; filesStored: number; clientNotified: boolean }
  | { ok: false; error: 'validation' | 'unavailable' | 'server'; errors?: IntakeErrors }

export type CompleteIntakeResponse =
  | { ok: true; filesStored: number; clientNotified: boolean }
  | { ok: false; error: 'not_found' | 'unavailable' | 'server' }
