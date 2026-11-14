/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 이미지는 쓰지 않습니다(첨부파일 기능 제거) — images.remotePatterns 를 두지 않아 이미지 최적화 API가 외부 주소를 받지 않습니다.
  // 페이지를 합치면서 없어진 주소는 새 위치로 보냅니다
  async redirects() {
    return [
      { source: '/contact', destination: '/about#contact', permanent: true },
      { source: '/blog', destination: '/guide', permanent: true },
      { source: '/blog/:slug', destination: '/guide/:slug', permanent: true },
      // 「몬트리올 협약 손해배상」은 내렸고, 그 주소는 「몬트리올 협약과 항공 지연」으로 보냅니다
      { source: '/guide/montreal-convention-delay', destination: '/guide/montreal-convention', permanent: true },
    ]
  },
}

module.exports = nextConfig
