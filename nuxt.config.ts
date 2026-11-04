// https://nuxt.com/docs/api/configuration/nuxt-config
import { services } from './data/services'
import { publishedProjects } from './data/projects'
import { publishedResources } from './data/resources'
import { areaPages } from './data/areas'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://truearmconstruction.com').replace(/\/$/, '')

// Indexing switch, decided once at build time.
// - Cloudflare Workers Builds (WORKERS_CI=1): the `main` branch is production, every other branch is a
//   preview. A dashboard NUXT_PUBLIC_SITE_ENV is ignored there on purpose: it applies to every branch,
//   and a stale "staging" value once kept the live site out of Google.
// - Anywhere else (local, other hosts): production only with NUXT_PUBLIC_SITE_ENV=production.
// Stored as `siteMode` (not `siteEnv`) so Nuxt's automatic NUXT_PUBLIC_SITE_ENV runtime override can't replace it.
const onCloudflareCi = process.env.WORKERS_CI === '1'
const siteMode: 'production' | 'preview' | 'development' = onCloudflareCi
  ? process.env.WORKERS_CI_BRANCH === 'main' ? 'production' : 'preview'
  : process.env.NUXT_PUBLIC_SITE_ENV === 'production' ? 'production' : 'development'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  css: ['@fontsource-variable/manrope/index.css', '@fontsource-variable/archivo/wdth.css', '~/assets/css/main.css'],

  // Components are referenced by file name (e.g. <AppButton>), not folder-prefixed names.
  components: [{ path: '~/components', pathPrefix: false }],

  typescript: {
    strict: true,
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      siteUrl,
      siteMode,
      // Form delivery (static-friendly hosted provider). See docs/FORMS.md
      formProvider: process.env.NUXT_PUBLIC_FORM_PROVIDER || 'formspree',
      // Formspree form "True Arm website" (public by nature: it is visible in the browser). An env var overrides it.
      formEndpoint: process.env.NUXT_PUBLIC_FORM_ENDPOINT || 'https://formspree.io/f/xgaadkjb',
      // Analytics / verification. See docs/ANALYTICS.md
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || '',
      ga4Id: process.env.NUXT_PUBLIC_GA4_ID || '',
      googleAdsId: process.env.NUXT_PUBLIC_GOOGLE_ADS_ID || '',
      googleAdsLeadLabel: process.env.NUXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || '',
      googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      analyticsConsentDefault: process.env.NUXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT || 'granted'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en-US' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      meta: [
        { name: 'theme-color', content: '#13294B' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-title', content: 'True Arm' }
      ],
      // Icons generated from the official logo (public/images/brand). Google Search uses the
      // root favicon (multiple of 48px); see docs/ASSETS.md.
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  image: {
    quality: 78
  },

  tailwindcss: {
    cssPath: false,
    viewer: false
  },

  nitro: {
    // Always output plain static files, even when building on Cloudflare/Netlify/Vercel CI
    // (otherwise Nitro auto-detects the platform and emits a server Worker).
    // (Spread because Nuxt's typed Nitro subset omits `preset`, though Nitro supports it.)
    ...({ preset: 'static' } as Record<string, unknown>),
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: [
        '/',
        '/sitemap.xml',
        '/robots.txt',
        '/llms.txt',
        '/llms-full.txt',
        ...areaPages.map((a) => `/service-areas/${a.slug}`),
        ...services.map((s) => `/services/${s.slug}`),
        ...publishedProjects.map((p) => `/projects/${p.slug}`),
        ...publishedResources.map((r) => `/resources/${r.slug}`)
      ]
    }
  },

  experimental: {
    payloadExtraction: true
  }
})
