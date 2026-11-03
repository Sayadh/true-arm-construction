/**
 * Prerendered into /robots.txt.
 * Non-production builds block all crawlers so staging copies never get indexed.
 */
export default defineEventHandler((event) => {
  const c = useRuntimeConfig().public
  const base = String(c.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  if (c.siteEnv !== 'production') {
    return 'User-agent: *\nDisallow: /\n'
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
})
