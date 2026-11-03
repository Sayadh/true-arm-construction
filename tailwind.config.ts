import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
    './data/**/*.ts',
    './composables/**/*.ts'
  ],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        ink: '#172126',
        deep: '#101719',
        paper: '#FAF9F6',
        stone: { DEFAULT: '#E8E5DF', 50: '#F3F1EC', 200: '#E8E5DF', 300: '#D8D3CA', 400: '#BDB6AA' },
        bronze: { DEFAULT: '#B88957', light: '#CFA67A', dark: '#85602F' },
        body: '#334047',
        muted: '#5B676D',
        slate: { line: '#2A363C', soft: '#93A0A6' }
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      fontSize: {
        // Modular scale (~1.25) tuned for Manrope
        'display': ['clamp(2.5rem, 1.6rem + 4vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'h1': ['clamp(2.125rem, 1.6rem + 2.4vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 1.4rem + 1.5vw, 2.625rem)', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '700' }],
        'h3': ['clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '650' }],
        'lead': ['clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }]
      },
      maxWidth: {
        prose: '68ch',
        site: '80rem'
      },
      borderRadius: {
        sm: '3px',
        DEFAULT: '6px',
        lg: '10px'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.2,.7,.2,1)'
      }
    }
  },
  plugins: []
} satisfies Config
