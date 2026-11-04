import { enabledServices } from '../../data/services'
import { publishedProjects } from '../../data/projects'
import { publishedResources } from '../../data/resources'
import { areaPages } from '../../data/areas'
import { workMedia, mediaForService, coverImage } from '../../data/work'
import type { WorkMedia } from '../../types'

/** Prerendered at build time into /sitemap.xml. Only real, indexable routes. */
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')
  const staticRoutes = [
    '/',
    '/services',
    '/reviews',
    '/about',
    '/licenses-certifications',
    '/service-areas',
    '/faq',
    '/resources',
    '/contact',
    '/free-estimate',
    '/privacy-policy'
  ]
  // /projects is indexable once it has projects or work photos/videos (same rule as the page's noindex)
  if (publishedProjects.length || workMedia.length) staticRoutes.splice(2, 0, '/projects')
  const routes: { path: string; lastmod?: string; images?: { loc: string; title: string }[] }[] = [
    ...staticRoutes.map((p) => ({ path: p })),
    ...areaPages.map((a) => ({ path: `/service-areas/${a.slug}` })),
    ...enabledServices.map((s) => ({ path: `/services/${s.slug}`, images: mediaForService(s.slug).flatMap(imagesOf) })),
    ...publishedProjects.map((p) => ({ path: `/projects/${p.slug}`, lastmod: p.completedOn })),
    ...publishedResources.map((r) => ({ path: `/resources/${r.slug}`, lastmod: r.updatedOn || r.publishedOn }))
  ]

  const projects = routes.find((r) => r.path === '/projects')
  if (projects) projects.images = workMedia.flatMap(imagesOf)

  const body = routes
    .map((r) => {
      const loc = `${base}${r.path === '/' ? '/' : r.path}`
      const lastmod = r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''
      const imgs = (r.images ?? [])
        .map((i) => `<image:image><image:loc>${xml(base + i.loc)}</image:loc></image:image>`)
        .join('')
      return `  <url><loc>${loc}</loc>${lastmod}${imgs}</url>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`
})

/** Photos (both halves of a before/after pair) and video posters of our own work, for Google Images */
function imagesOf(m: WorkMedia) {
  const list = m.kind === 'beforeAfter' ? [m.before, m.after] : [coverImage(m)]
  return list.map((i) => ({ loc: i.src, title: i.alt }))
}

const xml = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
