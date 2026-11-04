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
  // AI search and assistant crawlers are welcome: they can cite the business in answers.
  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot']
  return [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),
    `# Plain-text summaries for AI assistants: ${base}/llms.txt and ${base}/llms-full.txt`,
    `Sitemap: ${base}/sitemap.xml`,
    ''
  ].join('\n')
})
