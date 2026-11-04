#!/usr/bin/env node
/**
 * Imports work photos and videos into the site.
 *
 *   npm run media:import -- <inbox folder>
 *
 * Inbox layout: one sub-folder per service slug (kitchen-remodeling, fences-gates, ...).
 *   - Photos: jpg, jpeg, png, webp, heic/heif (HEIC needs ffmpeg)
 *   - Videos: mp4, mov, m4v, webm (needs ffmpeg)
 *   - Before/after pairs: same name ending in -before / -after (oak-st-before.jpg + oak-st-after.jpg)
 *   - A name starting with "1-" marks the item as featured (shown first, eligible for the homepage)
 *
 * Output:
 *   public/images/work/<service>/<id>.jpg   (max 2400 px, EXIF/GPS removed, orientation fixed)
 *   public/videos/work/<service>/<id>.mp4   (H.264, max 1280 px wide, no audio, < 12 MB) + poster .jpg
 *   data/work-media.ts                      (merged: existing alt text and captions are kept)
 */
import { readdir, mkdir, stat, readFile, writeFile, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, basename, dirname, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const inbox = resolve(process.argv[2] || join(root, 'media-inbox'))
const DATA = join(root, 'data/work-media.ts')
const MAX_IMG = 2400
const MAX_VIDEO_BYTES = 12 * 1024 * 1024 // keeps mobile playback light; Cloudflare static assets limit is 25 MiB per file

const PHOTO = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'])
const VIDEO = new Set(['.mp4', '.mov', '.m4v', '.webm'])

const servicesSrc = await readFile(join(root, 'data/services.ts'), 'utf8')
const serviceNames = Object.fromEntries([...servicesSrc.matchAll(/slug: '([^']+)',\s*\n\s*name: '([^']+)'/g)].map((m) => [m[1], m[2]]))

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'item'

const ffmpeg = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'ignore', 'inherit'] })

async function toJpeg(input, output) {
  let src = input
  const ext = extname(input).toLowerCase()
  if (ext === '.heic' || ext === '.heif') {
    src = join(tmpdir(), `${basename(input)}.png`)
    ffmpeg(['-i', input, '-frames:v', '1', src])
  }
  await mkdir(dirname(output), { recursive: true })
  const info = await sharp(src)
    .rotate()
    .resize({ width: MAX_IMG, height: MAX_IMG, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output)
  if (src !== input) await rm(src, { force: true })
  return { width: info.width, height: info.height }
}

async function toVideo(input, output, poster) {
  await mkdir(dirname(output), { recursive: true })
  let crf = 26
  for (;;) {
    ffmpeg(['-i', input, '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', output])
    if ((await stat(output)).size <= MAX_VIDEO_BYTES || crf >= 36) break
    crf += 3
  }
  const frame = join(tmpdir(), `${basename(output)}.png`)
  ffmpeg(['-ss', '1', '-i', output, '-frames:v', '1', frame])
  const dims = await toJpeg(frame, poster)
  await rm(frame, { force: true })
  const duration = Number(
    execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', output]).toString().trim()
  )
  return { ...dims, duration: Math.round(duration) }
}

/** Existing entries keyed by id, so hand-written alt text and captions survive a re-import. */
async function loadExisting() {
  if (!existsSync(DATA)) return new Map()
  const src = await readFile(DATA, 'utf8')
  const json = src.slice(src.indexOf('= ') + 2).trim().replace(/;$/, '')
  try {
    return new Map(JSON.parse(json).map((m) => [m.id, m]))
  } catch {
    return new Map()
  }
}

const existing = await loadExisting()
const out = new Map(existing)
let added = 0

for (const service of (await readdir(inbox, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  if (!serviceNames[service]) {
    console.warn(`! Skipping "${service}": not a service slug`)
    continue
  }
  const label = serviceNames[service]
  const files = (await readdir(join(inbox, service))).filter((f) => !f.startsWith('.')).sort()
  const pairs = new Map()
  for (const f of files) {
    const ext = extname(f).toLowerCase()
    const stem = basename(f, extname(f))
    const featured = /^1[-_ ]/.test(stem)
    const m = stem.match(/^(.*?)[-_ ](before|after)$/i)
    if (m && PHOTO.has(ext)) {
      const key = slugify(m[1])
      const p = pairs.get(key) ?? { featured: false }
      p[m[2].toLowerCase()] = f
      p.featured ||= featured
      pairs.set(key, p)
      continue
    }
    const id = `${service}-${slugify(stem.replace(/^1[-_ ]/, ''))}`
    if (out.has(id) && existing.has(id)) continue // already imported
    if (PHOTO.has(ext)) {
      const src = `/images/work/${service}/${id.slice(service.length + 1)}.jpg`
      const dims = await toJpeg(join(inbox, service, f), join(root, 'public', src))
      out.set(id, { kind: 'photo', id, service, featured, image: { src, alt: `${label} project by True Arm Construction`, ...dims } })
      added++
    } else if (VIDEO.has(ext)) {
      const name = id.slice(service.length + 1)
      const src = `/videos/work/${service}/${name}.mp4`
      const posterSrc = `/videos/work/${service}/${name}-poster.jpg`
      const meta = await toVideo(join(inbox, service, f), join(root, 'public', src), join(root, 'public', posterSrc))
      out.set(id, {
        kind: 'video', id, service, featured, src, duration: meta.duration,
        poster: { src: posterSrc, alt: `${label} project video by True Arm Construction`, width: meta.width, height: meta.height }
      })
      added++
    } else {
      console.warn(`! Skipping unsupported file ${service}/${f}`)
    }
  }
  for (const [key, p] of pairs) {
    const id = `${service}-${key.replace(/^1-/, '')}`
    if (!p.before || !p.after) {
      console.warn(`! ${service}/${key}: needs both -before and -after files`)
      continue
    }
    if (existing.has(id)) continue
    const base = `/images/work/${service}/${id.slice(service.length + 1)}`
    const b = await toJpeg(join(inbox, service, p.before), join(root, 'public', `${base}-before.jpg`))
    const a = await toJpeg(join(inbox, service, p.after), join(root, 'public', `${base}-after.jpg`))
    out.set(id, {
      kind: 'beforeAfter', id, service, featured: p.featured,
      before: { src: `${base}-before.jpg`, alt: `${label}: before`, ...b },
      after: { src: `${base}-after.jpg`, alt: `${label}: after, completed by True Arm Construction`, ...a }
    })
    added++
  }
}

const list = [...out.values()].map((m) => {
  if (!m.featured) delete m.featured
  return m
})
await writeFile(
  DATA,
  `import type { WorkMedia } from '../types'\n\n// Generated by \`npm run media:import\`. Alt text and captions may be edited by hand (keep valid JSON); they are kept on re-import.\nexport const workMedia: WorkMedia[] = ${JSON.stringify(list, null, 2)}\n`
)
console.log(`✓ ${added} new item(s), ${list.length} total → data/work-media.ts`)
