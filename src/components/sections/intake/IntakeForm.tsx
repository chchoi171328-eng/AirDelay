'use client'
import { useState } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle, Upload, Plane, User } from 'lucide-react'
import emailjs from '@emailjs/browser'

const STEPS = ['피해 정보', '고객 정보', '접수 완료']

const AIRLINES = ['대한항공', '아시아나항공', '제주항공', '티웨이항공', '진에어', '에어부산', '에어서울', 'British Airways', 'Ryanair', 'easyJet', '기타']
const TYPES = [
  { value: 'delay', label: '항공 지연' },
  { value: 'cancel', label: '항공 결항' },
]
const DELAY_RANGES = ['3시간 미만', '3~5시간', '5시간 이상', '해당 없음 (결항)']

export default function IntakeForm() {
  const [step, setStep] = useState(0)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({
    airline: '', flightNo: '', origin: '', destination: '', date: '',
    type: '', delay_hours: '', files: [] as File[],
    name: '', phone: '', email: '', detail: '',
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setForm((f) => ({ ...f, files: Array.from(e.target.files!) }))
  }

  const submit = async () => {
    setSending(true)
    try {
      const params = {
        airline: form.airline, flightNo: form.flightNo,
        route: `${form.origin} → ${form.destination}`,
        date: form.date, type: form.type, delay_hours: form.delay_hours,
        name: form.name, phone: form.phone, email: form.email, detail: form.detail,
      }
      await Promise.allSettled([
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_FIRM_TEMPLATE_ID!,
          params,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ),
        emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID!,
          params,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ),
      ])
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
      setStep(2)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
              i < step ? 'bg-gold text-navy' : i === step ? 'bg-navy text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? 'text-navy' : 'text-gray-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className={`h-px flex-1 ml-2 ${i < step ? 'bg-gold' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Flight info */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">항공사 *</label>
              <select value={form.airline} onChange={(e) => set('airline', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm">
                <option value="">선택하세요</option>
                {AIRLINES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">항공편명</label>
              <input type="text" placeholder="예: KE001" value={form.flightNo} onChange={(e) => set('flightNo', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">출발지 *</label>
              <input type="text" placeholder="예: 인천 (ICN)" value={form.origin} onChange={(e) => set('origin', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">도착지 *</label>
              <input type="text" placeholder="예: 런던 (LHR)" value={form.destination} onChange={(e) => set('destination', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">운항 날짜 *</label>
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">피해 유형 *</label>
            <div className="grid grid-cols-2 gap-2">
              {TYPES.map((t) => (
                <button key={t.value} type="button" onClick={() => set('type', t.value)}
                  className={`border rounded-xl px-4 py-3 text-[15px] font-medium transition-all text-left shadow-sm ${
                    form.type === t.value ? 'border-navy bg-navy text-white ring-4 ring-navy/10' : 'border-gray-200 text-gray-600 hover:border-navy/30 hover:bg-gray-50'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">지연 시간</label>
            <div className="grid grid-cols-2 gap-2">
              {DELAY_RANGES.map((r) => (
                <button key={r} type="button" onClick={() => set('delay_hours', r)}
                  className={`border rounded-xl px-4 py-3 text-[15px] font-medium transition-all text-left shadow-sm ${
                    form.delay_hours === r ? 'border-gold bg-gold/10 text-navy ring-4 ring-gold/20' : 'border-gray-200 text-gray-600 hover:border-gold/30 hover:bg-gray-50'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setStep(1)} disabled={!form.airline || !form.origin || !form.destination || !form.date || !form.type}
            className="btn-navy w-full justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed">
            다음 단계 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Customer info */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">이름 *</label>
              <input type="text" placeholder="홍길동" value={form.name} onChange={(e) => set('name', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">연락처 *</label>
              <input type="tel" placeholder="010-0000-0000" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">이메일 *</label>
            <input type="email" placeholder="example@email.com" value={form.email} onChange={(e) => set('email', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">피해 상세 내용</label>
            <textarea rows={4} placeholder="상황을 자세히 설명해 주세요..." value={form.detail} onChange={(e) => set('detail', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-4 focus:ring-navy/10 focus:border-navy bg-gray-50/50 hover:bg-gray-50 transition-all shadow-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1.5">증빙 파일 첨부 (선택)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-navy/40 hover:bg-gray-50 transition-all">
              <Upload className="w-8 h-8 text-gray-300 mb-3" />
              <span className="text-sm text-gray-500 font-medium">항공권, 탑승권, 영수증 등</span>
              <span className="text-xs text-gray-400 mt-1">클릭하여 파일 선택</span>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFiles} className="hidden" />
            </label>
            {form.files.length > 0 && (
              <div className="mt-2 space-y-1">
                {form.files.map((f) => (
                  <div key={f.name} className="text-xs text-navy bg-navy/5 rounded px-3 py-1.5">{f.name}</div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-navy py-3 px-5">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={submit} disabled={!form.name || !form.phone || !form.email || sending}
              className="btn-navy flex-1 justify-center py-3 disabled:opacity-40">
              {sending ? '접수 중...' : '사건 접수하기'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 2 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-navy mb-3">접수가 완료됐습니다!</h2>
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
          <p className="text-xs text-gray-400">접수 확인 이메일이 <strong>{form.email}</strong> 로 발송됐습니다</p>
        </div>
      )}
    </div>
  )
}
