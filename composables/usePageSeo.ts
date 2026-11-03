import { company } from '~/data/company'

export interface PageSeoInput {
  title: string
  description: string
  /** Path without domain, e.g. "/services/tile-installation" */
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** Use the title as-is instead of appending the brand */
  absoluteTitle?: boolean
}

/** Joins the configured site URL and a path into a canonical absolute URL (no trailing slash). */
export function absoluteUrl(path: string): string {
  const base = useRuntimeConfig().public.siteUrl as string
  if (/^https?:\/\//.test(path)) return path
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  return `${base}${clean.startsWith('/') || clean === '' ? clean : `/${clean}`}`
}

/**
 * One call per page: title, description, canonical, Open Graph, Twitter, robots.
 */
export function usePageSeo(input: PageSeoInput) {
  const fullTitle = input.absoluteTitle || input.title.includes(company.name)
    ? input.title
    : `${input.title} | ${company.name}`
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image || company.defaultOgImage)
  const isProd = useRuntimeConfig().public.siteEnv === 'production'
  const robots = input.noindex || !isProd ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

  useSeoMeta({
    title: fullTitle,
    description: input.description,
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogUrl: url,
    ogType: input.type || 'website',
    ogSiteName: company.name,
    ogLocale: 'en_US',
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: company.name,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: image,
    robots
  })

  useHead({
    link: [{ rel: 'canonical', href: url }]
  })

  return { url, fullTitle }
}
