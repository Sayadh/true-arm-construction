# Analytics, conversions and Search Console

Nothing is loaded until IDs are configured. All IDs come from environment variables (see `.env.example`) and are read in `plugins/analytics.client.ts` and `composables/useAnalytics.ts`.

## Options

| Setup | Variables |
|---|---|
| GA4 only | `NUXT_PUBLIC_GA4_ID=G-XXXXXXX` |
| GA4 + Google Ads conversions | add `NUXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXX`, `NUXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL=xxxxxxxx` |
| Google Tag Manager | `NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX` (then configure GA4/Ads tags inside GTM; the direct gtag setup is skipped to avoid double counting) |
| Search Console | `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<content value>` (or verify via DNS on Cloudflare) |

Rebuild after changing any value.

## Events

| Event | When |
|---|---|
| `estimate_cta_click` | Any "Get a Free Estimate" style button (param `label` = location) |
| `service_cta_click` | Estimate buttons on service pages (`label` = service slug) |
| `phone_click`, `email_click` | Tap on phone/email links (only exist once contact info is configured) |
| `planner_start`, `planner_step` | Planner started / step changed |
| `planner_submit` | Planner delivered successfully → also fires the Google Ads conversion |
| `contact_form_start`, `contact_form_submit` | Contact form focused / delivered → submit also fires the Ads conversion |
| `navigator_recommendation` | Service finder choice (`service` slug) |

Events never include names, phone numbers, emails, ZIP codes, or message text.

In GA4, mark `planner_submit` and `contact_form_submit` as key events. With GTM, create Custom Event triggers with the same names from the `dataLayer`.

## Consent

California (CCPA/CPRA) generally uses an opt-out model. The site sets Google Consent Mode v2 defaults from `NUXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT` (`granted` by default).
No cookie banner is included, because a banner that does not actually control tags would be misleading. If you add a consent-management platform (CMP):

1. Set `NUXT_PUBLIC_ANALYTICS_CONSENT_DEFAULT=denied`.
2. Have the CMP call `gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' })` after the visitor agrees.
3. Update `pages/privacy-policy.vue` accordingly.
