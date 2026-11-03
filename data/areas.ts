import type { ServiceArea } from '../types'

/**
 * Service areas. Only Sacramento is confirmed.
 * Enable another city only after the company confirms it serves that area.
 * Enabling a city lists it on /service-areas; it does NOT create a separate page
 * (city landing pages need unique, location-specific content first).
 */
export const serviceAreas: ServiceArea[] = [
  { slug: 'sacramento', name: 'Sacramento', county: 'Sacramento County', enabled: true, primary: true },
  { slug: 'elk-grove', name: 'Elk Grove', county: 'Sacramento County', enabled: false },
  { slug: 'roseville', name: 'Roseville', county: 'Placer County', enabled: false },
  { slug: 'folsom', name: 'Folsom', county: 'Sacramento County', enabled: false },
  { slug: 'citrus-heights', name: 'Citrus Heights', county: 'Sacramento County', enabled: false },
  { slug: 'rancho-cordova', name: 'Rancho Cordova', county: 'Sacramento County', enabled: false },
  { slug: 'west-sacramento', name: 'West Sacramento', county: 'Yolo County', enabled: false },
  { slug: 'carmichael', name: 'Carmichael', county: 'Sacramento County', enabled: false }
]

export const enabledAreas = serviceAreas.filter((a) => a.enabled)
