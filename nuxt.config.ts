// https://nuxt.com/docs/api/configuration/nuxt-config
import { services } from './data/services'
import { publishedProjects } from './data/projects'
import { publishedResources } from './data/resources'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://truearmconstruction.com').replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  css: ['@fontsource-variable/manrope/index.css', '~/assets/css/main.css'],

  // Components are referenced by file name (e.g. <AppButton>), not folder-prefixed names.
  components: [{ path: '~/components', pathPrefix: false }],

  typescript: {
    strict: true,
    typeCheck: false
  },

  runtimeConfig: {
    public: {
      siteUrl,
      siteEnv: process.env.NUXT_PUBLIC_SITE_ENV || 'development',
      // Form delivery (static-friendly hosted provider). See docs/FORMS.md
      formProvider: process.env.NUXT_PUBLIC_FORM_PROVIDER || 'formspree',
      formEndpoint: process.env.NUXT_PUBLIC_FORM_ENDPOINT || '',
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
        { name: 'theme-color', content: '#172126' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
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
