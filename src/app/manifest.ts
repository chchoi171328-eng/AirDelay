import type { MetadataRoute } from 'next'
import { BRAND, SITE_DESCRIPTION } from '@/lib/site'

// 홈 화면에 추가할 때 쓰는 앱 정보 (아이콘: public/icons/)
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND.name,
    short_name: BRAND.name,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: BRAND.themeColor,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
