/**
 * Shared content types. These mirror what a future CMS or API would return,
 * so data modules in /data can later be swapped for fetched content without
 * changing page components.
 */

export interface ImageAsset {
  /** Path under /public, e.g. "/images/services/bathroom-1.jpg" */
  src: string
  alt: string
  width?: number
  height?: number
}

export interface BusinessHours {
  days: string
  hours: string
}

export interface CompanyConfig {
  name: string
  shortName: string
  /** Legal business name as registered with CSLB / Secretary of State. Leave null until confirmed. */
  legalName: string | null
  domain: string
  tagline: string
  description: string
  /** Primary service area as shown to visitors */
  primaryArea: { city: string; region: string; regionCode: string; country: string }
  /** Leave null until real values are supplied. Null values are never rendered as links. */
  phone: string | null
  email: string | null
  /** Only fill in if the company has a public, verified business address. */
  address: {
    street: string
    city: string
    region: string
    postalCode: string
    country: string
  } | null
  hours: BusinessHours[] | null
  license: {
    number: string
    classification: string
    classificationName: string
    authority: string
    verifyUrl: string
    /**
     * Set to true ONLY after confirming active status on cslb.ca.gov.
     * While false, the site never says "active".
     */
    statusConfirmed: boolean
    /** Date the status was last checked, ISO yyyy-mm-dd */
    statusCheckedOn: string | null
  }
  /** Facts the company has confirmed. Rendered as trust details. */
  confirmedFacts: {
    freeEstimates: boolean
    residential: boolean
    commercial: boolean
  }
  social: {
    instagram: string | null
    facebook: string | null
    google: string | null
  }
  logo: {
    /** Path to an official SVG/PNG logo. When null, the typographic wordmark is used. */
    src: string | null
    alt: string
  }
  /** Optional hero photograph. When null, the drawn elevation graphic is shown. */
  heroImage: ImageAsset | null
  /**
   * Optional background slideshow of completed work, shown full-bleed behind the
   * whole homepage hero (mobile and desktop) with a dark scrim over it for text
   * contrast. Empty by default — the hero falls back to its plain dark background.
   * With 2+ photos it auto-advances; with exactly 1 it's shown static.
   */
  heroSlides: ImageAsset[]
  defaultOgImage: string
}

export type ServiceGroupId = 'remodeling' | 'flooring' | 'exterior' | 'repairs'

export interface ServiceGroup {
  id: ServiceGroupId
  name: string
  description: string
}

export interface ServiceScopeItem {
  title: string
  text: string
}

/** Optional grouped scope (e.g. Installation / Repair) shown instead of a flat list */
export interface ServiceScopeGroup {
  id: string
  title: string
  intro?: string
  items: ServiceScopeItem[]
}

export interface ServiceSection {
  title: string
  body: string[]
}

export interface Service {
  slug: string
  name: string
  /** Short label used in menus and filters */
  shortName: string
  group: ServiceGroupId
  enabled: boolean
  /** lucide icon name, resolved in components/ui/ServiceIcon.vue */
  icon: string
  /** <title>, ~60 chars */
  seoTitle: string
  /** meta description, ~150 chars */
  metaDescription: string
  heroTitle: string
  heroLead: string
  cardText: string
  intro: string[]
  scopeTitle: string
  scope: ServiceScopeItem[]
  scopeGroups?: ServiceScopeGroup[]
  /** Shown when the exact scope still needs confirmation with the company */
  scopeNote?: string
  sections: ServiceSection[]
  costFactors: string[]
  expectations: string[]
  related: string[]
  faqCategory: FaqCategoryId
  /** Extra FAQ ids to show on this page */
  faqIds?: string[]
  /** Project category used to pull related portfolio items */
  projectCategory: ProjectCategoryId
  images: ImageAsset[]
  /** Optional anchored subsections (e.g. residential / commercial) */
  anchors?: { id: string; title: string; body: string[] }[]
  /** Treat as a focused paid-ads landing page (reduced distractions) */
  adsLanding?: boolean
}

export type ProjectCategoryId =
  | 'kitchen'
  | 'bathroom'
  | 'remodeling'
  | 'room-addition'
  | 'flooring'
  | 'tile'
  | 'interior-painting'
  | 'exterior-painting'
  | 'fence'
  | 'repairs'

export interface ProjectCategory {
  id: ProjectCategoryId
  name: string
}

export interface BeforeAfterPair {
  before: ImageAsset
  after: ImageAsset
  caption?: string
}

export interface Project {
  slug: string
  title: string
  /** Only true once the client approves publishing this project and its photos. */
  published: boolean
  category: ProjectCategoryId
  /** Service slugs this project demonstrates */
  services: string[]
  propertyType?: 'Residential' | 'Commercial'
  /** City/area only if the client approved showing it */
  location?: string
  summary: string
  description?: string[]
  cover: ImageAsset
  gallery: ImageAsset[]
  beforeAfter?: BeforeAfterPair[]
  materials?: string[]
  challenges?: { challenge: string; solution: string }[]
  featured?: boolean
  completedOn?: string
}

export type FaqCategoryId =
  | 'general'
  | 'kitchen'
  | 'bathroom'
  | 'additions'
  | 'flooring'
  | 'painting'
  | 'exterior'
  | 'repairs'
  | 'estimates'

export interface FaqCategory {
  id: FaqCategoryId
  name: string
}

export interface FaqItem {
  id: string
  category: FaqCategoryId
  question: string
  /** Paragraphs. Simple inline links allowed as [text](url) */
  answer: string[]
  featured?: boolean
}

export interface Credential {
  id: string
  name: string
  issuer: string
  credentialNumber?: string
  description: string
  /** 'confirmed' only after the issuer's record has been checked */
  status: 'confirmed' | 'pending-verification'
  issuedOn?: string
  expiresOn?: string
  verifyUrl?: string
  image?: ImageAsset
  pdf?: string
  published: boolean
}

export interface ServiceArea {
  slug: string
  name: string
  county: string
  /** Enable only when the company confirms coverage */
  enabled: boolean
  primary?: boolean
}

export interface ResourceArticle {
  slug: string
  title: string
  description: string
  published: boolean
  publishedOn: string
  updatedOn?: string
  readingMinutes: number
  relatedServices: string[]
  /** Simple structured body: h2 sections with paragraphs and bullet lists */
  body: { heading?: string; paragraphs?: string[]; list?: string[] }[]
}

export interface NavLink {
  label: string
  to: string
}

export interface Crumb {
  name: string
  path: string
}
