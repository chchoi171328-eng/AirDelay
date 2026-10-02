import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCTA from '@/components/layout/MobileCTA'
import { FIRM, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${FIRM.name} | 항공지연·결항 보상 전문`,
    template: `%s | ${FIRM.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['항공지연보상', '항공결항', 'EU261', '항공피해', '법무법인'],
  openGraph: {
    siteName: FIRM.name,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${FIRM.name} — 항공편 지연·결항 보상` }],
  },
  twitter: { card: 'summary_large_image' },
}

// 검색엔진용 법인 정보 (연락처는 src/lib/site.ts 값을 따릅니다)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: FIRM.name,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: SITE_DESCRIPTION,
  telephone: FIRM.phone,
  email: FIRM.email,
  areaServed: ['KR', 'GB'],
  knowsAbout: ['항공 지연 보상', '항공 결항 보상', 'EU261', '몬트리올 협약'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard: 화면에 쓰인 글자 묶음만 내려받는 방식 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
