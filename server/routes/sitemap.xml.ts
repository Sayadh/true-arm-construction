import { enabledServices } from '../../data/services'
import { publishedProjects } from '../../data/projects'
import { publishedResources } from '../../data/resources'

/** Prerendered at build time into /sitemap.xml. Only real, indexable routes. */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  const staticRoutes = [
    '/',
    '/services',
    '/about',
    '/licenses-certifications',
    '/service-areas',
    '/faq',
    '/resources',
    '/contact',
    '/free-estimate',
    '/privacy-policy'
  ]
  if (publishedProjects.length) staticRoutes.splice(2, 0, '/projects')
  const routes: { path: string; lastmod?: string }[] = [
    ...staticRoutes.map((p) => ({ path: p })),
    ...enabledServices.map((s) => ({ path: `/services/${s.slug}` })),
    ...publishedProjects.map((p) => ({ path: `/projects/${p.slug}`, lastmod: p.completedOn })),
    ...publishedResources.map((r) => ({ path: `/resources/${r.slug}`, lastmod: r.updatedOn || r.publishedOn }))
  ]

  const body = routes
    .map((r) => {
      const loc = `${base}${r.path === '/' ? '/' : r.path}`
      const lastmod = r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''
      return `  <url><loc>${loc}</loc>${lastmod}</url>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
