import type { Metadata } from 'next'
import { FileText, Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '문의하기',
  description: '법무법인 명에 문의하세요. 한국 및 영국 법인 연락처를 안내해 드립니다.',
}

export default function ContactPage() {
  return (
    <div>
      <PageHeader title="문의하기" subtitle="사건 접수 및 문의 창구를 안내합니다" />

      <div className="py-16">
        <div className="container-wide section-padding">
          {/* Primary CTA */}
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-10 text-center mb-12 shadow-xl">
            <h2 className="text-2xl font-extrabold text-white mb-3">사건 접수가 가장 빠릅니다</h2>
            <p className="text-white/60 mb-6">온라인 접수 → 영업일 기준 2일 이내에 연락드립니다</p>
            <Link href="/intake" className="btn-primary inline-flex text-base px-10 py-4">
              <FileText className="w-5 h-5" />
              사건 접수하기
            </Link>
          </div>

          {/* Contact options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Korea */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-navy text-white text-sm font-extrabold flex items-center justify-center">KR</span>
                <div>
                  <div className="font-extrabold text-navy">한국 법인</div>
                  <div className="text-gray-500 text-sm">국내선·일반 국제선 담당</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">전화 문의</div>
                    <div className="text-gray-500">02-000-0000</div>
                    <div className="text-gray-500 text-xs mt-0.5">평일 09:00–18:00</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">이메일</div>
                    <div className="text-gray-500">korea@lawfirm-myung.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">주소</div>
                    <div className="text-gray-500">서울특별시 강남구 테헤란로 000</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MessageCircle className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">카카오톡 채널</div>
                    <a href="#" className="text-navy underline underline-offset-2 hover:text-orange text-sm font-semibold">@법무법인명</a>
                    <div className="text-gray-500 text-xs mt-0.5">빠른 문의 가능</div>
                  </div>
                </div>
              </div>
            </div>

            {/* UK */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-navy text-white text-sm font-extrabold flex items-center justify-center">UK</span>
                <div>
                  <div className="font-extrabold text-navy">영국 법인</div>
                  <div className="text-gray-500 text-sm">EU261·영국 노선 담당</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">전화 문의</div>
                    <div className="text-gray-500">+44 20 0000 0000</div>
                    <div className="text-gray-500 text-xs mt-0.5">Mon–Fri 09:00–17:00 (GMT)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">이메일</div>
                    <div className="text-gray-500">uk@lawfirm-myung.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-navy">주소</div>
                    <div className="text-gray-500">London, United Kingdom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-navy/5 border border-navy/10 rounded-xl p-5 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-navy shrink-0" />
            <p className="text-sm text-gray-600">
              <strong className="text-navy">착수금·선불금 없음</strong> — 보상금을 받은 경우에만 수임료가 발생합니다 (성공 보수 방식).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
