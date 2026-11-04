import type { ReviewPlatform, Testimonial } from '../types'

/**
 * ============================================================
 *  REVIEWS — ratings from third-party platforms
 * ============================================================
 *  Copy rating and count exactly as each platform shows them and update
 *  `checkedOn`. Never round up, combine with private feedback, or invent reviews.
 *  A platform is hidden when its entry is removed.
 */
export const reviewPlatforms: ReviewPlatform[] = [
  {
    id: 'google',
    name: 'Google',
    rating: 5,
    reviewCount: 25,
    url: 'https://www.google.com/maps/place/True+Arm+Construction/@38.5616433,-121.626548,11z/data=!4m16!1m9!3m8!1s0xa42cf46361bfcdc7:0x30bd67b821a70632!2sTrue+Arm+Construction!8m2!3d38.5617588!4d-121.461739!9m1!1b1!16s%2Fg%2F11p2k642rv!3m5!1s0xa42cf46361bfcdc7:0x30bd67b821a70632!8m2!3d38.5617588!4d-121.461739!16s%2Fg%2F11p2k642rv',
    checkedOn: '2026-11-04'
  },
  {
    id: 'thumbtack',
    name: 'Thumbtack',
    rating: 4.8,
    reviewCount: 46,
    url: 'https://www.thumbtack.com/ca/sacramento/interior-painting/true-arm-construction/service/489100359796146179',
    checkedOn: '2026-11-04'
  },
  {
    id: 'yelp',
    name: 'Yelp',
    rating: 4.8,
    reviewCount: 12,
    // TODO(client): confirm this is the exact Yelp business URL
    url: 'https://www.yelp.com/biz/true-arm-construction-sacramento',
    checkedOn: '2026-11-04'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    rating: 5,
    reviewCount: 15,
    url: 'https://www.facebook.com/p/True-Arm-Construction-61567774326514/',
    checkedOn: '2026-11-04'
  }
]

/**
 * Real customer reviews, copied word for word (fix nothing but obvious typos).
 * Use first name + last initial only. Leave empty until real reviews are added:
 * the review cards are hidden when this list is empty.
 *
 * Example:
 * { quote: '…', author: 'Maria G.', platform: 'thumbtack', rating: 5, date: '2026-09', service: 'interior-painting', featured: true }
 */
export const testimonials: Testimonial[] = []

/** Totals across all listed platforms (review-count weighted average). */
export const reviewTotals = (() => {
  const count = reviewPlatforms.reduce((n, p) => n + p.reviewCount, 0)
  const sum = reviewPlatforms.reduce((n, p) => n + p.rating * p.reviewCount, 0)
  return { count, average: count ? sum / count : null }
})()

export const featuredTestimonials = () => {
  const featured = testimonials.filter((t) => t.featured)
  return (featured.length ? featured : testimonials).slice(0, 3)
}

export const platformName = (id: string) => reviewPlatforms.find((p) => p.id === id)?.name ?? id

/** "November 2026" from a YYYY-MM-DD checkedOn date */
export const checkedLabel = () => {
  const latest = reviewPlatforms.map((p) => p.checkedOn).sort().at(-1)
  return latest ? new Date(`${latest}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''
}
