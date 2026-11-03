import type { Project, ProjectCategory } from '../types'

export const projectCategories: ProjectCategory[] = [
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'bathroom', name: 'Bathroom' },
  { id: 'remodeling', name: 'Home remodeling' },
  { id: 'room-addition', name: 'Room addition' },
  { id: 'flooring', name: 'Flooring' },
  { id: 'tile', name: 'Tile' },
  { id: 'interior-painting', name: 'Interior painting' },
  { id: 'exterior-painting', name: 'Exterior painting' },
  { id: 'fence', name: 'Fences & gates' },
  { id: 'repairs', name: 'Repairs' }
]

/**
 * REAL PROJECTS ONLY.
 * Add a project once the client supplies original photos and approves publishing.
 * Put photos in /public/images/projects/<slug>/ and set `published: true`.
 * Each published project automatically gets a statically generated page and a sitemap entry.
 *
 * Example shape (do not publish until real):
 *
 * {
 *   slug: 'midtown-primary-bathroom',
 *   title: 'Primary bathroom remodel',
 *   published: true,
 *   category: 'bathroom',
 *   services: ['bathroom-remodeling', 'tile-installation'],
 *   propertyType: 'Residential',
 *   location: 'Sacramento, CA',            // only if the client approves
 *   summary: 'Tub replaced with a walk-in tile shower and new vanity.',
 *   description: ['...'],
 *   cover: { src: '/images/projects/midtown-primary-bathroom/cover.jpg', alt: '...', width: 1600, height: 1200 },
 *   gallery: [ { src: '...', alt: '...' } ],
 *   beforeAfter: [ { before: { src: '...', alt: '...' }, after: { src: '...', alt: '...' } } ],
 *   materials: ['Porcelain tile'],
 *   featured: true
 * }
 */
export const projects: Project[] = []

export const publishedProjects = projects.filter((p) => p.published)

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug)
}

export function projectsForService(serviceSlug: string, limit = 3): Project[] {
  return publishedProjects.filter((p) => p.services.includes(serviceSlug)).slice(0, limit)
}

export function categoryName(id: string): string {
  return projectCategories.find((c) => c.id === id)?.name ?? id
}
