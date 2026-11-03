import { company } from '~/data/company'
import { enabledAreas } from '~/data/areas'
import type { FaqItem, ResourceArticle, Service } from '~/types'

/**
 * JSON-LD builders. Every value comes from verified central data.
 * No ratings, reviews, or invented addresses are ever emitted.
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
    areaServed: enabledAreas.map((a) => ({
      '@type': 'City',
      name: `${a.name}, ${company.primaryArea.regionCode}`
    })),
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
  if (company.email) node.email = company.email
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
  }
  return node
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
    areaServed: enabledAreas.map((a) => ({ '@type': 'City', name: `${a.name}, ${company.primaryArea.regionCode}` }))
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
