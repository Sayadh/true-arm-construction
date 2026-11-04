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
      // Palette taken from the logo: navy + signal red on warm white, softened for long reading.
      // Token names are kept from the original theme ("bronze" is now the red accent) so every page re-themes at once.
      colors: {
        ink: '#13294B', // navy: dark sections, headings (logo navy, slightly lifted)
        deep: '#0C1B33', // deepest navy: overlays, footer
        paper: '#F8F6F2', // warm white page background
        stone: { DEFAULT: '#E9E5DE', 50: '#F0EDE7', 200: '#E9E5DE', 300: '#D6D0C6', 400: '#ABA497' },
        bronze: { DEFAULT: '#C63D2C', light: '#F0907A', dark: '#A2301F' }, // logo red, muted; light = on navy, dark = text on white
        body: '#262B33',
        muted: '#5D6370',
        slate: { line: '#2A3F63', soft: '#9FB0C8' }
      },
      fontFamily: {
        sans: ['"Manrope Variable"', 'Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        // Condensed grotesk for headlines: reads like job-site signage and drawing title blocks
        display: ['"Archivo Variable"', 'Archivo', '"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // Display sizes are set in Archivo at a condensed width (see main.css)
        'display': ['clamp(3rem, 1.8rem + 5.4vw, 6.25rem)', { lineHeight: '0.92', letterSpacing: '-0.012em', fontWeight: '800' }],
        'h1': ['clamp(2.5rem, 1.8rem + 3vw, 4.25rem)', { lineHeight: '0.98', letterSpacing: '-0.01em', fontWeight: '800' }],
        'h2': ['clamp(2.125rem, 1.6rem + 2.2vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.008em', fontWeight: '780' }],
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
