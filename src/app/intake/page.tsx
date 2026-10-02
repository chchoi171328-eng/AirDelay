import Image from 'next/image'
import type { Metadata } from 'next'
import IntakeForm from '@/components/sections/intake/IntakeForm'
import { Shield, Clock, Phone } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: '사건 접수',
  description: '항공 지연·결항 사건을 온라인으로 접수하세요. 영업일 기준 2일 이내에 연락드립니다.',
}

export default function IntakePage() {
  // 첨부파일은 Supabase Storage(서버 키 필요)가 설정된 경우에만 받습니다.
  const uploadsEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  return (
    <div>
      <PageHeader title="사건 접수" subtitle="간단한 정보를 입력하시면 보상 가능 여부를 판단해 드립니다" />

      <div className="py-16">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <IntakeForm uploadsEnabled={uploadsEnabled} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
                <Image src="/images/intake-airport.jpg" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>

              <div className="bg-navy/3 rounded-2xl p-6 space-y-4 border border-navy/10">
                <h3 className="font-bold text-navy">접수 안내</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: '착수금·선불금 없이 접수' },
                    { icon: Clock, text: '영업일 기준 2일 이내 연락' },
                    { icon: Phone, text: '보상금을 받은 경우에만 수임료 발생 (성공 보수)' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                      <Icon className="w-4 h-4 text-navy/60 mt-0.5 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
