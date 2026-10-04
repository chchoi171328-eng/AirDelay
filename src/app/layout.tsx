import type { Metadata } from 'next'
// Pretendard: 사이트에서 직접 제공 (화면에 쓰인 글자 묶음만 내려받는 방식)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
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

// 검색엔진용 법인 정보 — 메인 사이트(sllaw.co.kr)의 법인 정보와 같은 값을 씁니다 (src/lib/site.ts)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: FIRM.name,
  alternateName: FIRM.nameEn,
  taxID: FIRM.taxId,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description: SITE_DESCRIPTION,
  telephone: FIRM.phoneIntl,
  email: FIRM.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: FIRM.addressParts.street,
    addressLocality: FIRM.addressParts.locality,
    addressRegion: FIRM.addressParts.region,
    addressCountry: FIRM.addressParts.country,
  },
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
