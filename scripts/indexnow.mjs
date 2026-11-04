#!/usr/bin/env node
/**
 * Tells Bing (and the other IndexNow engines: Yandex, Seznam, Naver; Bing also feeds ChatGPT search and Copilot)
 * that pages changed, so they are recrawled within hours instead of weeks. Google does not use IndexNow:
 * for Google, submit the sitemap in Search Console.
 *
 *   npm run indexnow                 → every URL in the live sitemap
 *   npm run indexnow -- /services/x  → only the given paths
 *
 * Run it AFTER a production deploy is live. The key file public/54028431f3ae4576c07a6abc464b024b.txt must stay deployed.
 */
const KEY = '54028431f3ae4576c07a6abc464b024b'
const SITE = (process.env.NUXT_PUBLIC_SITE_URL || 'https://truearmconstruction.com').replace(/\/$/, '')
const host = new URL(SITE).host

const paths = process.argv.slice(2)
let urlList
if (paths.length) {
  urlList = paths.map((p) => SITE + (p.startsWith('/') ? p : '/' + p))
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text()
  urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
}
if (!urlList.length) {
  console.error('No URLs found. Is the site live with NUXT_PUBLIC_SITE_ENV=production?')
  process.exit(1)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList })
})
// 200 = accepted, 202 = accepted (key check pending). Anything else is an error.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URL(s)`)
if (res.status >= 300) process.exit(1)
