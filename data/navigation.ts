import type { NavLink } from '../types'

export const primaryNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our Projects', to: '/projects' },
  { label: 'About Us', to: '/about' },
  { label: 'Licenses & Certifications', to: '/licenses-certifications' },
  { label: 'Service Areas', to: '/service-areas' },
  { label: 'Resources / FAQ', to: '/resources' },
  { label: 'Contact', to: '/contact' }
]

export const estimatePath = '/free-estimate'

/** Extra links shown inside the services menu for the construction group */
export const constructionMenuExtras: NavLink[] = [
  { label: 'Residential construction', to: '/services/new-construction#residential' },
  { label: 'Commercial construction', to: '/services/new-construction#commercial' }
]
