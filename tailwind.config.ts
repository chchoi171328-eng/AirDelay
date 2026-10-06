import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2342', // Primary deep blue
          dark: '#061829',
          light: '#0D2E56',
        },
        gold: {
          DEFAULT: '#C5A47E', // 로고 금색 (메인 사이트 brand-gold와 같은 값)
          light: '#D4B86A',
          dark: '#A8873A',
        },
        orange: {
          DEFAULT: '#FF6B35', // Action/Highlight color from redesign
          dark: '#E55A2A',
          light: '#FF8A5C',
        },
        surface: {
          DEFAULT: '#F8F9FA', // Light grey for sections
          alt: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        // 로고 워드마크 전용 (src/app/layout.tsx에서 Noto Serif KR을 불러옵니다)
        serif: ['var(--font-serif-kr)', '"Noto Serif KR"', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'counter': 'counter 2s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
