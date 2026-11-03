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
      // "City of Trees" palette: forest green + brass on warm limestone.
      // Token names kept from the original theme so every page re-themes at once.
      colors: {
        ink: '#1E3A30', // forest: dark sections, headings
        deep: '#142821', // deepest forest: overlays, footer
        paper: '#F4F0E8', // limestone page background
        stone: { DEFAULT: '#E6E0D4', 50: '#EDE8DD', 200: '#E6E0D4', 300: '#D3CBBB', 400: '#B3AA97' },
        bronze: { DEFAULT: '#B98A4B', light: '#D9B27A', dark: '#875F2B' }, // brass accent
        body: '#2B332E',
        muted: '#5C665F',
        slate: { line: '#33503F', soft: '#9DB0A5' }
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
