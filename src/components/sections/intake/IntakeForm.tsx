'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, CheckCircle, Upload, X, AlertCircle } from 'lucide-react'
import {
  DELAY_RANGES, EMPTY_INTAKE, FILE_ACCEPT, INCIDENT_TYPES, MAX_FILES,
  validateContact, validateFiles, validateFlight,
} from '@/lib/intake'
import type {
  CompleteIntakeResponse, CreateIntakeResponse, IntakeErrors, IntakeField, IntakeInput, UploadTarget,
} from '@/lib/intake'
import { FIRM } from '@/lib/site'

const STEPS = ['피해 정보', '고객 정보', '접수 완료']

const AIRLINES = ['대한항공', '아시아나항공', '제주항공', '티웨이항공', '진에어', '에어부산', '에어서울', 'British Airways', 'Ryanair', 'easyJet', '기타']
const FLIGHT_FIELDS: IntakeField[] = ['airline', 'flightNo', 'origin', 'destination', 'date', 'type', 'delayRange']

const inputBase = 'w-full border rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm'

function localToday() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function postJson<T>(url: string, data: unknown): Promise<T | null> {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    return (await res.json()) as T
  } catch {
    return null
  }
}

// Supabase Storage 서명 업로드 주소로 직접 전송 (supabase-js uploadToSignedUrl과 같은 형식)
async function uploadFile(target: UploadTarget, file: File) {
  const body = new FormData()
  body.append('cacheControl', '3600')
  body.append('', new Blob([file], { type: target.contentType }), file.name)
  try {
    const res = await fetch(target.signedUrl, { method: 'PUT', body, headers: { 'x-upsert': 'false' } })
    return res.ok
  } catch {
    return false
  }
}

function Field({ name, label, required, error, group, children }: {
  name: IntakeField
  label: string
  required?: boolean
  error?: string
  group?: boolean
  children: React.ReactNode
}) {
  const text = <>{label}{required && ' *'}</>
  return (
    <div>
      {group
        ? <div id={`intake-${name}-label`} className="block text-sm font-semibold text-navy mb-1.5">{text}</div>
        : <label htmlFor={`intake-${name}`} className="block text-sm font-semibold text-navy mb-1.5">{text}</label>}
      {children}
      {error && <p id={`intake-${name}-error`} className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

interface Result {
  filesSelected: number
  filesStored: number | null // null: 처리 결과를 확인하지 못함
  clientNotified: boolean
}

export default function IntakeForm({ uploadsEnabled }: { uploadsEnabled: boolean }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<IntakeInput>(EMPTY_INTAKE)
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<IntakeErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'uploading'>('idle')
  const [submitError, setSubmitError] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [today, setToday] = useState('')
  const startedAt = useRef(Date.now())

  useEffect(() => {
    setToday(localToday())
    // 홈 화면 간편 양식에서 넘어온 값(?origin=&destination=&date=)을 미리 채웁니다.
    const q = new URLSearchParams(window.location.search)
    const pick = (k: string, max: number) => (q.get(k) ?? '').trim().slice(0, max)
    const date = pick('date', 10)
    setForm((f) => ({
      ...f,
      origin: pick('origin', 50) || f.origin,
      destination: pick('destination', 50) || f.destination,
      date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : f.date,
    }))
  }, [])

  const clearError = (k: IntakeField) =>
    setErrors((e) => {
      if (!e[k]) return e
      const next = { ...e }
      delete next[k]
      return next
    })

  const set = <K extends keyof IntakeInput>(k: K, v: IntakeInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    clearError(k)
  }

  const inputProps = (name: IntakeField) => ({
    id: `intake-${name}`,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `intake-${name}-error` : undefined,
    className: `${inputBase} ${errors[name] ? 'border-red-400' : 'border-gray-200'}`,
  })

  const showErrors = (errs: IntakeErrors) => {
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) requestAnimationFrame(() => document.getElementById(`intake-${first}`)?.focus())
    return Boolean(first)
  }

  const goNext = () => {
    if (showErrors(validateFlight(form, localToday()))) return
    setStep(1)
  }

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? [])
    e.target.value = '' // 같은 파일을 지웠다가 다시 고를 수 있도록
    const merged = [...files, ...picked.filter((p) => !files.some((f) => f.name === p.name && f.size === p.size))]
    const error = validateFiles(merged)
    if (error) return setErrors((er) => ({ ...er, files: error }))
    setFiles(merged)
    clearError('files')
  }

  const removeFile = (index: number) => {
    setFiles((fs) => fs.filter((_, i) => i !== index))
    clearError('files')
  }

  const submit = async () => {
    const errs = validateContact(form)
    const fileError = validateFiles(files)
    if (fileError) errs.files = fileError
    if (showErrors(errs)) return

    setSubmitError(false)
    setStatus('sending')
    const created = await postJson<CreateIntakeResponse>('/api/intake', {
      ...form,
      files: files.map((f) => ({ name: f.name, size: f.size })),
      website: honeypot,
      elapsedMs: Date.now() - startedAt.current,
    })

    if (!created?.ok) {
      setStatus('idle')
      if (created?.error === 'validation' && created.errors) {
        if (Object.keys(created.errors).some((k) => FLIGHT_FIELDS.includes(k as IntakeField))) setStep(0)
        showErrors(created.errors)
      } else {
        setSubmitError(true)
      }
      return
    }

    let outcome: Result = { filesSelected: files.length, filesStored: created.filesStored, clientNotified: created.clientNotified }
    if (created.id && created.uploads.length) {
      setStatus('uploading')
      await Promise.all(created.uploads.map((u) => uploadFile(u, files[u.index])))
      const body = { id: created.id }
      const done = (await postJson<CompleteIntakeResponse>('/api/intake/complete', body))
        ?? (await postJson<CompleteIntakeResponse>('/api/intake/complete', body)) // 네트워크 오류 시 한 번 더
      outcome = done?.ok
        ? { ...outcome, filesStored: done.filesStored, clientNotified: done.clientNotified }
        : { ...outcome, filesStored: null }
    }

    setResult(outcome)
    setStatus('idle')
    setStep(2)
  }

  const busy = status !== 'idle'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
              i < step ? 'bg-navy/10 text-navy' : i === step ? 'bg-navy text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? 'text-navy' : 'text-gray-500'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ml-2 ${i < step ? 'bg-navy/30' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Flight info */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field name="airline" label="항공사" required error={errors.airline}>
              <select value={form.airline} onChange={(e) => set('airline', e.target.value)} {...inputProps('airline')}>
                <option value="">선택하세요</option>
                {AIRLINES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field name="flightNo" label="항공편명" error={errors.flightNo}>
              <input type="text" placeholder="예: KE001" maxLength={10} value={form.flightNo} onChange={(e) => set('flightNo', e.target.value)} {...inputProps('flightNo')} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field name="origin" label="출발지" required error={errors.origin}>
              <input type="text" placeholder="예: 인천 (ICN)" maxLength={50} value={form.origin} onChange={(e) => set('origin', e.target.value)} {...inputProps('origin')} />
            </Field>
            <Field name="destination" label="도착지" required error={errors.destination}>
              <input type="text" placeholder="예: 런던 (LHR)" maxLength={50} value={form.destination} onChange={(e) => set('destination', e.target.value)} {...inputProps('destination')} />
            </Field>
          </div>
          <Field name="date" label="운항 날짜" required error={errors.date}>
            <input type="date" max={today || undefined} value={form.date} onChange={(e) => set('date', e.target.value)} {...inputProps('date')} />
          </Field>
          <Field name="type" label="피해 유형" required error={errors.type} group>
            <div id="intake-type" tabIndex={-1} role="group" aria-labelledby="intake-type-label" className="grid grid-cols-2 gap-2 focus:outline-none">
              {INCIDENT_TYPES.map((t) => (
                <button key={t.value} type="button" aria-pressed={form.type === t.value} onClick={() => set('type', t.value)}
                  className={`border rounded-xl px-4 py-3 text-[15px] font-medium transition-all text-left shadow-sm ${
                    form.type === t.value ? 'border-navy bg-navy text-white ring-4 ring-navy/10'
                      : `${errors.type ? 'border-red-400' : 'border-gray-200'} text-gray-600 hover:border-navy/30 hover:bg-gray-50`}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </Field>
          <Field name="delayRange" label="지연 시간" error={errors.delayRange} group>
            <div id="intake-delayRange" tabIndex={-1} role="group" aria-labelledby="intake-delayRange-label" className="grid grid-cols-2 gap-2 focus:outline-none">
              {DELAY_RANGES.map((r) => (
                <button key={r} type="button" aria-pressed={form.delayRange === r} onClick={() => set('delayRange', r)}
                  className={`border rounded-xl px-4 py-3 text-[15px] font-medium transition-all text-left shadow-sm ${
                    form.delayRange === r ? 'border-navy bg-navy/5 text-navy ring-4 ring-navy/10' : 'border-gray-200 text-gray-600 hover:border-navy/30 hover:bg-gray-50'}`}>
                  {r}
                </button>
              ))}
            </div>
          </Field>
          <button type="button" onClick={goNext} className="btn-navy w-full justify-center py-3">
            다음 단계 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Customer info */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field name="name" label="이름" required error={errors.name}>
              <input type="text" placeholder="홍길동" autoComplete="name" maxLength={50} value={form.name} onChange={(e) => set('name', e.target.value)} {...inputProps('name')} />
            </Field>
            <Field name="phone" label="연락처" required error={errors.phone}>
              <input type="tel" placeholder="010-0000-0000" autoComplete="tel" maxLength={20} value={form.phone} onChange={(e) => set('phone', e.target.value)} {...inputProps('phone')} />
            </Field>
          </div>
          <Field name="email" label="이메일" required error={errors.email}>
            <input type="email" placeholder="example@email.com" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => set('email', e.target.value)} {...inputProps('email')} />
          </Field>
          <Field name="detail" label="피해 상세 내용" error={errors.detail}>
            <textarea rows={4} placeholder="상황을 자세히 설명해 주세요..." maxLength={2000} value={form.detail} onChange={(e) => set('detail', e.target.value)}
              {...inputProps('detail')} className={`${inputProps('detail').className} resize-none`} />
          </Field>

          {uploadsEnabled ? (
            <Field name="files" label="증빙 파일 첨부 (선택)" error={errors.files}>
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:border-navy/40 hover:bg-gray-50 focus-within:ring-4 focus-within:ring-navy/10 transition-all ${errors.files ? 'border-red-400' : 'border-gray-200'}`}>
                <Upload className="w-8 h-8 text-gray-300 mb-3" />
                <span className="text-sm text-gray-500 font-medium">항공권, 탑승권, 영수증 등</span>
                <span className="text-xs text-gray-500 mt-1">PDF·JPG·PNG·HEIC, 파일당 10MB, 최대 {MAX_FILES}개</span>
                <input id="intake-files" type="file" multiple accept={FILE_ACCEPT} onChange={addFiles} className="sr-only"
                  aria-describedby={errors.files ? 'intake-files-error' : undefined} />
              </label>
              <p className="text-xs text-gray-500 mt-1.5">여권번호 등 고유식별정보가 보이는 부분은 가린 뒤 올려 주세요.</p>
              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${f.size}`} className="flex items-center justify-between gap-2 text-xs text-navy bg-navy/5 rounded px-3 py-1.5">
                      <span className="truncate">{f.name} <span className="text-gray-500">({(f.size / 1024 / 1024).toFixed(1)}MB)</span></span>
                      <button type="button" onClick={() => removeFile(i)} aria-label={`${f.name} 삭제`} className="text-gray-500 hover:text-red-600 shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Field>
          ) : (
            <div className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              항공권·탑승권 등 증빙 파일은 접수 후 담당 변호사가 연락드릴 때 안내에 따라 보내 주세요.
            </div>
          )}

          {/* 개인정보 수집·이용 동의 (개인정보 보호법 제15조) */}
          <div className={`rounded-xl border p-4 bg-gray-50/50 ${errors.consent ? 'border-red-400' : 'border-gray-200'}`}>
            <table className="w-full text-xs text-gray-600 mb-3">
              <tbody className="[&_th]:text-left [&_th]:font-semibold [&_th]:text-navy [&_th]:pr-3 [&_th]:py-1 [&_th]:align-top [&_th]:whitespace-nowrap [&_td]:py-1">
                <tr><th>수집 목적</th><td>항공 피해 사건 접수, 보상 가능 여부 검토 및 상담 연락</td></tr>
                <tr><th>수집 항목</th><td>(필수) 이름, 연락처, 이메일, 항공편 정보 · (선택) 피해 상세 내용{uploadsEnabled && ', 증빙 파일'}</td></tr>
                <tr><th>보유 기간</th><td><strong className="text-navy">접수일로부터 1년</strong> (사건을 수임하면 위임계약에 따름)</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mb-3">
              동의를 거부할 수 있으나, 거부하시면 온라인 접수를 할 수 없습니다(전화 상담은 가능합니다).{' '}
              <Link href="/privacy" target="_blank" className="underline hover:text-navy">개인정보처리방침 전문</Link>
            </p>
            <label className="flex items-center gap-2.5 text-sm font-semibold text-navy cursor-pointer">
              <input id="intake-consent" type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)}
                aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'intake-consent-error' : undefined}
                className="w-4 h-4 accent-navy" />
              [필수] 개인정보 수집·이용에 동의합니다
            </label>
            {errors.consent && <p id="intake-consent-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.consent}</p>}
          </div>

          {/* 스팸 방지용 — 사람에게는 보이지 않는 칸 */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label>웹사이트 <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
          </div>

          {submitError && (
            <div role="alert" className="flex gap-3 text-sm bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                접수를 저장하지 못했습니다. 입력하신 내용은 그대로 남아 있으니 잠시 후 다시 시도해 주세요.
                계속 안 되면 <a href={`tel:${FIRM.phone}`} className="font-semibold underline">{FIRM.phone}</a> 또는{' '}
                <a href={`mailto:${FIRM.email}`} className="font-semibold underline">{FIRM.email}</a>로 연락해 주세요.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} disabled={busy} aria-label="이전 단계"
              className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-navy py-3 px-5 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={submit} disabled={busy}
              className="btn-navy flex-1 justify-center py-3 disabled:opacity-40">
              {status === 'sending' ? '접수 중...' : status === 'uploading' ? '파일 올리는 중...' : '사건 접수하기'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 2 && result && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy mb-3">접수가 완료됐습니다!</h2>
          <p className="text-gray-500 leading-relaxed mb-2">
            {form.name} 고객님, 사건을 접수했습니다.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8">
            검토 후 <strong className="text-navy">48시간 이내</strong>에 담당 변호사가 연락드립니다.
          </p>
          <div className="bg-navy/5 rounded-xl p-5 text-left text-sm space-y-2 mb-8 max-w-sm mx-auto">
            <div className="flex justify-between"><span className="text-gray-500">항공사</span><span className="font-semibold text-navy">{form.airline}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">노선</span><span className="font-semibold text-navy">{form.origin} → {form.destination}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">날짜</span><span className="font-semibold text-navy">{form.date}</span></div>
          </div>
          {result.filesSelected > 0 && result.filesStored !== result.filesSelected && (
            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 max-w-sm mx-auto mb-4">
              {result.filesStored === null
                ? '첨부파일 저장 여부를 확인하지 못했습니다.'
                : `첨부파일 ${result.filesSelected}개 중 ${result.filesStored}개만 저장됐습니다.`}{' '}
              담당 변호사가 연락드릴 때 다시 보내 주세요.
            </p>
          )}
          {result.clientNotified && (
            <p className="text-xs text-gray-500">접수 확인 이메일을 <strong>{form.email}</strong>(으)로 보냈습니다</p>
          )}
        </div>
      )}
    </div>
  )
}
