/**
 * Conversion event layer.
 * - Pushes to window.dataLayer (GTM) and gtag (GA4) only when configured.
 * - NEVER include personal data (names, phones, emails, notes, ZIPs) in params.
 * - In development, events are logged to the console instead.
 */

export type AnalyticsEvent =
  | 'phone_click'
  | 'sms_click'
  | 'email_click'
  | 'estimate_cta_click'
  | 'service_cta_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'planner_start'
  | 'planner_step'
  | 'planner_submit'
  | 'navigator_recommendation'

type SafeParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const LEAD_EVENTS: AnalyticsEvent[] = ['contact_form_submit', 'planner_submit']

export function useAnalytics() {
  const config = useRuntimeConfig().public

  function track(event: AnalyticsEvent, params: SafeParams = {}) {
    if (import.meta.server) return
    const payload = { ...params, page_path: window.location.pathname }

    if (import.meta.dev) {
      console.info('[analytics]', event, payload)
    }

    if (config.gtmId) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event, ...payload })
    }

    if (config.ga4Id && typeof window.gtag === 'function') {
      window.gtag('event', event, payload)
    }

    if (
      LEAD_EVENTS.includes(event) &&
      config.googleAdsId &&
      config.googleAdsLeadLabel &&
      typeof window.gtag === 'function'
    ) {
      window.gtag('event', 'conversion', { send_to: `${config.googleAdsId}/${config.googleAdsLeadLabel}` })
    }
  }

  return { track }
}
