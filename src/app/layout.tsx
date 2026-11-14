import type { Metadata } from 'next'
// Pretendard: 사이트에서 직접 제공 (화면에 쓰인 글자 묶음만 내려받는 방식)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCTA from '@/components/layout/MobileCTA'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import { getPost } from '@/lib/content'
import { ANNOUNCEMENT, BRAND, FIRM, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

// 로고 워드마크용 명조체(Noto Serif KR)는 globals.css의 @font-face로 public/fonts에서 직접 제공합니다 (워드마크 글자만 담은 조각).
const WORDMARK_FONT_FILES = ['115', '116', '117', '118', '119'].map((n) => `/fonts/noto-serif-kr/noto-serif-kr-${n}.woff2`)

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
  verification: {
    other: { 'naver-site-verification': 'e99962dae23c330b306896b983038aca96691d7f' },
  },
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
  knowsAbout: ['항공 지연 보상', '항공 결항 보상', 'EU261', '항공 지연 위자료 소송'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 알림 띠: live가 켜져 있고 연결된 가이드가 공개 상태일 때만 나옵니다 (지금은 보류 중)
  const showNotice = ANNOUNCEMENT.live && Boolean(getPost(ANNOUNCEMENT.slug))

  return (
    <html lang="ko">
      <head>
        {WORDMARK_FONT_FILES.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          {showNotice && (
            <AnnouncementBar
              id={ANNOUNCEMENT.id}
              href={`/guide/${ANNOUNCEMENT.slug}`}
              label={ANNOUNCEMENT.label}
              text={ANNOUNCEMENT.text}
              textShort={ANNOUNCEMENT.textShort}
            />
          )}
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  )
}
