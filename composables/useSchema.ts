import { company } from '~/data/company'
import { enabledAreas } from '~/data/areas'
import { enabledServices } from '~/data/services'
import type { FaqItem, ResourceArticle, Service, ServiceArea } from '~/types'

/**
 * JSON-LD builders. Every value comes from verified central data.
 * No ratings, reviews, or invented addresses are ever emitted (without a public address only city and state are given).
 */

type Json = Record<string, unknown>

function orgId() {
  return `${absoluteUrl('/')}#organization`
}

export function organizationSchema(): Json {
  const sameAs = [company.social.instagram, company.social.facebook, company.social.google].filter(Boolean)
  const node: Json = {
    '@type': ['GeneralContractor', 'LocalBusiness'],
    '@id': orgId(),
    name: company.name,
    url: absoluteUrl('/'),
    description: company.description,
    image: absoluteUrl(company.defaultOgImage),
    areaServed: enabledAreas.map(cityNode),
    knowsAbout: enabledServices.map((s) => s.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction and remodeling services',
      itemListElement: enabledServices.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(`/services/${s.slug}`) }
      }))
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `California Contractor License #${company.license.number} (Class ${company.license.classification}, ${company.license.classificationName})`,
      recognizedBy: { '@type': 'GovernmentOrganization', name: 'Contractors State License Board', url: 'https://www.cslb.ca.gov/' },
      url: company.license.verifyUrl
    }
  }
  if (company.legalName) node.legalName = company.legalName
  if (company.logo.src) node.logo = absoluteUrl(company.logo.src)
  if (company.phone) node.telephone = company.phone
  if (company.phone || company.textPhone) {
    node.contactPoint = [
      company.phone && { '@type': 'ContactPoint', telephone: company.phone, contactType: 'customer service', description: 'Calls and text messages', areaServed: 'US-CA', availableLanguage: 'English' },
      company.textPhone && { '@type': 'ContactPoint', telephone: company.textPhone, contactType: 'customer service', description: 'Text messages only', areaServed: 'US-CA', availableLanguage: 'English' }
    ].filter(Boolean)
  }
  if (company.email) node.email = company.email
  if (company.hours?.length) {
    node.openingHoursSpecification = company.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes
    }))
  }
  if (sameAs.length) node.sameAs = sameAs
  if (company.address) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country
    }
  } else {
    // Service-area business without a public street address: city and state only (no invented details)
    node.address = {
      '@type': 'PostalAddress',
      addressLocality: company.primaryArea.city,
      addressRegion: company.primaryArea.regionCode,
      addressCountry: company.primaryArea.country
    }
  }
  return node
}

function cityNode(a: ServiceArea): Json {
  return {
    '@type': 'City',
    name: `${a.name}, ${company.primaryArea.regionCode}`,
    containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county}, ${company.primaryArea.region}` }
  }
}

/** Service node for a city landing page: what we offer in that city. */
export function areaServicesSchema(area: ServiceArea): Json {
  const path = `/service-areas/${area.slug}`
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: `Construction and remodeling in ${area.name}, ${company.primaryArea.regionCode}`,
    serviceType: 'General contracting',
    url: absoluteUrl(path),
    provider: { '@id': orgId() },
    areaServed: cityNode(area),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services in ${area.name}`,
      itemListElement: enabledServices.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(`/services/${s.slug}`) }
      }))
    }
  }
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    url: absoluteUrl('/'),
    name: company.name,
    inLanguage: 'en-US',
    publisher: { '@id': orgId() }
  }
}

export function webPageSchema(opts: { path: string; title: string; description: string }): Json {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    about: { '@id': orgId() }
  }
}

export function serviceSchema(service: Service): Json {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': orgId() },
    areaServed: enabledAreas.map(cityNode)
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  }
}

export function articleSchema(article: ResourceArticle): Json {
  return {
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedOn,
    dateModified: article.updatedOn || article.publishedOn,
    mainEntityOfPage: absoluteUrl(`/resources/${article.slug}`),
    author: { '@id': orgId() },
    publisher: { '@id': orgId() },
    image: absoluteUrl(company.defaultOgImage),
    inLanguage: 'en-US'
  }
}

/** FAQPage markup is kept accurate, but rich results are not expected or promised. */
export function faqSchema(items: FaqItem[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.map(stripInlineLinks).join(' ') }
    }))
  }
}

/** Render a @graph JSON-LD script into the page head. */
export function useJsonLd(nodes: Json[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'jsonld-page',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
      }
    ]
  })
}
