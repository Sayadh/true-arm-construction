import type { WorkMedia } from '../types'
import { workMedia as generated } from './work-media'
import { getService } from './services'

/**
 * Photos and videos of completed work.
 * `data/work-media.ts` is written by `npm run media:import` (see docs/ASSETS.md);
 * edit alt text and captions there — re-running the import keeps your edits.
 */
export const workMedia: WorkMedia[] = generated.filter((m) => getService(m.service)?.enabled)

export const mediaForService = (slug: string) => sortFeatured(workMedia.filter((m) => m.service === slug))

/** Mixed order across services: each service's best item first, then the rest round-robin — for the homepage and /projects. */
export const featuredWork = (limit = Infinity) => {
  const queues = new Map<string, WorkMedia[]>()
  for (const m of sortFeatured(workMedia)) queues.set(m.service, [...(queues.get(m.service) ?? []), m])
  const out: WorkMedia[] = []
  while (out.length < limit && [...queues.values()].some((q) => q.length)) {
    for (const q of queues.values()) {
      const m = q.shift()
      if (m && out.length < limit) out.push(m)
    }
  }
  return out
}

/** Image to use as a cover (service hero, cards) */
export const coverImage = (m: WorkMedia) => (m.kind === 'photo' ? m.image : m.kind === 'video' ? m.poster : m.after)

export const serviceCover = (slug: string) => {
  const chosen = getService(slug)?.coverMedia
  const picked = chosen ? workMedia.find((m) => m.id === chosen) : undefined
  if (picked) return coverImage(picked)
  const first = mediaForService(slug).find((m) => m.kind !== 'video') ?? mediaForService(slug)[0]
  return first ? coverImage(first) : null
}

export const servicesWithWork = () => [...new Set(workMedia.map((m) => m.service))]

function sortFeatured(list: WorkMedia[]) {
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
}
