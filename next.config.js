/** @type {import('next').NextConfig} */
const nextConfig = {
  // 페이지를 합치면서 없어진 주소는 새 위치로 보냅니다
  async redirects() {
    return [
      { source: '/contact', destination: '/about#contact', permanent: true },
      { source: '/blog', destination: '/guide', permanent: true },
      { source: '/blog/:slug', destination: '/guide/:slug', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
