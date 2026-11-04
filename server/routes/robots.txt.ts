/**
 * Prerendered into /robots.txt.
 * Non-production builds block all crawlers so staging copies never get indexed.
 */
export default defineEventHandler((event) => {
  const c = useRuntimeConfig().public
  const base = String(c.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  if (c.siteMode !== 'production') {
    return 'User-agent: *\nDisallow: /\n'
  }
  // AI search and assistant crawlers are welcome: they can cite the business in answers.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot']
  // Internal shells only: the SPA fallback (200.html) and the raw error page (404.html). Everything public,
  // including /_nuxt/ assets and /_ipx/ images that Google needs to render pages, stays crawlable.
  // A bot with its own group ignores the `*` group, so every group repeats the same rules.
  const rules = ['Allow: /', 'Disallow: /200.html', 'Disallow: /404.html']
  return [
    'User-agent: *',
    ...rules,
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, ...rules, '']),
    `# Plain-text summaries for AI assistants: ${base}/llms.txt and ${base}/llms-full.txt`,
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n')
})
