/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(11, 99, 255)',
          foreground: 'rgb(255, 255, 255)',
          hover: 'rgb(9, 79, 200)',
        },
        accent: {
          DEFAULT: 'rgb(23, 185, 120)',
          foreground: 'rgb(255, 255, 255)',
        },
        destructive: 'rgb(224, 36, 36)',
        warning: 'rgb(255, 176, 32)',
        background: 'rgb(255, 255, 255)',
        foreground: 'rgb(11, 27, 43)',
        muted: {
          DEFAULT: 'rgb(246, 248, 250)',
          foreground: 'rgb(90, 106, 120)',
        },
        border: 'rgb(230, 233, 238)',
        card: {
          DEFAULT: 'rgb(255, 255, 255)',
          muted: 'rgb(246, 248, 250)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2' }],
        'h2': ['32px', { lineHeight: '1.2' }],
        'h3': ['20px', { lineHeight: '1.2' }],
      },
      fontWeight: {
        hero: '600',
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(11, 27, 43, 0.08)',
        'card-hover': '0 4px 12px rgba(11, 27, 43, 0.12)',
        glow: '0 0 0 2px rgba(11, 99, 255, 0.3)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        shimmer: 'shimmer 2s infinite linear',
        'scale-in': 'scale-in 0.2s ease-out forwards',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
