/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 이미지는 쓰지 않습니다(첨부파일 기능 제거) — images.remotePatterns 를 두지 않아 이미지 최적화 API가 외부 주소를 받지 않습니다.
  // 페이지를 합치면서 없어진 주소는 새 위치로 보냅니다
  async redirects() {
    return [
      { source: '/contact', destination: '/about#contact', permanent: true },
      { source: '/blog', destination: '/guide', permanent: true },
      { source: '/blog/:slug', destination: '/guide/:slug', permanent: true },
      // 「몬트리올 협약 손해배상」을 내리고 새 글로 보냅니다. 같은 주소에 새 글을 올릴 수 있어 임시 이동으로 둡니다
      { source: '/guide/montreal-convention-delay', destination: '/guide/delay-claim-without-fixed-compensation', permanent: false },
    ]
  },
}

module.exports = nextConfig
