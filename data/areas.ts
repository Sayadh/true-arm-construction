import type { ServiceArea } from '../types'

/**
 * Service areas confirmed by the company: Sacramento, West Sacramento, Carmichael.
 * Each enabled area with `page` gets its own landing page at /service-areas/<slug>.
 * Keep the content specific and factual — city pages that only swap the city name
 * are treated by Google as doorway pages.
 */
const CITY_SAC_BUILDING = 'https://www.cityofsacramento.gov/community-development/building'
const WEST_SAC_BUILDING = 'https://www.cityofwestsacramento.org/government/departments/community-development/building-division'
const COUNTY_BUILDING = 'https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html'

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'sacramento',
    name: 'Sacramento',
    county: 'Sacramento County',
    enabled: true,
    primary: true,
    page: {
      seoTitle: 'Sacramento, CA Remodeling & Repair Contractor | True Arm Construction',
      metaDescription:
        'Licensed Class B general contractor in Sacramento, CA. Kitchen and bathroom remodeling, room additions, flooring, painting, fences, and repairs. Free estimates.',
      intro: [
        'Sacramento is our home base. We remodel kitchens and bathrooms, build room additions, install flooring and tile, paint inside and out, build and repair fences, and take care of the repairs that older and newer homes both need.',
        'Every project starts with a free, project-specific estimate. We look at the property, talk through what you want to change, and explain what is included before any work is scheduled.'
      ],
      permits: {
        authority: 'City of Sacramento, Community Development Department — Building Division',
        url: CITY_SAC_BUILDING,
        text: 'Properties inside Sacramento city limits are permitted by the City of Sacramento. Addresses with a Sacramento mailing address can still be in unincorporated Sacramento County, which has its own permit office, so we confirm the jurisdiction for your address before planning permit work.'
      },
      localNotes: [
        {
          title: 'Older homes, older materials',
          text: 'Many houses in established neighborhoods were built before 1978, when lead-based paint was still in use. Painting, sanding, and demolition in these homes call for lead-safe work practices.'
        },
        {
          title: 'Summer heat and exterior work',
          text: 'Sacramento summers are hot and dry. Exterior painting is usually scheduled for spring and fall, or for the cooler part of the day in summer, so coatings cure properly.'
        },
        {
          title: 'Wood exposed to sun and sprinklers',
          text: 'Fences, trim, and siding boards that get afternoon sun and regular sprinkler spray are where dry rot most often starts. We check these areas during estimates for painting and fence work.'
        }
      ],
      neighborhoods: ['East Sacramento', 'Land Park', 'Curtis Park', 'Midtown', 'Natomas', 'Pocket', 'Greenhaven', 'Tahoe Park', 'Oak Park', 'South Sacramento'],
      faqs: [
        {
          question: 'Do I need a permit for a kitchen or bathroom remodel in Sacramento?',
          answer: [
            `Cosmetic updates such as paint or replacing a countertop often do not need one. Moving plumbing, adding or changing electrical circuits, or removing walls generally does. For addresses inside city limits, the [City of Sacramento Building Division](${CITY_SAC_BUILDING}) is the official source; we review permit needs for your scope during the estimate.`
          ]
        },
        {
          question: 'How do I know if my Sacramento address is in the city or the county?',
          answer: [
            'A Sacramento mailing address does not always mean the property is inside city limits. The City of Sacramento and Sacramento County each provide address lookups, and we confirm the jurisdiction for your address before planning any permit work.'
          ]
        }
      ]
    }
  },
  {
    slug: 'west-sacramento',
    name: 'West Sacramento',
    county: 'Yolo County',
    enabled: true,
    page: {
      seoTitle: 'Remodeling Contractor in West Sacramento, CA | True Arm Construction',
      metaDescription:
        'Kitchen and bathroom remodeling, flooring, painting, fences, and repairs in West Sacramento, CA. Licensed Class B general contractor. Free estimates.',
      intro: [
        'West Sacramento is a separate city across the river, in Yolo County. We work on homes and commercial properties there, from single-room updates to full remodels and room additions.',
        'The process is the same as in Sacramento: a free estimate based on your property and your scope, with permit needs reviewed before work is scheduled.'
      ],
      permits: {
        authority: 'City of West Sacramento, Community Development — Building Division',
        url: WEST_SAC_BUILDING,
        text: 'West Sacramento issues its own building permits; they are not handled by the City of Sacramento or Sacramento County. The Building Division publishes submittal checklists for residential projects, including kitchen and bathroom remodels.'
      },
      localNotes: [
        {
          title: 'A mix of older and newer neighborhoods',
          text: 'Older areas such as Broderick and Bryte sit alongside newer developments in Southport. Older homes often need more preparation and repair before finishes; newer homes are usually about layout and finish updates.'
        },
        {
          title: 'Same Sacramento Valley climate',
          text: 'Hot, dry summers mean exterior painting and coatings are best planned for spring and fall, and wood exposed to sun and sprinklers deserves a close look for dry rot.'
        }
      ],
      neighborhoods: ['Broderick', 'Bryte', 'Southport', 'Bridgeway Island', 'The Rivers'],
      faqs: [
        {
          question: 'Who issues building permits in West Sacramento?',
          answer: [
            `The [City of West Sacramento Building Division](${WEST_SAC_BUILDING}). West Sacramento is in Yolo County and is a separate city from Sacramento, so its permits, checklists, and inspections are its own.`
          ]
        },
        {
          question: 'Do you charge more for projects in West Sacramento?',
          answer: [
            'Estimates are based on the scope of work, materials, and site conditions, not on which side of the river the property is on. Every estimate is free.'
          ]
        }
      ]
    }
  },
  {
    slug: 'carmichael',
    name: 'Carmichael',
    county: 'Sacramento County',
    enabled: true,
    page: {
      seoTitle: 'Remodeling Contractor in Carmichael, CA | True Arm Construction',
      metaDescription:
        'Kitchen and bathroom remodeling, room additions, flooring, painting, fences, and repairs in Carmichael, CA. Licensed Class B general contractor. Free estimates.',
      intro: [
        'Carmichael is an established community in unincorporated Sacramento County, known for larger lots and mature trees. We remodel, add on to, repair, and refinish homes there.',
        'Every project starts with a free estimate based on your property, including a look at anything on the lot that affects how the work is planned.'
      ],
      permits: {
        authority: 'Sacramento County, Building Permits & Inspection',
        url: COUNTY_BUILDING,
        text: 'Carmichael is not an incorporated city, so building permits are issued by Sacramento County, not by a city office. Tree-related approvals follow a separate county process.'
      },
      localNotes: [
        {
          title: 'Mature oaks on many lots',
          text: 'Native oaks are common in Carmichael and may be protected under Sacramento County rules. Additions, fences, and other work near large trees should be checked with the county before it is planned.'
        },
        {
          title: 'Established homes',
          text: 'Many homes have been lived in for decades. Remodels often uncover older wiring, plumbing, or framing that needs attention, so we plan for inspection points before finishes go in.'
        }
      ],
      faqs: [
        {
          question: 'Who issues building permits in Carmichael?',
          answer: [
            `Sacramento County. Carmichael is unincorporated, so permits come from [Sacramento County Building Permits & Inspection](${COUNTY_BUILDING}) rather than a city building department.`
          ]
        },
        {
          question: 'Can you build an addition or fence near an oak tree?',
          answer: [
            'Often yes, but native oaks may be protected, and work within their root zone can require county approval. We identify large trees during the estimate and plan the work around them.'
          ]
        }
      ]
    }
  },
  { slug: 'elk-grove', name: 'Elk Grove', county: 'Sacramento County', enabled: false },
  { slug: 'roseville', name: 'Roseville', county: 'Placer County', enabled: false },
  { slug: 'folsom', name: 'Folsom', county: 'Sacramento County', enabled: false },
  { slug: 'citrus-heights', name: 'Citrus Heights', county: 'Sacramento County', enabled: false },
  { slug: 'rancho-cordova', name: 'Rancho Cordova', county: 'Sacramento County', enabled: false }
]

export const enabledAreas = serviceAreas.filter((a) => a.enabled)
export const areaPages = enabledAreas.filter((a) => a.page)
export const getArea = (slug: string) => areaPages.find((a) => a.slug === slug)
export const areaNames = () => enabledAreas.map((a) => a.name).join(', ').replace(/, ([^,]*)$/, ' and $1')
