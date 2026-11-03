/**
 * Loads Google Tag Manager and/or GA4 + Google Ads only when their IDs are configured.
 * Nothing is loaded in development or when IDs are empty.
 *
 * Consent: Google Consent Mode v2 defaults are set from NUXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT.
 * If you add a consent-management platform (CMP), set the default to "denied" and let the
 * CMP call gtag('consent', 'update', {...}). See docs/ANALYTICS.md.
 */
export default defineNuxtPlugin(() => {
  const c = useRuntimeConfig().public
  if (import.meta.dev) return
  const gtmId = String(c.gtmId || '')
  const ga4Id = String(c.ga4Id || '')
  const adsId = String(c.googleAdsId || '')
  if (!gtmId && !ga4Id && !adsId) return

  const consent = c.analyticsConsentDefault === 'denied' ? 'denied' : 'granted'

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer!.push(arguments) }
  window.gtag('consent', 'default', {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent
  })

  const load = (src: string) => {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }

  if (gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    load(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`)
    return // When GTM is used, configure GA4/Ads tags inside GTM to avoid double counting.
  }

  const primary = ga4Id || adsId
  load(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`)
  window.gtag('js', new Date())
  if (ga4Id) window.gtag('config', ga4Id, { anonymize_ip: true })
  if (adsId) window.gtag('config', adsId)
})
