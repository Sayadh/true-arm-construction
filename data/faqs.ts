import type { FaqCategory, FaqCategoryId, FaqItem } from '../types'

export const faqCategories: FaqCategory[] = [
  { id: 'general', name: 'General construction' },
  { id: 'bathroom', name: 'Bathroom remodeling' },
  { id: 'tile', name: 'Tile installation' },
  { id: 'painting', name: 'Interior & exterior painting' },
  { id: 'exterior', name: 'Exterior improvements' },
  { id: 'construction', name: 'New construction' },
  { id: 'estimates', name: 'Estimates & project planning' }
]

const CITY_BUILDING = 'https://www.cityofsacramento.gov/community-development/building'
const COUNTY_BUILDING = 'https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html'
const CSLB_VERIFY = 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1128503'

export const faqs: FaqItem[] = [
  // ── General
  {
    id: 'services-offered',
    category: 'general',
    featured: true,
    question: 'What construction services do you offer in Sacramento?',
    answer: [
      'We offer bathroom remodeling, tile installation, interior and exterior painting, fence repair, siding services, wall installation, pressure washing, window services, gazebo construction, and new construction. See the [full list of services](/services) for details on each one.'
    ]
  },
  {
    id: 'residential-commercial',
    category: 'general',
    featured: true,
    question: 'Do you work on residential and commercial properties?',
    answer: [
      'Yes. We work on both residential and commercial properties. Mention the property type when you request an estimate so we can plan the right conversation.'
    ]
  },
  {
    id: 'license',
    category: 'general',
    question: 'Is True Arm Construction licensed?',
    answer: [
      `True Arm Construction holds California contractor license #1128503 with a Class B (General Building Contractor) classification. You can look up the license record, including its current status, directly on the [CSLB website](${CSLB_VERIFY}). We encourage every homeowner to verify any contractor before hiring.`
    ]
  },
  {
    id: 'prepare-remodel',
    category: 'general',
    question: 'How should I prepare for a remodeling project?',
    answer: [
      'Start by writing down what is not working in the space today and what you want to change. Collect a few photos of styles you like, think about a budget range, and note any timing constraints such as guests or a move-in date.',
      'Before work starts, plan for the rooms that will be out of use, clear personal items from the work area, and decide on major materials early so they are on hand when needed.'
    ]
  },
  {
    id: 'permits',
    category: 'general',
    featured: true,
    question: 'When might a project require permits?',
    answer: [
      'Permits are commonly required for work that changes structure, adds or moves plumbing or electrical, replaces windows, or builds new structures. Purely cosmetic work, such as painting, often does not need one. The exact rules depend on the scope and on whether the property is in the City of Sacramento or unincorporated Sacramento County.',
      `For official guidance, see the [City of Sacramento Building Division](${CITY_BUILDING}) or [Sacramento County Building Permits & Inspection](${COUNTY_BUILDING}). We review permit needs for your specific project during the estimate.`
    ]
  },

  // ── Bathroom
  {
    id: 'bathroom-cost',
    category: 'bathroom',
    featured: true,
    question: 'What factors affect bathroom remodeling costs?',
    answer: [
      'The biggest factors are whether the layout changes (moving a toilet, shower, or vanity means moving plumbing), the size and type of shower, your tile and fixture selections, and the condition of what is behind the existing finishes. Permit requirements and electrical or ventilation updates also affect the total.',
      'We do not publish standard prices because two bathrooms of the same size can differ a lot in scope. Your estimate is based on your room and your choices.'
    ]
  },
  {
    id: 'bathroom-time',
    category: 'bathroom',
    question: 'How long can a bathroom remodel take?',
    answer: [
      'It depends on scope. A surface and fixture refresh is much quicker than a full remodel that moves plumbing and requires inspections. Material lead times, especially for custom vanities or special-order tile, can also affect the schedule. We provide a timeline specific to your project with the estimate.'
    ]
  },
  {
    id: 'bathroom-tub-shower',
    category: 'bathroom',
    question: 'Can you convert a bathtub into a walk-in shower?',
    answer: [
      'Tub-to-shower conversions are a common bathroom project. The work typically involves removing the tub, adjusting the drain and valve, building a properly sloped and waterproofed shower base, and tiling the walls and floor. We review your existing plumbing and space during the estimate.'
    ]
  },

  // ── Tile
  {
    id: 'tile-cost',
    category: 'tile',
    featured: true,
    question: 'What affects tile installation pricing?',
    answer: [
      'Pricing depends on the area, the tile you choose, the pattern, and how much preparation the surface needs. Removing old tile, leveling a floor, and waterproofing a shower all add work. Large-format tile and patterns such as herringbone also take more time to lay out and install.'
    ]
  },
  {
    id: 'tile-over-tile',
    category: 'tile',
    question: 'Can new tile be installed over existing tile?',
    answer: [
      'Sometimes, but it is often not the best option. Tiling over tile raises the floor height, can cause problems at doors and transitions, and hides any issues with the original installation. In wet areas such as showers, removing the old tile lets us confirm the waterproofing. We will recommend an approach after seeing the surface.'
    ]
  },
  {
    id: 'tile-type',
    category: 'tile',
    question: 'What type of tile is best for bathroom floors?',
    answer: [
      'Porcelain is a common choice for bathroom floors because it absorbs very little water and is durable. Look for a tile rated for floor use with adequate slip resistance for wet areas. Natural stone can also work but usually needs sealing and more careful cleaning.'
    ]
  },

  // ── Painting
  {
    id: 'paint-prep',
    category: 'painting',
    question: 'How should I prepare my home for interior painting?',
    answer: [
      'Remove small items, wall hangings, and fragile decor from the rooms being painted, and move furniture toward the center of the room if you can. We protect floors and remaining furniture before we start.'
    ]
  },
  {
    id: 'paint-exterior-season',
    category: 'painting',
    question: 'When is the best time to paint a house exterior in Sacramento?',
    answer: [
      'Exterior paint needs to go on within the temperature and humidity ranges the manufacturer specifies. In Sacramento, spring and fall usually offer comfortable conditions, while summer work is often scheduled to avoid painting surfaces in direct afternoon heat. Winter rain can limit exterior work.'
    ]
  },
  {
    id: 'paint-lead',
    category: 'painting',
    question: 'My house was built before 1978. Does that matter for painting?',
    answer: [
      'Yes. Homes built before 1978 may have lead-based paint, and federal rules require specific work practices when it is disturbed. Mention your home’s age when you request an estimate. The [EPA’s Renovation, Repair and Painting page](https://www.epa.gov/lead/renovation-repair-and-painting-program) explains the requirements.'
    ]
  },

  // ── Exterior
  {
    id: 'fence-repair-or-replace',
    category: 'exterior',
    question: 'Should I repair or replace my fence?',
    answer: [
      'If the damage is limited to a few posts, boards, or a gate and the rest of the fence is sound, repair usually makes sense. If many posts are rotted or the whole fence is leaning, replacing sections may be more practical. We will tell you what we see during the estimate.'
    ]
  },
  {
    id: 'pressure-wash-siding',
    category: 'exterior',
    question: 'Is pressure washing safe for siding?',
    answer: [
      'It can be, with the right method. Lower pressure and a gentler technique are used for painted surfaces, wood, and many siding materials to avoid damage or forcing water behind the siding. Concrete and masonry can usually take higher pressure.'
    ]
  },
  {
    id: 'gazebo-permit',
    category: 'exterior',
    question: 'Do I need a permit for a gazebo?',
    answer: [
      `It depends on the size, height, location on your lot, and whether electrical work is included. Your HOA may also have rules. Check with the [City of Sacramento Building Division](${CITY_BUILDING}) or [Sacramento County](${COUNTY_BUILDING}), and we will review it during your estimate.`
    ]
  },

  // ── New construction
  {
    id: 'new-construction-start',
    category: 'construction',
    featured: true,
    question: 'What should homeowners know before starting new construction?',
    answer: [
      'New construction typically requires plans from licensed design professionals, a building permit, and inspections at several stages. Early decisions about size, layout, and materials have the biggest effect on cost and schedule.',
      'Before you contact a contractor, gather what you have: property details, any drawings, a budget range, and your target timing. It is fine to be early in the process. The first conversation is about understanding where you are.'
    ]
  },
  {
    id: 'new-construction-plans',
    category: 'construction',
    question: 'Do I need plans before contacting you?',
    answer: [
      'No. You can contact us at the idea stage, with preliminary sketches, or with completed drawings. Tell us where you are in the process so we can plan the next step.'
    ]
  },
  {
    id: 'new-construction-commercial',
    category: 'construction',
    question: 'Do you take on commercial construction?',
    answer: [
      'Yes, we work on commercial properties as well as residential ones. Commercial projects involve additional considerations, such as occupancy and accessibility requirements, which we discuss during the initial consultation.'
    ]
  },

  // ── Estimates
  {
    id: 'free-estimates',
    category: 'estimates',
    featured: true,
    question: 'Do you provide free estimates?',
    answer: [
      'Yes, we provide free estimates. The quickest way to start is the [project planner](/free-estimate), which asks a few questions about your project so we can follow up with the right information.'
    ]
  },
  {
    id: 'estimate-info',
    category: 'estimates',
    featured: true,
    question: 'What information should I include in an estimate request?',
    answer: [
      'Include the type of work, the property type (residential or commercial), your ZIP code, and a short description of what you want done. Approximate sizes, photos, and your preferred timing are helpful but not required. If you are unsure about something, say so; we will work it out together.'
    ]
  },
  {
    id: 'estimate-process',
    category: 'estimates',
    question: 'What happens after I submit a request?',
    answer: [
      'We review your request and contact you using the details you provide to discuss the project. For most projects, the next step is a site visit to see the space and take measurements before we prepare an estimate.'
    ]
  },
  {
    id: 'estimate-compare',
    category: 'estimates',
    question: 'How do I compare estimates from different contractors?',
    answer: [
      `Compare scope, not only the total. Check what each estimate includes: demolition, preparation, materials, permits, and cleanup. Verify each contractor’s license on the [CSLB website](https://www.cslb.ca.gov/), and ask questions about anything that is unclear.`
    ]
  }
]

export function faqsByCategory(category: FaqCategoryId): FaqItem[] {
  return faqs.filter((f) => f.category === category)
}

export function faqsByIds(ids: string[]): FaqItem[] {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is FaqItem => Boolean(f))
}

export const featuredFaqs = faqs.filter((f) => f.featured)
