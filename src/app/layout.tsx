import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
// Pretendard: 사이트에서 직접 제공 (화면에 쓰인 글자 묶음만 내려받는 방식)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCTA from '@/components/layout/MobileCTA'
import { BRAND, FIRM, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

// 로고 워드마크용 명조체 (에어리걸 900, 클레임 400). 빌드할 때 내려받아 사이트에서 직접 제공합니다.
const serifKr = Noto_Serif_KR({
  weight: ['400', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif-kr',
})

const ogTitle = `${BRAND.name} — 항공지연·결항 보상`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND.name,
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['항공지연보상', '항공결항', 'EU261', '항공피해', '법무법인', BRAND.name],
  openGraph: {
    siteName: BRAND.name,
    title: ogTitle,
    locale: 'ko_KR',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${BRAND.name} — ${FIRM.name}이 운영하는 항공지연·결항 보상 서비스` }],
  },
  twitter: { card: 'summary_large_image', title: ogTitle },
}

// 검색엔진용 정보 — 서비스(에어리걸클레임)와 운영 법인(법무법인 명). 메인 사이트 주소(url·sameAs)는 넣지 않습니다.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: BRAND.name,
  alternateName: BRAND.nameEn,
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  description: SITE_DESCRIPTION,
  parentOrganization: {
    '@type': 'LegalService',
    name: FIRM.name,
    alternateName: FIRM.nameEn,
    taxID: FIRM.taxId,
    logo: `${SITE_URL}/images/logo.png`,
  },
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
    <html lang="ko" className={serifKr.variable}>
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
