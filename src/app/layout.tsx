import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: '법무법인 명 | 항공지연·결항 보상 전문',
    template: '%s | 법무법인 명',
  },
  description: '항공 지연·결항 피해 전문 법무법인. 한국–영국 변호사 협업으로 국내외 모든 노선을 처리합니다.',
  keywords: ['항공지연보상', '항공결항', 'EU261', '항공피해', '법무법인'],
  openGraph: {
    siteName: '법무법인 명',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
