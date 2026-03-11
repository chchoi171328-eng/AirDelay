import type { Metadata } from 'next'
import IntakeForm from '@/components/sections/intake/IntakeForm'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Shield, Clock, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: '사건 접수',
  description: '항공 피해 사건을 무료로 접수하세요. 48시간 내 담당 변호사가 연락드립니다.',
}

export default function IntakePage() {
  return (
    <div>
      <div className="bg-navy py-16">
        <div className="container-wide section-padding text-center">
          <h1 className="text-4xl font-black text-white mb-3">무료 사건 접수</h1>
          <p className="text-white/60 text-lg">간단한 정보 입력으로 전문 검토를 받으세요</p>
        </div>
      </div>

      <div className="py-16">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <IntakeForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Airport image placeholder */}
              <ImagePlaceholder label="사건접수 / 공항 내부 사진" aspectRatio="aspect-[3/2]" className="rounded-2xl" />

              <div className="bg-navy/3 rounded-2xl p-6 space-y-4 border border-navy/10">
                <h3 className="font-bold text-navy">접수 안내</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, text: '모든 검토는 무료로 진행됩니다' },
                    { icon: Clock, text: '48시간 내 담당 변호사 연락' },
                    { icon: Phone, text: '승소 시에만 수임료 발생 (성공 보수)' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3 text-sm text-gray-600">
                      <Icon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
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
