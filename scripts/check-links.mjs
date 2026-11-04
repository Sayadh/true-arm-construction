#!/usr/bin/env node
/**
 * Verifies the generated static site in .output/public:
 *  - every internal <a href> resolves to a generated page or file
 *  - every page has exactly one <h1>, a <title>, a meta description, and a canonical link
 *  - no duplicate titles or descriptions across indexable pages
 * Run after `npm run generate`:  npm run check:links
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(process.cwd(), '.output/public')
if (!existsSync(root)) {
  console.error('Missing .output/public. Run `npm run generate` first.')
  process.exit(1)
}

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const pages = walk(root).filter((f) => f.endsWith('.html') && !/\/(200|404)\.html$/.test(f))
const routeOf = (file) => '/' + relative(root, file).replace(/index\.html$/, '').replace(/\/$/, '').replace(/\.html$/, '')

function resolves(href) {
  const clean = href.split('#')[0].split('?')[0]
  if (clean === '' || clean === '/') return existsSync(join(root, 'index.html'))
  const p = join(root, clean)
  return existsSync(p) && statSync(p).isFile()
    ? true
    : existsSync(join(p, 'index.html')) || existsSync(`${p}.html`)
}

const problems = []
const titles = new Map()
const descs = new Map()

for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  const route = routeOf(file).replace(/^\/$/, '/') || '/'
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
  const noindex = /<meta name="robots" content="noindex/.test(html)

  if (h1 !== 1) problems.push(`${route}: expected 1 <h1>, found ${h1}`)
  if (!title) problems.push(`${route}: missing <title>`)
  if (!desc) problems.push(`${route}: missing meta description`)
  if (!canonical) problems.push(`${route}: missing canonical`)
  if (!noindex || process.env.NUXT_PUBLIC_SITE_ENV !== 'production') {
    if (title) titles.set(title, [...(titles.get(title) || []), route])
    if (desc) descs.set(desc, [...(descs.get(desc) || []), route])
  }

  for (const [, href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|sms:|#)/.test(href)) continue
    if (!resolves(href)) problems.push(`${route}: broken internal link -> ${href}`)
  }
}

for (const [t, r] of titles) if (r.length > 1) problems.push(`Duplicate title "${t}" on ${r.join(', ')}`)
for (const [d, r] of descs) if (r.length > 1) problems.push(`Duplicate description on ${r.join(', ')}`)

console.log(`Checked ${pages.length} pages.`)
if (problems.length) {
  console.error(problems.map((p) => `  ✗ ${p}`).join('\n'))
  process.exit(1)
}
console.log('  ✓ No broken internal links, H1/title/description/canonical present and unique.')
