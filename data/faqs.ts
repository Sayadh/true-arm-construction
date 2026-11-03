import type { FaqCategory, FaqCategoryId, FaqItem } from '../types'

export const faqCategories: FaqCategory[] = [
  { id: 'general', name: 'General' },
  { id: 'kitchen', name: 'Kitchen remodeling' },
  { id: 'bathroom', name: 'Bathroom remodeling' },
  { id: 'additions', name: 'Room additions' },
  { id: 'flooring', name: 'Flooring & tile' },
  { id: 'painting', name: 'Interior & exterior painting' },
  { id: 'exterior', name: 'Fences, gates & pressure washing' },
  { id: 'repairs', name: 'Repairs & handyman' },
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
      'We offer home, kitchen, and bathroom remodeling, room additions, flooring and epoxy flooring, tile and baseboard installation, interior and exterior painting, pressure washing, fences and gates, drywall repair, dry rot repair, and handyman services. See the [full list of services](/services) for details on each one.'
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

  // ── Flooring & tile
  {
    id: 'tile-cost',
    category: 'flooring',
    featured: true,
    question: 'What affects tile installation pricing?',
    answer: [
      'Pricing depends on the area, the tile you choose, the pattern, and how much preparation the surface needs. Removing old tile, leveling a floor, and waterproofing a shower all add work. Large-format tile and patterns such as herringbone also take more time to lay out and install.'
    ]
  },
  {
    id: 'tile-over-tile',
    category: 'flooring',
    question: 'Can new tile be installed over existing tile?',
    answer: [
      'Sometimes, but it is often not the best option. Tiling over tile raises the floor height, can cause problems at doors and transitions, and hides any issues with the original installation. In wet areas such as showers, removing the old tile lets us confirm the waterproofing. We will recommend an approach after seeing the surface.'
    ]
  },
  {
    id: 'tile-type',
    category: 'flooring',
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

  // ── Fences, gates & pressure washing
  {
    id: 'fence-repair-or-replace',
    category: 'exterior',
    question: 'Should I repair or replace my fence?',
    answer: [
      'If the damage is limited to a few posts, boards, or a gate and the rest of the fence is sound, repair usually makes sense. If many posts are rotted or the whole fence is leaning, replacing sections may be more practical. We will tell you what we see during the estimate.'
    ]
  },
  {
    id: 'pressure-wash-walls',
    category: 'exterior',
    question: 'Is pressure washing safe for my house exterior?',
    answer: [
      'It can be, with the right method. Lower pressure and a gentler technique are used for painted surfaces, wood, and stucco to avoid damage or forcing water into the walls. Concrete and masonry can usually take higher pressure.'
    ]
  },
  {
    id: 'fence-new',
    category: 'exterior',
    featured: true,
    question: 'Do you build new fences and gates, or only repair them?',
    answer: [
      'Both. We install new fences and gates, replace old fences, and repair posts, boards, rails, and sagging gates. See [Fences & Gates](/services/fences-gates) for details.'
    ]
  },
  {
    id: 'fence-permit',
    category: 'exterior',
    question: 'Do I need a permit for a new fence?',
    answer: [
      `It depends on the fence height and location. Taller fences, and fences in front yards or near streets, may be regulated. Check with the [City of Sacramento Building Division](${CITY_BUILDING}) or [Sacramento County](${COUNTY_BUILDING}), and confirm any HOA rules. Underground utilities should be marked before digging by contacting [California 811](https://california811.org/).`
    ]
  },

  // ── Kitchen
  {
    id: 'kitchen-cost',
    category: 'kitchen',
    featured: true,
    question: 'What affects the cost of a kitchen remodel?',
    answer: [
      'The biggest factors are whether the layout changes, the type and number of cabinets, countertop material, and whether plumbing, gas, or electrical lines move. Flooring, backsplash, lighting, and the condition of walls and subfloor after demolition also play a part. Your estimate is based on your kitchen and your selections.'
    ]
  },
  {
    id: 'kitchen-time',
    category: 'kitchen',
    question: 'How long will my kitchen be out of service?',
    answer: [
      'It depends on the scope and on lead times for cabinets and countertops, which are often measured after cabinets are installed. A refresh that keeps the layout is much shorter than a full remodel. We give you a timeline for your project with the estimate, and ordering long-lead items early helps keep it on track.'
    ]
  },

  // ── Room additions
  {
    id: 'addition-permit',
    category: 'additions',
    featured: true,
    question: 'Does a room addition need a permit?',
    answer: [
      `Yes. A room addition creates new habitable space, so it generally requires plans, a building permit, and inspections at several stages. Requirements depend on the jurisdiction; see the [City of Sacramento Building Division](${CITY_BUILDING}) or [Sacramento County Building Permits & Inspection](${COUNTY_BUILDING}).`
    ]
  },
  {
    id: 'addition-start',
    category: 'additions',
    question: 'What should I think about before planning an addition?',
    answer: [
      'Start with how the new room will be used, since that drives size, layout, windows, and whether plumbing is needed. Then consider your lot: setbacks, easements, and HOA rules can affect where an addition can go. It is fine to contact us at the idea stage; the first conversation is about understanding your goals and your property.'
    ]
  },

  {
    id: 'flooring-type',
    category: 'flooring',
    question: 'What type of flooring is best for kitchens and bathrooms?',
    answer: [
      'Rooms with water need moisture-tolerant flooring. Luxury vinyl plank and porcelain tile are common choices. Laminate and engineered wood are better suited to drier areas unless the product is specifically rated for moisture.'
    ]
  },
  {
    id: 'epoxy-garage',
    category: 'flooring',
    question: 'How long does an epoxy garage floor last, and when can I park on it?',
    answer: [
      'Durability depends mostly on surface preparation and the coating system. A properly prepared and applied coating holds up well to everyday garage use. Cure times are set by the coating manufacturer, with light foot traffic allowed before vehicles. We give you the schedule for your specific system.'
    ]
  },
  {
    id: 'baseboards-flooring',
    category: 'flooring',
    question: 'Should I replace baseboards when I install new flooring?',
    answer: [
      'Often, yes. New flooring can change the floor height, and removing baseboards allows a cleaner installation along the walls. Replacing them at the same time usually gives a better finished look than reinstalling old trim.'
    ]
  },

  // ── Repairs
  {
    id: 'dry-rot-what',
    category: 'repairs',
    featured: true,
    question: 'What is dry rot, and how is it repaired?',
    answer: [
      'Dry rot is wood decay caused by fungi after wood stays damp for a long time. Common spots are fascia boards, window sills, door frames, and exterior trim. Repair means cutting out all the damaged wood, replacing it with sound material, and sealing and painting it. Addressing the moisture source helps prevent it from coming back.'
    ]
  },
  {
    id: 'drywall-match',
    category: 'repairs',
    question: 'Can you match the texture on my walls after a drywall repair?',
    answer: [
      'Common textures such as orange peel and knockdown can usually be matched. Blending also depends on paint: touching up a small patch can show a difference in sheen, so painting the full wall section is sometimes the better option.'
    ]
  },
  {
    id: 'handyman-list',
    category: 'repairs',
    question: 'Do you take small jobs?',
    answer: [
      'Yes. Send us your list of small repairs and installations, ideally with photos. Grouping several items into one visit is usually the most efficient way to get them done.'
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
