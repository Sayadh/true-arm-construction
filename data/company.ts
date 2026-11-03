import type { CompanyConfig } from '../types'

/**
 * ============================================================
 *  TRUE ARM CONSTRUCTION — CENTRAL BUSINESS CONFIGURATION
 * ============================================================
 *  Every business fact shown on the site comes from this file.
 *  Values set to `null` are NOT displayed and NEVER become links.
 *  See docs/BUSINESS-CHECKLIST.md before going live.
 */
export const company: CompanyConfig = {
  name: 'True Arm Construction',
  shortName: 'True Arm',
  legalName: null, // TODO(client): exact legal business name as listed with CSLB
  domain: 'truearmconstruction.com',
  tagline: 'Built around your vision. Built to last.',
  description:
    'Residential and commercial construction, remodeling, and property improvement services in Sacramento, California.',

  primaryArea: { city: 'Sacramento', region: 'California', regionCode: 'CA', country: 'US' },

  phone: null, // TODO(client): e.g. '+19165550100' (E.164). Leave null until confirmed.
  email: null, // TODO(client): e.g. 'info@truearmconstruction.com'
  address: null, // Only add a real, public business address. Never a placeholder.
  hours: null, // TODO(client): e.g. [{ days: 'Mon–Fri', hours: '8:00 AM – 5:00 PM' }]

  license: {
    number: '1128503',
    classification: 'B',
    classificationName: 'General Building Contractor',
    authority: 'California Contractors State License Board (CSLB)',
    verifyUrl: 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1128503',
    statusConfirmed: false, // Set true only after checking cslb.ca.gov
    statusCheckedOn: null
  },

  confirmedFacts: {
    freeEstimates: true,
    residential: true,
    commercial: true
  },

  social: {
    instagram: 'https://www.instagram.com/truearmconstruction/',
    facebook: 'https://www.facebook.com/p/True-Arm-Construction-61567774326514/',
    google: null // Google Business Profile URL, when available
  },

  logo: {
    src: '/images/brand/logo.png', // official logo (transparent PNG, 600×526); master file: true-arm-construction-logo.png
    alt: 'True Arm Construction'
  },

  heroImage: null, // e.g. { src: '/images/hero/home-hero.jpg', alt: '...', width: 2400, height: 1600 }

  // TODO(client): add finished-project photos here to put them behind the homepage
  // hero as a slow auto-rotating background (works with 1 photo too — just no rotation).
  // 1. Drop the files in public/images/hero/slides/ (e.g. slide-1.jpg, slide-2.jpg).
  // 2. List them below, widest side first works best — these get cropped to fill
  //    the hero on every screen size, so a clear, simply-composed photo (one job
  //    site or finished room, not a busy collage) reads best.
  // heroSlides: [
  //   { src: '/images/hero/slides/slide-1.jpg', alt: 'Finished kitchen remodel in Sacramento, CA' },
  //   { src: '/images/hero/slides/slide-2.jpg', alt: 'New fence and gate installation' }
  // ],
  // Currently: licensed stock photos (Unsplash License) as atmosphere only. They are
  // never labeled or presented as True Arm projects. Replace with real work when available.
  heroSlides: [
    { src: '/images/stock/hero-kitchen.jpg', alt: '' },
    { src: '/images/stock/hero-dusk-house.jpg', alt: '' },
    { src: '/images/stock/hero-bathroom.jpg', alt: '' }
  ],

  defaultOgImage: '/images/social/og-default.png'
}

/** Helpers that keep components free of null-checks and formatting logic */
export const hasPhone = () => Boolean(company.phone)
export const hasEmail = () => Boolean(company.email)

export function formatPhone(e164: string): string {
  const digits = e164.replace(/\D/g, '').replace(/^1/, '')
  if (digits.length !== 10) return e164
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export const licenseLabel = `CA License #${company.license.number}, Class ${company.license.classification}`
