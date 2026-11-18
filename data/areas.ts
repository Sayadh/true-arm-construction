import type { ServiceArea } from '../types'

/**
 * Service areas confirmed by the company: Sacramento, West Sacramento, Carmichael (2026-10),
 * plus Elk Grove, Roseville, Folsom, Citrus Heights, Rancho Cordova, Davis, Rocklin (2026-11).
 * Permit office links checked against each city's official site (2026-11).
 * Each enabled area with `page` gets its own landing page at /service-areas/<slug>.
 * Keep the content specific and factual — city pages that only swap the city name
 * are treated by Google as doorway pages.
 */
const CITY_SAC_BUILDING = 'https://www.cityofsacramento.gov/community-development/building'
const WEST_SAC_BUILDING = 'https://www.cityofwestsacramento.org/government/departments/community-development/building-division'
const COUNTY_BUILDING = 'https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html'
const ELK_GROVE_BUILDING = 'https://elkgrovecity.org/departments-and-divisions/building-safety-inspection-permits'
const ROSEVILLE_BUILDING = 'https://www.roseville.ca.us/buildingpermits'
const FOLSOM_BUILDING = 'https://www.folsom.ca.us/government/community-development/epermit-center'
const CITRUS_HEIGHTS_BUILDING = 'https://www.citrusheights.net/161/Residential-Contruction'
const RANCHO_CORDOVA_BUILDING = 'https://www.cityofranchocordova.org/departments/community-development/building-and-safety'
const DAVIS_BUILDING = 'https://www.cityofdavis.org/city-hall/community-development-and-sustainability/building'
const ROCKLIN_BUILDING = 'https://www.rocklin.ca.us/building-services'

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'sacramento',
    name: 'Sacramento',
    county: 'Sacramento County',
    enabled: true,
    primary: true,
    page: {
      seoTitle: 'Sacramento, CA Painting & Remodeling Services | True Arm',
      metaDescription:
        'House painting, cabinet and commercial painting, kitchen and bathroom remodeling, flooring, and repairs in Sacramento, CA. Licensed contractor, EPA Lead-Safe Firm.',
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
      seoTitle: 'Painting & Remodeling in West Sacramento, CA | True Arm',
      metaDescription:
        'Interior and exterior painting, kitchen and bathroom remodeling, flooring, fences, and repairs in West Sacramento, CA. Licensed contractor. Free estimates.',
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
      seoTitle: 'Painting & Remodeling in Carmichael, CA | True Arm Construction',
      metaDescription:
        'House painting, lead-safe painting for older homes, remodeling, room additions, flooring, and repairs in Carmichael, CA. Licensed contractor. Free estimates.',
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
  {
    slug: 'elk-grove',
    name: 'Elk Grove',
    county: 'Sacramento County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Elk Grove, CA | True Arm Construction',
      metaDescription:
        'Interior and exterior painting, cabinet painting, remodeling, flooring, and repairs in Elk Grove, CA. Licensed contractor, EPA Lead-Safe Certified Firm. Free estimates.',
      intro: [
        'Elk Grove is one of the largest cities in Sacramento County, just south of Sacramento. We paint homes inside and out, refinish cabinets, and handle remodels, flooring, and repairs for homeowners and businesses there.',
        'Many Elk Grove homes are stucco houses in planned neighborhoods, so exterior repaints often come down to the right prep for stucco and trim, and colors that fit the neighborhood rules.'
      ],
      permits: {
        authority: 'City of Elk Grove, Building Safety, Inspection & Permits',
        url: ELK_GROVE_BUILDING,
        text: 'Elk Grove is an incorporated city with its own building division, separate from Sacramento County. Painting alone usually does not need a permit; remodels that change plumbing, electrical, or walls generally do, and we review that during the estimate.'
      },
      localNotes: [
        {
          title: 'HOA color rules',
          text: 'Many neighborhoods have homeowners associations that approve exterior colors. Before an exterior repaint, check whether your HOA needs a color submittal; we can work from an approved palette.'
        },
        {
          title: 'Stucco and trim',
          text: 'Stucco needs cracks and patches addressed before paint, and wood trim and fascia exposed to afternoon sun often need repair or priming first.'
        }
      ],
      neighborhoods: ['Laguna', 'Old Town Elk Grove', 'East Franklin', 'Laguna West', 'Sheldon'],
      faqs: [
        {
          question: 'Does my HOA need to approve exterior paint colors in Elk Grove?',
          answer: [
            'Often yes. Many Elk Grove neighborhoods have HOA guidelines for exterior colors. Check with your HOA before the work is scheduled; once colors are approved, we paint to that specification.'
          ]
        },
        {
          question: 'Who issues building permits in Elk Grove?',
          answer: [
            `The [City of Elk Grove Building Safety division](${ELK_GROVE_BUILDING}), not Sacramento County. We confirm whether your scope needs a permit during the estimate.`
          ]
        }
      ]
    }
  },
  {
    slug: 'roseville',
    name: 'Roseville',
    county: 'Placer County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Roseville, CA | True Arm Construction',
      metaDescription:
        'House painting, cabinet painting, remodeling, flooring, and repairs in Roseville, CA (Placer County). Licensed contractor, EPA Lead-Safe Certified Firm. Free estimates.',
      intro: [
        'Roseville is in Placer County, northeast of Sacramento. We paint interiors and exteriors, refresh cabinets, and take on remodels, flooring, and repairs for homes and commercial properties in the city.',
        'Roseville has both older homes near downtown and large newer neighborhoods, so a job can range from careful prep on older wood siding to a color change on a newer stucco home.'
      ],
      permits: {
        authority: 'City of Roseville, Development Services — Building',
        url: ROSEVILLE_BUILDING,
        text: 'Roseville issues its own building permits through Development Services. The city publishes what does and does not need a permit; repainting usually does not, while remodels with plumbing, electrical, or structural changes do.'
      },
      localNotes: [
        {
          title: 'Older homes near downtown',
          text: 'Houses in Old Roseville and other early neighborhoods may predate 1978. Paint work there is planned with lead-safe practices.'
        },
        {
          title: 'Newer neighborhoods and HOAs',
          text: 'Planned communities often have exterior color guidelines. We work from the approved palette and protect landscaping and hardscape during exterior work.'
        }
      ],
      neighborhoods: ['Old Roseville', 'Diamond Oaks', 'Woodcreek Oaks', 'Westpark', 'Sun City Roseville'],
      faqs: [
        {
          question: 'Do you work in Roseville even though it is in Placer County?',
          answer: [
            'Yes. Roseville is one of the cities we serve. Estimates are based on the scope and the property, and every estimate is free.'
          ]
        },
        {
          question: 'Who issues building permits in Roseville?',
          answer: [
            `The [City of Roseville Building division](${ROSEVILLE_BUILDING}) in Development Services. We check permit needs for your scope before any work is scheduled.`
          ]
        }
      ]
    }
  },
  {
    slug: 'folsom',
    name: 'Folsom',
    county: 'Sacramento County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Folsom, CA | True Arm Construction',
      metaDescription:
        'Interior and exterior painting, cabinet painting, remodeling, and repairs in Folsom, CA. Licensed contractor and EPA Lead-Safe Certified Firm. Free painting estimates.',
      intro: [
        'Folsom sits east of Sacramento along the American River and Folsom Lake. We paint homes and businesses, refinish cabinets, and handle remodels, flooring, and repairs throughout the city.',
        'Folsom mixes a historic downtown with established and brand-new neighborhoods, so we plan each job around the age of the building and the surfaces we are painting.'
      ],
      permits: {
        authority: 'City of Folsom, Community Development — Building Services',
        url: FOLSOM_BUILDING,
        text: 'Folsom issues its own building permits through Community Development. Properties in the Historic District can have extra review for exterior changes, so we check before planning exterior color or material changes there.'
      },
      localNotes: [
        {
          title: 'Historic District',
          text: 'Older buildings around Sutter Street often have wood siding and trim that need careful preparation, and many predate 1978, which calls for lead-safe work practices.'
        },
        {
          title: 'Sun and heat on the east side of the valley',
          text: 'South- and west-facing walls take the strongest sun. Exterior painting is best scheduled for spring and fall, and sun-damaged trim is repaired before paint.'
        }
      ],
      neighborhoods: ['Historic Folsom', 'Empire Ranch', 'Broadstone', 'American River Canyon', 'Folsom Ranch'],
      faqs: [
        {
          question: 'Can you paint an older home in Folsom built before 1978?',
          answer: [
            'Yes. True Arm Construction is an EPA Lead-Safe Certified Firm. For homes built before 1978 we use lead-safe work practices: containment, careful surface prep, and thorough clean-up.'
          ]
        },
        {
          question: 'Who issues building permits in Folsom?',
          answer: [
            `The [City of Folsom](${FOLSOM_BUILDING}) through its Community Development department. We review permit needs for your scope during the estimate.`
          ]
        }
      ]
    }
  },
  {
    slug: 'citrus-heights',
    name: 'Citrus Heights',
    county: 'Sacramento County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Citrus Heights, CA | True Arm',
      metaDescription:
        'House painting, lead-safe painting for older homes, remodeling, flooring, and repairs in Citrus Heights, CA. Licensed contractor. Free estimates.',
      intro: [
        'Citrus Heights is a city in northeast Sacramento County with many established neighborhoods. We paint interiors and exteriors, update cabinets, and handle remodels, flooring, and repairs there.',
        'Many homes in the city were built decades ago, so painting often goes together with repairs: dry rot in trim and fascia, patched drywall, and updated finishes.'
      ],
      permits: {
        authority: 'City of Citrus Heights, Community Development — Building',
        url: CITRUS_HEIGHTS_BUILDING,
        text: 'Citrus Heights is its own city with its own building division, separate from Sacramento County. The city publishes permit requirements for residential remodels, alterations, and repairs.'
      },
      localNotes: [
        {
          title: 'Established homes, older paint',
          text: 'Homes built before 1978 may have lead-based paint under newer coats. As an EPA Lead-Safe Certified Firm, we plan prep and clean-up accordingly.'
        },
        {
          title: 'Repairs before paint',
          text: 'Fascia, window trim, and fence boards are where dry rot usually shows up. Fixing them first is what makes a new paint job last.'
        }
      ],
      faqs: [
        {
          question: 'Do you repair dry rot before painting in Citrus Heights?',
          answer: [
            'Yes. We point out damaged wood during the estimate and repair or replace it before priming and painting, so the new paint is not applied over rot.'
          ]
        },
        {
          question: 'Who issues building permits in Citrus Heights?',
          answer: [
            `The [City of Citrus Heights](${CITRUS_HEIGHTS_BUILDING}) building division. Painting alone usually needs no permit; remodels with plumbing, electrical, or wall changes generally do.`
          ]
        }
      ]
    }
  },
  {
    slug: 'rancho-cordova',
    name: 'Rancho Cordova',
    county: 'Sacramento County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Rancho Cordova, CA | True Arm',
      metaDescription:
        'Interior, exterior, and commercial painting, remodeling, flooring, and repairs in Rancho Cordova, CA. Licensed contractor, EPA Lead-Safe Certified Firm. Free estimates.',
      intro: [
        'Rancho Cordova is a city east of Sacramento along Highway 50, with older neighborhoods and fast-growing new communities. We paint homes and commercial spaces and handle remodels, flooring, and repairs there.',
        'Older homes usually need more prep and repair before paint, while newer homes are often about color changes, cabinets, and finish upgrades.'
      ],
      permits: {
        authority: 'City of Rancho Cordova, Community Development — Building and Safety',
        url: RANCHO_CORDOVA_BUILDING,
        text: 'Rancho Cordova has its own Building and Safety division. We confirm whether your scope needs a permit before the work is scheduled.'
      },
      localNotes: [
        {
          title: 'Commercial and office space',
          text: 'The city has a large base of offices and businesses. Commercial repaints can be scheduled in phases or outside business hours to keep spaces open.'
        },
        {
          title: 'Older and newer homes side by side',
          text: 'Pre-1978 homes are painted with lead-safe practices; newer homes in planned communities may need HOA color approval first.'
        }
      ],
      neighborhoods: ['Anatolia', 'Capital Village', 'Sunridge'],
      faqs: [
        {
          question: 'Can you paint our office in Rancho Cordova without closing it?',
          answer: [
            'Often yes. Commercial painting can be phased by area or scheduled for evenings and weekends. We plan the order of work with you during the estimate.'
          ]
        },
        {
          question: 'Who issues building permits in Rancho Cordova?',
          answer: [
            `The [City of Rancho Cordova Building and Safety](${RANCHO_CORDOVA_BUILDING}) division, not Sacramento County.`
          ]
        }
      ]
    }
  },
  {
    slug: 'davis',
    name: 'Davis',
    county: 'Yolo County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Davis, CA | True Arm Construction',
      metaDescription:
        'Interior and exterior painting, rental turnover painting, remodeling, and repairs in Davis, CA (Yolo County). Licensed contractor, EPA Lead-Safe Certified Firm.',
      intro: [
        'Davis is a university city in Yolo County, west of Sacramento. We paint homes and rental properties inside and out and handle remodels, flooring, and repairs there.',
        'With a large share of rental homes, Davis property owners often need interior repainting and small repairs between tenants, done on a tight schedule.'
      ],
      permits: {
        authority: 'City of Davis, Community Development and Sustainability — Building Division',
        url: DAVIS_BUILDING,
        text: 'Davis issues its own building permits; it is not covered by Sacramento city or county offices. Repainting usually needs no permit, while remodels with plumbing, electrical, or structural work do.'
      },
      localNotes: [
        {
          title: 'Rental turnovers',
          text: 'Interior repaints, drywall patching, and touch-ups between tenants can be planned around move-out and move-in dates.'
        },
        {
          title: 'Older central neighborhoods',
          text: 'Homes in the older parts of town may predate 1978. Paint work there follows lead-safe practices, which also matters for tenant-occupied homes.'
        }
      ],
      neighborhoods: ['Old North Davis', 'Central Davis', 'West Davis', 'East Davis', 'South Davis'],
      faqs: [
        {
          question: 'Can you repaint a Davis rental between tenants?',
          answer: [
            'Yes. Tell us the move-out and move-in dates when you request an estimate, and we will plan the painting and any repairs to fit that window.'
          ]
        },
        {
          question: 'Who issues building permits in Davis?',
          answer: [
            `The [City of Davis Building Division](${DAVIS_BUILDING}). Davis is in Yolo County and handles its own permits and inspections.`
          ]
        }
      ]
    }
  },
  {
    slug: 'rocklin',
    name: 'Rocklin',
    county: 'Placer County',
    enabled: true,
    page: {
      seoTitle: 'Painting & Remodeling in Rocklin, CA | True Arm Construction',
      metaDescription:
        'House painting, cabinet painting, deck and fence staining, remodeling, and repairs in Rocklin, CA (Placer County). Licensed contractor. Free estimates.',
      intro: [
        'Rocklin is a Placer County city next to Roseville, with mostly newer neighborhoods and a historic core. We paint homes inside and out, refinish cabinets, stain decks and fences, and handle remodels and repairs there.',
        'Many Rocklin homes have wood fences, decks, and trim that take full sun, so staining and exterior paint maintenance are common requests.'
      ],
      permits: {
        authority: 'City of Rocklin, Community Development — Building Services',
        url: ROCKLIN_BUILDING,
        text: 'Rocklin issues its own building permits and publishes guidance on which residential remodels need one. We review your scope against it during the estimate.'
      },
      localNotes: [
        {
          title: 'Decks and fences in full sun',
          text: 'Sun and sprinklers wear down wood quickly. Cleaning and re-staining on a regular cycle keeps fences and decks from graying and splitting.'
        },
        {
          title: 'HOA neighborhoods',
          text: 'Planned communities often set exterior color rules. We work from your approved colors for siding, trim, and doors.'
        }
      ],
      neighborhoods: ['Whitney Ranch', 'Stanford Ranch', 'Sunset Whitney', 'Old Town Rocklin'],
      faqs: [
        {
          question: 'Do you stain fences and decks in Rocklin?',
          answer: [
            'Yes. We clean the wood, make small repairs, and apply a penetrating stain. Stain soaks into the wood and is easier to maintain than paint on fences and decks.'
          ]
        },
        {
          question: 'Who issues building permits in Rocklin?',
          answer: [
            `The [City of Rocklin Building Services](${ROCKLIN_BUILDING}) division in Community Development.`
          ]
        }
      ]
    }
  }
]

export const enabledAreas = serviceAreas.filter((a) => a.enabled)
export const areaPages = enabledAreas.filter((a) => a.page)
export const getArea = (slug: string) => areaPages.find((a) => a.slug === slug)
/** "Sacramento, Placer, and Yolo counties" style list of counties served */
export const areaCounties = () => {
  const names = [...new Set(enabledAreas.map((a) => a.county.replace(/ County$/, '')))]
  return `${names.join(', ').replace(/, ([^,]*)$/, ', and $1')} ${names.length > 1 ? 'counties' : 'County'}`
}
export const areaNames = () => enabledAreas.map((a) => a.name).join(', ').replace(/, ([^,]*)$/, ' and $1')
