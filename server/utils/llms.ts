import { company, formatPhone, licenseLabel } from '../../data/company'
import { enabledServices, serviceGroups, servicesByGroup } from '../../data/services'
import { areaPages, enabledAreas, areaNames } from '../../data/areas'
import { faqs, faqCategories } from '../../data/faqs'
import { reviewPlatforms, reviewTotals } from '../../data/reviews'
import { publishedResources } from '../../data/resources'

/**
 * Plain-text files for AI assistants and LLM crawlers (llms.txt convention).
 * Generated from the same data files as the site, so they never drift from the pages.
 * Only confirmed facts are included.
 */

const md = (s: string) => s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => `[${label}](${href})`)
const absLinks = (s: string, base: string) => md(s).replace(/\]\((\/[^)\s]*)\)/g, (_m, p: string) => `](${base}${p})`)

function facts(base: string): string[] {
  const lines = [
    `- Business: ${company.name}, a licensed general contractor`,
    `- License: ${licenseLabel} (${company.license.classificationName}), issued by the ${company.license.authority}. Verify: ${company.license.verifyUrl}`,
    `- Service area: ${enabledAreas.map((a) => `${a.name}, ${company.primaryArea.regionCode} (${a.county})`).join('; ')}`,
    `- Property types: ${[company.confirmedFacts.residential && 'residential', company.confirmedFacts.commercial && 'commercial'].filter(Boolean).join(' and ')}`,
    company.confirmedFacts.freeEstimates ? `- Estimates: free, project-specific. Request one at ${base}/free-estimate` : ''
  ]
  if (company.phone) lines.push(`- Phone (calls and texts): ${formatPhone(company.phone)}`)
  if (company.textPhone) lines.push(`- Phone (texts only): ${formatPhone(company.textPhone)}`)
  if (company.email) lines.push(`- Email: ${company.email}`)
  if (company.hours?.length) lines.push(`- Hours: ${company.hours.map((h) => `${h.days} ${h.hours}`).join('; ')}`)
  if (reviewTotals.average) {
    lines.push(
      `- Reviews: ${reviewTotals.average.toFixed(1)} average from ${reviewTotals.count} reviews (${reviewPlatforms.map((p) => `${p.name} ${p.rating.toFixed(1)} from ${p.reviewCount}`).join(', ')}), as listed on those platforms. Details: ${base}/reviews`
    )
  }
  const social = [company.social.google && `Google Business Profile: ${company.social.google}`, company.social.facebook && `Facebook: ${company.social.facebook}`, company.social.instagram && `Instagram: ${company.social.instagram}`].filter(Boolean)
  if (social.length) lines.push(`- Profiles: ${social.join('; ')}`)
  lines.push('- Not offered: siding and new home construction')
  return lines.filter(Boolean)
}

export function llmsTxt(base: string): string {
  const out: string[] = [
    `# ${company.name}`,
    '',
    `> ${company.name} is a licensed Class B general contractor (CA License #${company.license.number}) serving ${areaNames()}, California. It remodels kitchens and bathrooms, builds room additions, installs flooring and tile, paints interiors and exteriors, builds and repairs fences and gates, replaces and repairs windows, builds gazebos, and handles drywall, dry rot, and handyman repairs for residential and commercial properties. Estimates are free.`,
    '',
    '## Key facts',
    ...facts(base),
    '',
    '## Services'
  ]
  for (const g of serviceGroups) {
    for (const s of servicesByGroup(g.id)) out.push(`- [${s.name}](${base}/services/${s.slug}): ${s.metaDescription}`)
  }
  out.push('', '## Service areas')
  for (const a of areaPages) out.push(`- [${a.name}, ${company.primaryArea.regionCode}](${base}/service-areas/${a.slug}): ${a.page!.metaDescription}`)
  out.push(
    '',
    '## Company',
    `- [About](${base}/about): who we are and how we work`,
    `- [Licenses & certifications](${base}/licenses-certifications): contractor license details and how to verify them`,
    `- [Reviews](${base}/reviews): ratings on Google, Thumbtack, Yelp, and Facebook with links to every review`,
    `- [Free estimate](${base}/free-estimate): project planner for estimate requests`,
    `- [Contact](${base}/contact): phone, text, and social profiles`,
    '',
    '## Answers',
    `- [FAQ](${base}/faq): permits, costs, timelines, contracts, and estimates in Sacramento`
  )
  for (const r of publishedResources) out.push(`- [${r.title}](${base}/resources/${r.slug}): ${r.description}`)
  out.push('', '## Optional', `- [Full text for AI assistants](${base}/llms-full.txt): every service, area, and FAQ answer in one file`, `- [Sitemap](${base}/sitemap.xml): all indexable pages`, '')
  return out.join('\n')
}

export function llmsFullTxt(base: string): string {
  const out: string[] = [
    `# ${company.name} — full reference`,
    '',
    `> Complete, plain-text reference for AI assistants. Source: ${base}. Generated from the website content; when facts differ, the live page wins.`,
    '',
    '## Key facts',
    ...facts(base),
    ''
  ]
  for (const s of enabledServices) {
    out.push(`## ${s.name}`, '', `URL: ${base}/services/${s.slug}`, '', ...s.intro.map((p) => absLinks(p, base)), '')
    if (s.scope.length) out.push('What is included:', ...s.scope.map((i) => `- ${i.title}: ${i.text}`), '')
    if (s.costFactors.length) out.push('What affects the cost:', ...s.costFactors.map((c) => `- ${c}`), '')
  }
  for (const a of areaPages) {
    const p = a.page!
    out.push(`## Service area: ${a.name}, ${company.primaryArea.regionCode}`, '', `URL: ${base}/service-areas/${a.slug}`, '', ...p.intro.map((x) => absLinks(x, base)), '')
    out.push(`Building permits: ${p.permits.authority} (${p.permits.url}). ${p.permits.text}`, '')
    out.push(...p.localNotes.map((n) => `- ${n.title}: ${n.text}`), '')
    for (const f of p.faqs) out.push(`### ${f.question}`, '', ...f.answer.map((x) => absLinks(x, base)), '')
  }
  out.push('## Frequently asked questions', '')
  for (const c of faqCategories) {
    const items = faqs.filter((f) => f.category === c.id)
    if (!items.length) continue
    out.push(`### ${c.name}`, '')
    for (const f of items) out.push(`**${f.question}**`, '', ...f.answer.map((x) => absLinks(x, base)), '')
  }
  return out.join('\n')
}
