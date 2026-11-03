import type { Service, ServiceGroup, ServiceGroupId } from '../types'

/**
 * Service catalogue. Source: client-confirmed categories (Interior & Exterior Painting,
 * Home Remodeling, Bathroom Remodeling, Room Additions, Fences & Gates) and the
 * company business card (kitchen, flooring, tile, handyman, epoxy, baseboards,
 * drywall repair, dry rot repair, power wash).
 *
 * Copy is written to be accurate without claiming unconfirmed specialties.
 * Items marked with `scopeNote` need the client to confirm exact scope.
 * Add photos to `images` (see docs/ASSETS.md); empty arrays show labeled placeholders.
 */

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'remodeling',
    name: 'Remodeling & additions',
    description: 'Kitchens, bathrooms, and room additions.'
  },
  {
    id: 'flooring',
    name: 'Flooring & tile',
    description: 'Flooring, epoxy, tile, and baseboards.'
  },
  {
    id: 'exterior',
    name: 'Painting & exterior',
    description: 'Painting, pressure washing, fences and gates.'
  },
  {
    id: 'repairs',
    name: 'Repairs & handyman',
    description: 'Drywall, dry rot, and small repairs.'
  }
]

const SAC = 'Sacramento'

export const services: Service[] = [
  // ───────────────────────── Remodeling umbrella (Ads campaign 1) ─────────────────────────
  {
    slug: 'home-remodeling',
    name: 'Home Remodeling',
    shortName: 'Home remodeling',
    group: 'remodeling',
    enabled: true,
    icon: 'Hammer',
    adsLanding: true,
    seoTitle: `Home Remodeling Contractor in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Home remodeling in Sacramento, CA: kitchens, bathrooms, flooring, tile, and room additions. Licensed Class B contractor. Request a free estimate.',
    heroTitle: 'Home remodeling in Sacramento',
    heroLead:
      'Update the rooms you use every day. We handle kitchen and bathroom remodels, flooring, tile, painting, and related improvements for Sacramento homes and commercial spaces, with one contractor coordinating the work.',
    cardText: 'Room updates and renovations coordinated by one licensed contractor.',
    intro: [
      'A remodel usually starts with one problem: a bathroom that no longer works for your family, worn flooring, or rooms that feel dated. Good remodeling work solves that problem without creating new ones, which comes down to accurate scope, clear decisions up front, and careful work on site.',
      'True Arm Construction holds a California Class B General Building Contractor license (#1128503). A Class B license allows a contractor to take on projects that involve multiple building trades, which is what most remodels are. We start with a conversation about what you want to change, then put together a scope and estimate you can review before any work begins.'
    ],
    scopeTitle: 'Remodeling work we take on',
    scope: [
      { title: 'Kitchen remodels', text: 'Cabinets, countertops, backsplash, flooring, and layout updates.' },
      { title: 'Bathroom remodels', text: 'From vanity and fixture updates to full layout changes, including tile and shower work.' },
      { title: 'Room additions', text: 'Extra bedrooms, family rooms, and living space added to your home.' },
      { title: 'Flooring and tile', text: 'Vinyl plank, laminate, engineered wood, tile, and epoxy floors.' },
      { title: 'Painting, drywall, and trim', text: 'Interior painting, drywall repair, and baseboards that finish each room.' },
      { title: 'Multi-room updates', text: 'Combining several improvements into one planned project to reduce disruption.' }
    ],
    sections: [
      {
        title: 'Planning a remodel that stays on track',
        body: [
          'Most remodeling surprises come from decisions made too late. Before work starts, it helps to settle the layout, the main materials, and the fixtures that affect rough-in work such as plumbing locations or electrical boxes. Finish selections like paint colors can come later, but tile, cabinets, and fixtures often have lead times worth planning around.',
          'Older Sacramento homes can also hide conditions that only show up once walls or floors are opened: water damage, outdated wiring, or framing that needs attention. A realistic plan leaves room for that possibility, and we will talk with you before any change to the agreed scope.'
        ]
      },
      {
        title: 'Living in your home during the work',
        body: [
          'Many remodels happen while the household lives at home. We discuss work areas, dust control, access, and which rooms will be out of service, so you can plan around them. If a bathroom is being remodeled, it is worth confirming early whether another bathroom will remain usable.'
        ]
      },
      {
        title: 'Permits',
        body: [
          'Remodels that move plumbing, change electrical circuits, alter structure, or replace certain building components often require a permit. Requirements depend on the scope and whether the property is in the City of Sacramento or unincorporated Sacramento County. We review this as part of the estimate. You can also check the [City of Sacramento Building Division](https://www.cityofsacramento.gov/community-development/building) or [Sacramento County Building Permits & Inspection](https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html).'
        ]
      }
    ],
    costFactors: [
      'Size of the space and how many rooms are involved',
      'Whether the layout changes or stays the same',
      'Material and fixture selections',
      'Condition of existing surfaces, framing, and substrates',
      'Permit and inspection requirements',
      'Access and protection needs for occupied homes'
    ],
    expectations: [
      'A conversation about goals, budget range, and timing',
      'A visit to see the space and take measurements',
      'A written scope and estimate to review',
      'A planned start once scope and materials are agreed',
      'Regular communication while work is underway',
      'A final walkthrough together'
    ],
    related: ['kitchen-remodeling', 'bathroom-remodeling', 'room-additions', 'flooring-installation'],
    faqCategory: 'general',
    faqIds: ['prepare-remodel', 'permits', 'estimate-info'],
    projectCategory: 'remodeling',
    images: []
  },

  // ───────────────────────── Kitchen ─────────────────────────
  {
    slug: 'kitchen-remodeling',
    name: 'Kitchen Remodeling',
    shortName: 'Kitchen remodeling',
    group: 'remodeling',
    enabled: true,
    icon: 'CookingPot',
    seoTitle: `Kitchen Remodeling in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Kitchen remodeling in Sacramento: cabinets, countertops, backsplash, flooring, and layout updates. Licensed Class B contractor. Free estimates.',
    heroTitle: 'Kitchen remodeling in Sacramento',
    heroLead:
      'A kitchen that fits how you cook and live. We plan and coordinate kitchen updates, from new cabinets and countertops to full remodels, for Sacramento homes and commercial spaces.',
    cardText: 'Cabinets, countertops, backsplash, flooring, and layout updates.',
    intro: [
      'The kitchen is usually the busiest room in the house and one of the most involved to remodel. Cabinets, countertops, plumbing, electrical, lighting, flooring, and finishes all have to come together in the right order.',
      'True Arm Construction holds a California Class B General Building Contractor license (#1128503), which covers projects involving multiple building trades. We start by understanding how you use your kitchen today, then put together a scope and estimate you can review before work begins.'
    ],
    scopeTitle: 'Kitchen remodeling scopes',
    scope: [
      { title: 'Full kitchen remodel', text: 'Taking the kitchen down to the walls and rebuilding it with a new layout and finishes.' },
      { title: 'Cabinet updates', text: 'New cabinets or updates to existing ones, including hardware and storage solutions.' },
      { title: 'Countertops', text: 'Replacing worn countertops as part of a refresh or a larger remodel.' },
      { title: 'Backsplash tile', text: 'Tile backsplashes with clean cuts around outlets, windows, and cabinets.' },
      { title: 'Kitchen flooring', text: 'Durable flooring suited to spills, foot traffic, and daily cleaning.' },
      { title: 'Paint and finishing', text: 'Walls, ceilings, trim, and the details that complete the room.' }
    ],
    sections: [
      {
        title: 'Start with how you use the kitchen',
        body: [
          'Before choosing finishes, think about what is not working today: not enough counter space, storage that is hard to reach, poor lighting, or a layout that makes two people bump into each other. Those answers shape the layout, and the layout drives most of the cost and schedule.',
          'Keeping the sink, range, and refrigerator in their current locations is usually simpler than moving them, because relocating them can mean moving plumbing, gas, or electrical lines.'
        ]
      },
      {
        title: 'Decisions with long lead times',
        body: [
          'Cabinets, countertops, and some appliances can take time to order and fabricate. Countertops are often measured only after cabinets are installed. Settling these selections early helps keep the project moving once demolition starts.'
        ]
      },
      {
        title: 'Living without a kitchen',
        body: [
          'During a full remodel, the kitchen is out of service for a period of time. Many households set up a temporary space with a microwave, coffee maker, and a small refrigerator. We discuss the sequence of work with you so you can plan ahead.'
        ]
      },
      {
        title: 'Permits',
        body: [
          'Kitchen remodels that move plumbing, add circuits, or change walls usually require a permit; replacing cabinets or countertops in place often does not. Requirements depend on the scope and jurisdiction. See the [City of Sacramento Building Division](https://www.cityofsacramento.gov/community-development/building) or [Sacramento County Building Permits & Inspection](https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html), and we review it during your estimate.'
        ]
      }
    ],
    costFactors: [
      'Keeping the existing layout or changing it',
      'Cabinet type, size, and quantity',
      'Countertop material and edge details',
      'Plumbing, gas, and electrical changes',
      'Flooring, backsplash, and lighting selections',
      'Condition of walls and subfloor after demolition'
    ],
    expectations: [
      'Talk through how you use the kitchen and what you want to change',
      'Site visit to measure and review existing conditions',
      'Scope, material options, and estimate',
      'Selections confirmed and long-lead items ordered',
      'Demolition, rough work, cabinets, countertops, then finishes',
      'Final walkthrough and cleanup'
    ],
    related: ['bathroom-remodeling', 'flooring-installation', 'tile-installation', 'home-remodeling'],
    faqCategory: 'kitchen',
    projectCategory: 'kitchen',
    images: []
  },

  // ───────────────────────── Bathroom ─────────────────────────
  {
    slug: 'bathroom-remodeling',
    name: 'Bathroom Remodeling',
    shortName: 'Bathroom remodeling',
    group: 'remodeling',
    enabled: true,
    icon: 'Bath',
    adsLanding: true,
    seoTitle: `Bathroom Remodeling in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Bathroom remodeling in Sacramento: showers, tile, vanities, and full renovations for homes and commercial spaces. Free estimates from a licensed contractor.',
    heroTitle: 'Bathroom remodeling in Sacramento',
    heroLead:
      'Whether you want a refreshed vanity area or a completely rebuilt shower, we plan the work around how you use the room and build it to handle daily moisture for years.',
    cardText: 'Showers, tile, vanities, and full bathroom renovations.',
    intro: [
      'Bathrooms are small rooms with a lot going on: plumbing, ventilation, waterproofing, tile, lighting, and fixtures all have to work together in a few square feet. That is why a good bathroom remodel depends as much on what is behind the walls as on the finishes you see.',
      'We remodel bathrooms in homes and commercial properties around Sacramento. Some projects keep the existing layout and replace surfaces and fixtures. Others change the layout entirely, such as converting a tub to a walk-in shower. We will help you understand what each option involves before you decide.'
    ],
    scopeTitle: 'Common bathroom remodeling scopes',
    scope: [
      { title: 'Full remodel', text: 'Taking the room down to the studs and rebuilding with a new layout, surfaces, and fixtures.' },
      { title: 'Shower rebuilds', text: 'New shower pans, waterproofing, tile walls, niches, and benches.' },
      { title: 'Tub-to-shower conversions', text: 'Replacing a tub with a walk-in shower for easier everyday use.' },
      { title: 'Vanity and fixture updates', text: 'New vanities, countertops, sinks, faucets, mirrors, and lighting.' },
      { title: 'Floor and wall tile', text: 'Replacing worn or dated tile with a properly prepared new installation.' },
      { title: 'Paint and finish updates', text: 'Moisture-appropriate paint, trim, and accessories to finish the room.' }
    ],
    sections: [
      {
        title: 'Materials and design considerations',
        body: [
          'Porcelain tile is a popular choice for bathroom floors and showers because it absorbs very little water and holds up to cleaning. Natural stone looks distinctive but needs more care and sealing. Large-format tile means fewer grout lines but requires a flatter substrate, which can affect preparation time.',
          'For vanities, think about storage, counter space, and how many people use the room at once. For showers, consider whether you want a curbless entry, a bench, or a niche, since these decisions affect framing and waterproofing and need to be made before tile work begins.'
        ]
      },
      {
        title: 'Waterproofing is the part you do not see',
        body: [
          'Tile and grout are not waterproof on their own. A long-lasting shower relies on a correctly sloped pan and a continuous waterproofing system behind the tile. This is one of the most important parts of a bathroom remodel and one of the hardest to fix later, so it deserves attention during planning and estimating.'
        ]
      },
      {
        title: 'How long can a bathroom remodel take?',
        body: [
          'Timing depends on the scope. A fixture and surface refresh can move quickly, while a full remodel with layout changes involves more trades, inspections when permits are required, and material lead times. We give you a realistic timeline for your specific project with the estimate rather than a one-size-fits-all number.'
        ]
      },
      {
        title: 'Permits for bathroom work',
        body: [
          'Moving plumbing fixtures, adding circuits, or changing walls usually requires a permit; simple cosmetic updates often do not. The exact rules depend on your jurisdiction. See the [City of Sacramento Building Division](https://www.cityofsacramento.gov/community-development/building) or [Sacramento County Building Permits & Inspection](https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html) for official guidance, and we will discuss it during your estimate.'
        ]
      }
    ],
    costFactors: [
      'Keeping the existing layout versus relocating plumbing',
      'Shower size, tile choice, and features like benches or niches',
      'Vanity, countertop, and fixture selections',
      'Condition of subfloor and walls once the old finishes are removed',
      'Ventilation and electrical updates',
      'Permit requirements for the scope'
    ],
    expectations: [
      'Talk through how you use the bathroom today and what is not working',
      'Site visit to measure and check existing conditions',
      'Review of scope, material options, and an estimate',
      'Material selections confirmed before demolition',
      'Demolition, rough work, waterproofing, then finishes',
      'Final walkthrough and cleanup'
    ],
    related: ['tile-installation', 'kitchen-remodeling', 'flooring-installation', 'drywall-repair'],
    faqCategory: 'bathroom',
    projectCategory: 'bathroom',
    images: []
  },

  // ───────────────────────── Room additions ─────────────────────────
  {
    slug: 'room-additions',
    name: 'Room Additions',
    shortName: 'Room additions',
    group: 'remodeling',
    enabled: true,
    icon: 'HousePlus',
    seoTitle: `Room Additions in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Room additions in Sacramento: add a bedroom, family room, or extra living space to your home. Licensed Class B contractor. Request a free estimate.',
    heroTitle: 'Room additions in Sacramento',
    heroLead:
      'Need more space without moving? A room addition extends your home with a new bedroom, family room, office, or larger living area, planned to fit your property and blend with the existing house.',
    cardText: 'Add a bedroom, family room, or extra living space.',
    intro: [
      'A room addition is one of the most practical ways to gain space while staying in a home and neighborhood you already like. It is also a construction project in its own right: new foundation, framing, roofing, and systems that have to connect cleanly to the existing house.',
      'True Arm Construction holds a California Class B General Building Contractor license (#1128503), the classification for projects that involve multiple building trades. Every addition starts with a consultation about how you want to use the new space and what your property allows.'
    ],
    scopeTitle: 'How a room addition comes together',
    scope: [
      { title: 'Consultation and site review', text: 'Your goals, budget range, and a look at the lot, the house, and where an addition could go.' },
      { title: 'Design and plans', text: 'Coordinating with design professionals on plans that fit your needs and local requirements.' },
      { title: 'Permits', text: 'Building permits and inspections required for new habitable space.' },
      { title: 'Foundation and framing', text: 'A new foundation and structure that tie into the existing house.' },
      { title: 'Roof and exterior tie-in', text: 'Roofing and exterior finishes that blend the addition with the rest of the home.' },
      { title: 'Interior finishes', text: 'Drywall, flooring, trim, paint, and the details that make the room feel original to the house.' }
    ],
    sections: [
      {
        title: 'What to think about first',
        body: [
          'Start with how the new room will be used: a bedroom, a home office, a larger family room, or a primary suite. Use affects size, layout, windows, heating and cooling, and whether plumbing is needed.',
          'Your lot also matters. Setbacks from property lines, easements, lot coverage limits, and HOA rules can affect where an addition can go and how large it can be.'
        ]
      },
      {
        title: 'Plans, permits, and inspections',
        body: [
          'Room additions create new habitable space, so they generally require plans and a building permit, with inspections at several stages. California energy code (Title 24) requirements also apply to new conditioned space. Requirements depend on the jurisdiction; see the [City of Sacramento Building Division](https://www.cityofsacramento.gov/community-development/building) or [Sacramento County Building Permits & Inspection](https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html).'
        ]
      },
      {
        title: 'Cost and timeline',
        body: [
          'Size, foundation type, roof tie-in, plumbing and electrical needs, finish selections, design and permit review times, and inspection scheduling all affect cost and schedule. We give you an estimate based on your specific scope and explain the assumptions behind it.'
        ]
      }
    ],
    costFactors: [
      'Size and use of the new space',
      'Foundation type and site conditions',
      'How the roof and walls connect to the existing house',
      'Plumbing, electrical, heating and cooling needs',
      'Design, engineering, and permit requirements',
      'Interior and exterior finish selections'
    ],
    expectations: [
      'Consultation about your goals and property',
      'Site review and early feasibility questions',
      'Plans, scope, and estimate',
      'Permits and scheduling',
      'Construction with inspections at required stages',
      'Final walkthrough and close-out'
    ],
    related: ['home-remodeling', 'kitchen-remodeling', 'bathroom-remodeling', 'flooring-installation'],
    faqCategory: 'additions',
    projectCategory: 'room-addition',
    images: []
  },

  // ───────────────────────── Flooring ─────────────────────────
  {
    slug: 'flooring-installation',
    name: 'Flooring Installation',
    shortName: 'Flooring installation',
    group: 'flooring',
    enabled: true,
    icon: 'Layers',
    seoTitle: `Flooring Installation in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Flooring installation in Sacramento: vinyl plank, laminate, engineered wood, and tile, with proper subfloor prep and clean transitions. Free estimates.',
    heroTitle: 'Flooring installation in Sacramento',
    heroLead:
      'New floors change how a whole home feels. We install flooring on properly prepared subfloors, with clean transitions between rooms and trim that finishes the job.',
    cardText: 'Vinyl plank, laminate, engineered wood, and tile floors.',
    intro: [
      'Most flooring problems, such as gaps, squeaks, peaking joints, or cracked tiles, come from what is underneath. A flat, dry, solid subfloor is the foundation of a floor that lasts.',
      'We install flooring for Sacramento homes and commercial spaces, as a standalone project or as part of a larger remodel. During your estimate we look at the existing floor and subfloor, talk through material options, and explain the preparation your project needs.'
    ],
    scopeTitle: 'Flooring we install',
    scope: [
      { title: 'Luxury vinyl plank (LVP)', text: 'Water-resistant, durable flooring popular for kitchens, living areas, and rentals.' },
      { title: 'Laminate', text: 'An affordable, hard-wearing option for dry areas of the home.' },
      { title: 'Engineered wood', text: 'Real wood surface with a stable construction suited to many rooms.' },
      { title: 'Tile floors', text: 'Porcelain and ceramic tile for kitchens, bathrooms, and entries.' },
      { title: 'Removal of old flooring', text: 'Taking out carpet, vinyl, or tile and preparing the subfloor.' },
      { title: 'Baseboards and transitions', text: 'Trim, thresholds, and transition strips that finish each room.' }
    ],
    sections: [
      {
        title: 'Choosing the right floor',
        body: [
          'Think about where the floor goes and how it will be used. Kitchens, bathrooms, and laundry rooms need materials that tolerate moisture. Homes with pets or kids benefit from scratch-resistant surfaces. Living areas and bedrooms open up more options.',
          'Product quality varies widely within each category. Wear layer thickness for vinyl plank, AC rating for laminate, and veneer thickness for engineered wood are useful numbers to compare.'
        ]
      },
      {
        title: 'Subfloor preparation',
        body: [
          'Before new flooring goes down, the subfloor needs to be clean, dry, and flat within the tolerance the product requires. That can mean fixing loose subfloor panels, leveling low spots, or addressing moisture on concrete slabs. Many manufacturers also recommend letting flooring acclimate to the home before installation.'
        ]
      },
      {
        title: 'Finishing details',
        body: [
          'Transitions between rooms, door clearances, stair edges, and baseboards make the difference between a floor that looks installed and one that looks finished. We discuss these details with you before work starts.'
        ]
      }
    ],
    costFactors: [
      'Total square footage and number of rooms',
      'Flooring material and product line',
      'Removal and disposal of existing flooring',
      'Subfloor repair or leveling',
      'Stairs, transitions, and door adjustments',
      'Baseboard and trim work'
    ],
    expectations: [
      'Tell us the rooms, approximate size, and flooring you have in mind',
      'Site visit to measure and check the subfloor',
      'Estimate with preparation and materials explained',
      'Material delivered and acclimated if required',
      'Removal, preparation, installation, and trim',
      'Final walkthrough and care guidance'
    ],
    related: ['epoxy-flooring', 'tile-installation', 'baseboard-installation', 'kitchen-remodeling'],
    faqCategory: 'flooring',
    projectCategory: 'flooring',
    images: []
  },

  // ───────────────────────── Epoxy ─────────────────────────
  {
    slug: 'epoxy-flooring',
    name: 'Epoxy Flooring',
    shortName: 'Epoxy flooring',
    group: 'flooring',
    enabled: true,
    icon: 'PaintBucket',
    seoTitle: `Epoxy Flooring in ${SAC}, CA | Garage & Concrete Floors`,
    metaDescription:
      'Epoxy flooring in Sacramento for garages, workshops, and commercial concrete floors. Proper surface preparation for a durable finish. Free estimates.',
    heroTitle: 'Epoxy flooring in Sacramento',
    heroLead:
      'Turn a bare concrete floor into a durable, easy-to-clean surface. We prepare the concrete properly and apply epoxy coatings for garages, workshops, and commercial spaces.',
    cardText: 'Durable coatings for garages and concrete floors.',
    intro: [
      'An epoxy floor coating protects concrete from stains, dust, and wear while making it easier to clean and brighter to work on. It is a popular upgrade for garages, workshops, and some commercial spaces.',
      'The finished look gets the attention, but preparation decides how long an epoxy floor lasts. Coatings that peel or lift usually trace back to concrete that was not properly cleaned, profiled, or checked for moisture.'
    ],
    scopeTitle: 'Epoxy flooring work',
    scope: [
      { title: 'Garage floors', text: 'A clean, durable surface for parking, storage, and projects.' },
      { title: 'Workshops and utility areas', text: 'Coatings that hold up to foot traffic, tools, and spills.' },
      { title: 'Commercial concrete', text: 'Floors for commercial spaces, scheduled around operations.' },
      { title: 'Decorative flake finishes', text: 'Color flakes broadcast into the coating for texture and a finished look.' },
      { title: 'Crack and surface repair', text: 'Filling cracks and repairing damaged areas before coating.' },
      { title: 'Old coating removal', text: 'Removing failing coatings or paint before a new system goes down.' }
    ],
    sections: [
      {
        title: 'Why preparation matters',
        body: [
          'Epoxy needs a clean, open concrete surface to bond. Preparation typically includes removing oil and contaminants, opening the surface mechanically, and repairing cracks. Concrete that holds moisture can cause a coating to fail, so moisture is something to check before coating.'
        ]
      },
      {
        title: 'Indoor and outdoor use',
        body: [
          'Many epoxy coatings can yellow or fade with prolonged sun exposure. For areas that get direct sunlight, a UV-stable topcoat or a different coating system may be a better fit. We discuss the right approach for your space during the estimate.'
        ]
      },
      {
        title: 'Cure time',
        body: [
          'Each coating has its own cure schedule set by the manufacturer. Expect a period before light foot traffic and a longer period before vehicles can park on the floor. We give you the schedule for your specific system.'
        ]
      }
    ],
    costFactors: [
      'Floor area',
      'Condition of the concrete, including cracks and stains',
      'Removal of existing coatings',
      'Coating system and finish (solid color or flake)',
      'Moisture conditions in the slab',
      'Access and clearing of the space'
    ],
    expectations: [
      'Tell us the space, approximate size, and how it is used',
      'Site visit to check the concrete condition',
      'Estimate with preparation and coating system explained',
      'Space cleared before the work begins',
      'Preparation, repairs, coating, and cure',
      'Final walkthrough and care guidance'
    ],
    related: ['flooring-installation', 'power-washing', 'tile-installation', 'handyman-services'],
    faqCategory: 'flooring',
    projectCategory: 'flooring',
    images: []
  },

  // ───────────────────────── Tile (Ads campaign 2) ─────────────────────────
  {
    slug: 'tile-installation',
    name: 'Tile Installation',
    shortName: 'Tile installation',
    group: 'flooring',
    enabled: true,
    icon: 'Grid3x3',
    adsLanding: true,
    seoTitle: `Tile Installation in ${SAC}, CA | Floors, Showers & Walls`,
    metaDescription:
      'Tile installation in Sacramento for floors, showers, walls, and backsplashes. Proper prep and waterproofing. Request a free tile estimate.',
    heroTitle: 'Tile installation in Sacramento',
    heroLead:
      'Floors, showers, walls, and backsplashes installed on a properly prepared surface, so the tile stays flat, the grout lines stay straight, and wet areas stay dry.',
    cardText: 'Floor, shower, wall, and backsplash tile on properly prepared surfaces.',
    intro: [
      'Tile is one of the most durable finishes in a home, but only when it goes down on a sound, flat, and correctly prepared surface. Cracked tiles, hollow spots, and failing grout almost always trace back to what happened before the first tile was set.',
      'We install tile for homes and commercial spaces in the Sacramento area, as standalone projects or as part of a bathroom or kitchen remodel. During your estimate we look at the existing surface, talk through tile options, and explain the preparation your project needs.'
    ],
    scopeTitle: 'Tile surfaces we install',
    scope: [
      { title: 'Floors', text: 'Kitchens, bathrooms, entries, laundry rooms, and living areas.' },
      { title: 'Shower walls and floors', text: 'Tile over a waterproofed, correctly sloped shower assembly.' },
      { title: 'Tub surrounds', text: 'Replacing old surrounds with new tile and clean transitions.' },
      { title: 'Backsplashes', text: 'Kitchen and bar backsplashes with neat cuts around outlets and windows.' },
      { title: 'Feature walls', text: 'Accent walls and decorative layouts where the design calls for it.' },
      { title: 'Tile replacement', text: 'Removing worn or damaged tile and installing new tile on a repaired base.' }
    ],
    sections: [
      {
        title: 'Types of tile',
        body: [
          'Porcelain is dense, absorbs very little water, and works well on floors and in showers. Ceramic is lighter and often used on walls and backsplashes. Natural stone such as marble, travertine, or slate offers variation from piece to piece but usually needs sealing and gentler cleaning. Glass and mosaic tiles work well as accents but can take more time to install cleanly.',
          'Tile size matters too. Large-format tile creates a clean look with fewer grout lines, but it needs a flatter surface and careful handling to avoid lippage, where one tile edge sits higher than its neighbor.'
        ]
      },
      {
        title: 'Preparation decides how long tile lasts',
        body: [
          'Before tile goes down, the surface needs to be clean, structurally sound, and flat within the tolerance the tile requires. On floors, that may mean addressing subfloor movement or using an underlayment. On walls, it means the right backer board rather than standard drywall in wet areas.',
          'In showers and other wet areas, tile sits over a waterproofing layer. Grout and tile shed water, but the waterproofing is what protects the framing behind them.'
        ]
      },
      {
        title: 'Layout and finishing details',
        body: [
          'A good layout plans where cuts will fall so that thin slivers do not end up at doorways or along the most visible wall. We also discuss grout color, transitions to other flooring, and edge trims, since these details make a big difference in how finished the room looks.'
        ]
      }
    ],
    costFactors: [
      'Total area and number of surfaces',
      'Tile type, size, and pattern (diagonal and herringbone take longer)',
      'Removal of existing tile or flooring',
      'Surface repair or leveling needed before installation',
      'Waterproofing requirements for wet areas',
      'Trim, niches, and transitions'
    ],
    expectations: [
      'Tell us the area, the surface, and whether tile is new or a replacement',
      'We review the existing surface and measure',
      'You receive a scope and estimate with prep work explained',
      'Tile and materials are confirmed and on site before work starts',
      'Prep, layout, setting, grouting, and sealing where required',
      'Final cleanup and care guidance'
    ],
    related: ['bathroom-remodeling', 'kitchen-remodeling', 'flooring-installation', 'baseboard-installation'],
    faqCategory: 'flooring',
    projectCategory: 'tile',
    images: []
  },

  // ───────────────────────── Baseboards ─────────────────────────
  {
    slug: 'baseboard-installation',
    name: 'Baseboard Installation',
    shortName: 'Baseboard installation',
    group: 'flooring',
    enabled: true,
    icon: 'Ruler',
    seoTitle: `Baseboard Installation in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Baseboard installation in Sacramento: new or replacement baseboards, tight corners, caulk, and paint. Often paired with new flooring. Free estimates.',
    heroTitle: 'Baseboard installation in Sacramento',
    heroLead:
      'Baseboards finish the line between floor and wall. We install new and replacement baseboards with tight joints, clean corners, and a painted finish.',
    cardText: 'New and replacement baseboards with clean corners.',
    intro: [
      'Baseboards cover the gap between flooring and drywall, protect walls from bumps and vacuum cleaners, and give a room a finished look. Taller or more detailed profiles can make an ordinary room feel more custom.',
      'Baseboards are often replaced together with new flooring, since old trim rarely lines up with a new floor height. We also install baseboards as a standalone upgrade.'
    ],
    scopeTitle: 'Baseboard work',
    scope: [
      { title: 'New baseboards', text: 'Installing baseboards in new rooms, additions, or areas without trim.' },
      { title: 'Baseboard replacement', text: 'Removing old, damaged, or dated baseboards and installing new ones.' },
      { title: 'With new flooring', text: 'Installing trim after flooring so the transition looks clean.' },
      { title: 'Taller profiles', text: 'Upgrading to taller or more detailed baseboards.' },
      { title: 'Shoe molding and quarter round', text: 'Trim that covers small gaps along the floor where needed.' },
      { title: 'Caulk and paint', text: 'Filling nail holes and seams, caulking, and painting for a finished look.' }
    ],
    sections: [
      {
        title: 'Materials and profiles',
        body: [
          'MDF baseboards are affordable, smooth, and take paint well, which makes them a common choice for painted trim. Solid wood is more resistant to moisture and impact and can be stained. In bathrooms and laundry rooms, moisture-resistant options are worth considering.',
          'Profile height should suit the room. Taller baseboards tend to look better with higher ceilings, while simpler profiles fit modern interiors.'
        ]
      },
      {
        title: 'The details that show',
        body: [
          'Inside corners are usually coped rather than simply mitered, so the joint stays tight even as the house moves slightly over time. Outside corners, scarf joints on long walls, and transitions at door casings all affect how finished the result looks.'
        ]
      }
    ],
    costFactors: [
      'Linear footage and number of rooms',
      'Baseboard material and profile',
      'Removal of existing trim',
      'Number of corners and door openings',
      'Wall and floor conditions',
      'Caulking and painting'
    ],
    expectations: [
      'Tell us the rooms and the look you want',
      'Measurement and profile selection',
      'Estimate covering trim, installation, and finishing',
      'Installation, caulking, and paint',
      'Final walkthrough'
    ],
    related: ['flooring-installation', 'interior-painting', 'drywall-repair', 'handyman-services'],
    faqCategory: 'flooring',
    faqIds: ['estimate-info'],
    projectCategory: 'flooring',
    images: []
  },

  // ───────────────────────── Interior painting ─────────────────────────
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortName: 'Interior painting',
    group: 'exterior',
    enabled: true,
    icon: 'PaintRoller',
    seoTitle: `Interior Painting in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Interior painting in Sacramento for walls, ceilings, trim, and doors. Careful prep, clean lines, and protected furnishings. Request a free estimate.',
    heroTitle: 'Interior painting in Sacramento',
    heroLead:
      'Fresh paint changes how a room feels. We prepare surfaces properly, protect your floors and furniture, and leave clean lines at ceilings, trim, and cabinets.',
    cardText: 'Walls, ceilings, trim, and doors with proper surface prep.',
    intro: [
      'Interior painting looks simple, but the finish depends on preparation: patching, sanding, caulking, and priming where needed. Skipping those steps shows up quickly as flashing, peeling, or visible repairs under new paint.',
      'We paint homes and commercial interiors in the Sacramento area, from a single room to whole-house repaints, and as the finishing step of larger remodels.'
    ],
    scopeTitle: 'Interior painting work',
    scope: [
      { title: 'Walls and ceilings', text: 'Single rooms, open living areas, stairwells, and whole-house repaints.' },
      { title: 'Trim and baseboards', text: 'Crisp, durable finishes on trim, casing, and baseboards.' },
      { title: 'Doors', text: 'Interior doors and frames painted to match or contrast.' },
      { title: 'Drywall patching', text: 'Repairing small holes, dents, and cracks before painting.' },
      { title: 'Color changes', text: 'Moving from dark to light colors or the other way, with primer where needed.' },
      { title: 'Commercial interiors', text: 'Offices and commercial spaces, scheduled to limit disruption.' }
    ],
    sections: [
      {
        title: 'Choosing paint sheen',
        body: [
          'Flat and matte finishes hide surface imperfections well and suit ceilings and low-traffic rooms. Eggshell and satin are easier to clean and work for most living areas and hallways. Semi-gloss is common on trim, doors, and in bathrooms, where durability and moisture resistance matter more.',
          'If you are unsure, test samples on your wall. Color can look very different under Sacramento afternoon sun than it does on a small chip in the store.'
        ]
      },
      {
        title: 'Preparing your home',
        body: [
          'It helps to clear small items, wall hangings, and fragile pieces before painting day. We protect floors and remaining furniture, and we discuss which rooms will be in progress so you can plan around them.'
        ]
      }
    ],
    costFactors: [
      'Square footage of walls and ceilings',
      'Ceiling height and stairwell access',
      'Amount of patching and surface preparation',
      'Number of colors and significant color changes',
      'Trim, doors, and detailed millwork',
      'Paint product selection'
    ],
    expectations: [
      'Tell us which rooms and surfaces you want painted',
      'Walkthrough to check surfaces and measure',
      'Estimate with prep and product noted',
      'Color and sheen confirmed before the start date',
      'Protection, prep, priming where needed, and painting',
      'Touch-ups and final walkthrough'
    ],
    related: ['exterior-painting', 'drywall-repair', 'baseboard-installation', 'home-remodeling'],
    faqCategory: 'painting',
    projectCategory: 'interior-painting',
    images: []
  },

  // ───────────────────────── Exterior painting ─────────────────────────
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    shortName: 'Exterior painting',
    group: 'exterior',
    enabled: true,
    icon: 'Paintbrush',
    seoTitle: `Exterior Painting in ${SAC}, CA | Homes & Commercial`,
    metaDescription:
      'Exterior painting in Sacramento for homes and commercial buildings. Surface cleaning, repairs, priming, and durable coatings. Get a free estimate.',
    heroTitle: 'Exterior painting in Sacramento',
    heroLead:
      'Sacramento summers are hard on exterior paint. We clean, repair, and prime the surfaces that need it, then apply coatings suited to the material and the sun exposure.',
    cardText: 'Prep, repairs, and durable coatings for walls, trim, and stucco.',
    intro: [
      'Exterior paint protects your building as much as it improves how it looks. Long, hot, dry summers and strong UV exposure in the Sacramento Valley can cause fading, chalking, and cracking, especially on south- and west-facing walls.',
      'We paint home and commercial exteriors, including wood and fiber cement exteriors, stucco, trim, fascia, and doors. Before painting, we look at the condition of the surface and note any areas that need repair so the new paint has a sound base.'
    ],
    scopeTitle: 'Exterior painting work',
    scope: [
      { title: 'Wood and fiber cement exteriors', text: 'Paintable exterior wall surfaces, cleaned and prepared before coating.' },
      { title: 'Stucco', text: 'Coatings suited to stucco, with crack repair before painting.' },
      { title: 'Trim, fascia, and eaves', text: 'The details that frame the house and take the most weather.' },
      { title: 'Doors and garage doors', text: 'Entry and garage doors finished to match your color plan.' },
      { title: 'Fences and gates', text: 'Fences and gates painted or stained to protect the wood.' },
      { title: 'Commercial exteriors', text: 'Storefronts and commercial buildings, scheduled around operations.' }
    ],
    sections: [
      {
        title: 'Surface prep comes first',
        body: [
          'Paint only lasts as long as the surface underneath it. Exterior prep can include washing, scraping loose paint, sanding, replacing rotted wood, caulking gaps, and spot-priming bare areas. Pressure washing is often part of this step, with enough drying time before paint goes on.'
        ]
      },
      {
        title: 'Weather and timing',
        body: [
          'Paint manufacturers specify temperature and humidity ranges for application. In Sacramento, that usually means planning around both summer heat and winter rain. We schedule exterior work for suitable conditions and may adjust daily work areas to avoid painting surfaces in direct afternoon sun.'
        ]
      },
      {
        title: 'Older homes',
        body: [
          'Homes built before 1978 may have lead-based paint. Disturbing it requires specific work practices under federal rules. If your home falls in that age range, mention it in your request so it can be addressed during the estimate. The [EPA lead renovation page](https://www.epa.gov/lead/renovation-repair-and-painting-program) explains the requirements.'
        ]
      }
    ],
    costFactors: [
      'Size of the building and number of stories',
      'Surface material and condition',
      'Repairs needed before painting',
      'Number of colors and amount of trim detail',
      'Access, landscaping, and protection needs',
      'Coating selection'
    ],
    expectations: [
      'Share the property type and the surfaces to paint',
      'Exterior walkthrough to assess condition',
      'Estimate covering prep, repairs, and coatings',
      'Colors confirmed and work scheduled for suitable weather',
      'Cleaning, prep, priming, and painting',
      'Final inspection walk with you'
    ],
    related: ['power-washing', 'dry-rot-repair', 'fences-gates', 'interior-painting'],
    faqCategory: 'painting',
    projectCategory: 'exterior-painting',
    images: []
  },

  // ───────────────────────── Power washing ─────────────────────────
  {
    slug: 'power-washing',
    name: 'Pressure Washing',
    shortName: 'Pressure washing',
    group: 'exterior',
    enabled: true,
    icon: 'Droplets',
    seoTitle: `Pressure Washing & Power Washing in ${SAC}, CA`,
    metaDescription:
      'Pressure washing and power washing in Sacramento for driveways, walkways, patios, house exteriors, and fences. Request a free estimate.',
    heroTitle: 'Pressure washing in Sacramento',
    heroLead:
      'Remove dirt, mildew, and buildup from driveways, patios, house exteriors, and fences, either as a standalone service or as prep before exterior painting.',
    cardText: 'Driveways, patios, walls, and fences, or prep before painting.',
    intro: [
      'Pressure washing restores surfaces that have collected dirt, algae, and stains, and it is often the first step before painting or sealing. The key is matching pressure and technique to the surface: concrete can take far more than painted wood or older exterior surfaces.',
      'We offer pressure washing for homes and commercial properties in the Sacramento area, and we include it as surface prep in many exterior painting projects.'
    ],
    scopeTitle: 'Surfaces we clean',
    scope: [
      { title: 'Driveways and walkways', text: 'Concrete and pavers cleaned of dirt and surface stains.' },
      { title: 'Patios and pool decks', text: 'Outdoor living areas cleaned and refreshed.' },
      { title: 'House exterior walls', text: 'Appropriate pressure for stucco, wood, and painted surfaces to avoid damage.' },
      { title: 'Fences and gates', text: 'Wood fences and gates cleaned before staining or painting.' },
      { title: 'Pre-paint prep', text: 'Removing chalk, dirt, and loose material so paint bonds well.' }
    ],
    sections: [
      {
        title: 'Pressure washing versus soft washing',
        body: [
          'High pressure works well on concrete and masonry. Painted surfaces, wood, and some exterior wall materials need lower pressure and a gentler approach to avoid gouging, forcing water into walls, or stripping finishes. We choose the method for each surface.'
        ]
      },
      {
        title: 'Water use',
        body: [
          'Sacramento-area water agencies sometimes adopt outdoor water-use rules, especially during drought. We follow any rules that apply at the time of the work.'
        ]
      }
    ],
    costFactors: [
      'Total area to clean',
      'Surface types and condition',
      'Heavy staining, oil, or mildew',
      'Access and water supply',
      'Whether cleaning is part of a painting project'
    ],
    expectations: [
      'Tell us what needs cleaning and roughly how much',
      'Estimate based on area and surface type',
      'Plants and fixtures protected before washing',
      'Cleaning completed with appropriate methods'
    ],
    related: ['exterior-painting', 'fences-gates', 'epoxy-flooring', 'dry-rot-repair'],
    faqCategory: 'exterior',
    projectCategory: 'exterior-painting',
    images: []
  },

  // ───────────────────────── Fences & gates (two groups) ─────────────────────────
  {
    slug: 'fences-gates',
    name: 'Fences & Gates',
    shortName: 'Fences & gates',
    group: 'exterior',
    enabled: true,
    icon: 'Fence',
    seoTitle: `Fence & Gate Installation and Repair in ${SAC}, CA`,
    metaDescription:
      'Fence and gate installation and repair in Sacramento: new fences, replacement sections, posts, boards, and sagging gates. Request a free estimate.',
    heroTitle: 'Fences and gates in Sacramento',
    heroLead:
      'Whether you need a new fence around your yard or a repair to a leaning section or sagging gate, we build and fix fences and gates that stay solid and look right.',
    cardText: 'New fences and gates, plus repairs to posts, boards, and gates.',
    intro: [
      'A good fence gives you privacy, security, and a clear boundary, and a gate should open and latch easily for years. Both depend on the same fundamentals: well-set posts, straight lines, and hardware suited to the weight it carries.',
      'We build new fences and gates and repair existing ones for Sacramento homes and commercial properties. During the estimate we look at your property and the existing fence, and recommend a new fence, a replacement, or a repair based on what we find.'
    ],
    scopeTitle: 'Fence and gate services',
    scope: [],
    scopeGroups: [
      {
        id: 'installation',
        title: 'Installation',
        intro: 'New fences, full replacements, and gates built from the posts up.',
        items: [
          { title: 'New fence installation', text: 'Privacy, property line, and yard fences laid out and built to your plan.' },
          { title: 'Fence replacement', text: 'Removing an old fence and building a new one in its place.' },
          { title: 'Gates', text: 'Walk-through gates and wider gates sized to the opening, with sturdy frames and hardware.' },
          { title: 'Posts and footings', text: 'Posts set at proper depth so the fence stays straight over time.' },
          { title: 'Paint or stain', text: 'Finishing new fences and gates to protect the wood and match your property.' }
        ]
      },
      {
        id: 'repair',
        title: 'Repair',
        intro: 'Fixing the cause of the problem so the repair lasts, not just the visible damage.',
        items: [
          { title: 'Leaning or broken posts', text: 'Resetting or replacing posts that have rotted or loosened.' },
          { title: 'Boards and pickets', text: 'Replacing cracked, missing, or warped boards.' },
          { title: 'Rails', text: 'Repairing the horizontal members that hold the fence together.' },
          { title: 'Sagging gates', text: 'Re-squaring gate frames and replacing hinges and latches.' },
          { title: 'Storm damage', text: 'Sections damaged by wind, fallen branches, or impact.' }
        ]
      }
    ],
    sections: [
      {
        title: 'Repair or replace?',
        body: [
          'If the damage is limited to a few posts, boards, or a gate and the rest of the fence is sound, repair is usually the practical choice. When rot or leaning affects much of the fence, replacing sections or the whole fence may cost less over time. We explain what we see so you can decide.'
        ]
      },
      {
        title: 'Planning a new fence',
        body: [
          'Before building, confirm where the property line is, any HOA rules, and local height limits for front and back yards. Fences above certain heights, or in certain locations, may need a permit; check with the [City of Sacramento Building Division](https://www.cityofsacramento.gov/community-development/building) or [Sacramento County](https://development.saccounty.gov/us/en/building-permits-inspection/frequently-asked-questions.html). Underground utilities should be marked before digging; call 811 or visit [California 811](https://california811.org/).'
        ]
      },
      {
        title: 'Shared fences',
        body: [
          'Many residential fences sit on or near a property line and are shared with a neighbor. California has rules about shared boundary fences (Civil Code section 841). It is a good idea to talk with your neighbor before work begins on a shared fence.'
        ]
      },
      {
        title: 'Gates that keep working',
        body: [
          'Gates carry more stress than any other part of a fence. A solid frame, a well-set hinge post, and hardware rated for the gate size help prevent sagging. Wider openings may call for a double gate.'
        ]
      }
    ],
    costFactors: [
      'Length and height of the fence',
      'Fence material and style',
      'Number and size of gates',
      'Removal of an existing fence',
      'Ground conditions and access along the line',
      'Paint or stain'
    ],
    expectations: [
      'Tell us whether you need a new fence, a replacement, or a repair',
      'Site visit to measure and check posts, lines, and gates',
      'Estimate with recommendations',
      'Materials confirmed and utilities marked before digging',
      'Installation or repair, then cleanup'
    ],
    related: ['exterior-painting', 'power-washing', 'dry-rot-repair', 'handyman-services'],
    faqCategory: 'exterior',
    projectCategory: 'fence',
    images: []
  },

  // ───────────────────────── Drywall ─────────────────────────
  {
    slug: 'drywall-repair',
    name: 'Drywall Repair',
    shortName: 'Drywall repair',
    group: 'repairs',
    enabled: true,
    icon: 'PanelTop',
    seoTitle: `Drywall Repair in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Drywall repair in Sacramento: holes, cracks, water damage, and texture matching, ready for paint. Request a free estimate.',
    heroTitle: 'Drywall repair in Sacramento',
    heroLead:
      'From small holes to water-damaged sections, we repair drywall so the patch disappears: solid backing, smooth finishing, matched texture, and paint.',
    cardText: 'Holes, cracks, and water damage repaired and texture matched.',
    intro: [
      'Drywall damage happens in every home: doorknob holes, cracks above doors and windows, nail pops, and damage left behind by plumbing leaks or electrical work. The goal of a good repair is that you cannot tell where it was.',
      'We repair drywall in homes and commercial spaces around Sacramento, as a standalone job or before painting. During the estimate we look at the damage and, for water-related damage, check whether the source has been addressed.'
    ],
    scopeTitle: 'Drywall repairs we handle',
    scope: [
      { title: 'Holes and dents', text: 'From small dings to larger holes that need a new piece of drywall.' },
      { title: 'Cracks', text: 'Cracks at corners, seams, and above doors and windows.' },
      { title: 'Water damage', text: 'Replacing stained or soft drywall after the leak has been fixed.' },
      { title: 'Nail pops and seams', text: 'Resetting fasteners and refinishing loose or visible seams.' },
      { title: 'Texture matching', text: 'Matching common textures such as orange peel and knockdown.' },
      { title: 'Paint-ready finish', text: 'Primed and ready for paint, or painted as part of the job.' }
    ],
    sections: [
      {
        title: 'Why patches show',
        body: [
          'A patch usually shows for one of three reasons: the surface is not flat, the texture does not match, or the paint sheen is different from the rest of the wall. Careful feathering, texture matching, primer, and painting the full wall section where needed help a repair blend in.'
        ]
      },
      {
        title: 'Water-damaged drywall',
        body: [
          'Drywall that has been wet can lose strength and may develop mold. Before repairing, the source of the water needs to be fixed and the area dried. Severely damaged sections are cut out and replaced rather than patched.'
        ]
      }
    ],
    costFactors: [
      'Size and number of repairs',
      'Wall or ceiling location',
      'Water damage and section replacement',
      'Texture type and matching',
      'Painting after the repair',
      'Access and furniture moving'
    ],
    expectations: [
      'Send photos or describe the damage',
      'Assessment on site',
      'Estimate covering repair and finishing',
      'Repair, texture, prime, and paint as agreed',
      'Cleanup and final walkthrough'
    ],
    related: ['interior-painting', 'baseboard-installation', 'handyman-services', 'dry-rot-repair'],
    faqCategory: 'repairs',
    projectCategory: 'repairs',
    images: []
  },

  // ───────────────────────── Dry rot ─────────────────────────
  {
    slug: 'dry-rot-repair',
    name: 'Dry Rot Repair',
    shortName: 'Dry rot repair',
    group: 'repairs',
    enabled: true,
    icon: 'TreeDeciduous',
    seoTitle: `Dry Rot Repair in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Dry rot repair in Sacramento: rotted fascia, trim, window sills, door frames, and exterior wood replaced and sealed. Request a free estimate.',
    heroTitle: 'Dry rot repair in Sacramento',
    heroLead:
      'Rotted wood weakens your home and lets more water in. We remove the damaged wood, replace it with sound material, and seal and paint it to help prevent the problem from returning.',
    cardText: 'Rotted fascia, trim, sills, and exterior wood replaced.',
    intro: [
      'Despite its name, dry rot starts with moisture. When wood stays wet long enough, fungi break it down, and the wood becomes soft, crumbly, or cracked. Fascia boards, window sills, door frames, exterior trim, and the bottoms of posts are common trouble spots.',
      'We repair dry rot on homes and commercial properties around Sacramento. Good repair means removing all of the damaged wood, replacing it with sound material, and addressing the moisture source where possible.'
    ],
    scopeTitle: 'Dry rot repairs',
    scope: [
      { title: 'Fascia and eaves', text: 'Replacing rotted fascia boards and trim along the roof edge.' },
      { title: 'Window sills and trim', text: 'Repairing exterior trim around windows where water collects.' },
      { title: 'Door frames and thresholds', text: 'Replacing rotted jambs and trim at exterior doors.' },
      { title: 'Exterior trim and wood surfaces', text: 'Corner boards, wood exterior boards, and decorative trim.' },
      { title: 'Posts and fence wood', text: 'Rotted posts and wood at ground level.' },
      { title: 'Seal and paint', text: 'Priming, caulking, and painting the new wood to protect it.' }
    ],
    sections: [
      {
        title: 'Finding the full extent',
        body: [
          'Rot is often larger than it looks from the outside. Probing the wood shows how far the damage goes. Patching over soft wood or filling only the visible area tends to fail, so damaged sections are cut back to solid material.'
        ]
      },
      {
        title: 'Pest inspection reports',
        body: [
          'In California, a wood destroying pests and organisms inspection is common during home sales, and these reports often list fungus or dry rot that needs repair. If you have a report, share it with us when you request an estimate. Termite treatment itself is performed by licensed pest control companies.'
        ]
      },
      {
        title: 'Preventing it from coming back',
        body: [
          'Keeping wood painted, keeping gutters clear, sealing gaps, and directing water away from wood surfaces all help prevent new rot. We point out moisture sources we see during the repair.'
        ]
      }
    ],
    costFactors: [
      'Extent of the damaged wood',
      'Location and height (ladders or scaffolding)',
      'Type and profile of trim to match',
      'Hidden damage found when wood is opened',
      'Priming and painting',
      'Number of separate areas'
    ],
    expectations: [
      'Share photos or a pest inspection report if you have one',
      'Inspection and probing of affected areas',
      'Estimate with the areas to be replaced',
      'Removal, replacement, sealing, and paint',
      'Final walkthrough'
    ],
    related: ['exterior-painting', 'fences-gates', 'drywall-repair', 'handyman-services'],
    faqCategory: 'repairs',
    projectCategory: 'repairs',
    images: []
  },

  // ───────────────────────── Handyman ─────────────────────────
  {
    slug: 'handyman-services',
    name: 'Handyman Services',
    shortName: 'Handyman services',
    group: 'repairs',
    enabled: true,
    icon: 'Wrench',
    seoTitle: `Handyman Services in ${SAC}, CA | Licensed Contractor`,
    metaDescription:
      'Handyman services in Sacramento from a licensed Class B contractor: small repairs, installations, and punch lists for homes and businesses.',
    heroTitle: 'Handyman services in Sacramento',
    heroLead:
      'Small jobs still deserve careful work. We take care of repairs, installations, and punch-list items around your home or business, handled by a licensed general contractor.',
    cardText: 'Small repairs, installations, and punch lists.',
    intro: [
      'Most homes collect a list of small jobs: a door that sticks, a loose trim piece, a patch that needs paint, something to install. Handling several of them in one visit is often the most efficient way to get them done.',
      'True Arm Construction is a licensed Class B General Building Contractor (#1128503). Send us your list, and we will tell you which items we can take care of and put together an estimate.'
    ],
    scopeTitle: 'Common handyman jobs',
    scope: [
      { title: 'Small repairs', text: 'Doors, trim, cabinets, and other wear-and-tear fixes.' },
      { title: 'Drywall touch-ups', text: 'Patching holes and dings, with paint touch-ups.' },
      { title: 'Installations', text: 'Shelving, hardware, fixtures, and similar items.' },
      { title: 'Trim and baseboards', text: 'Replacing damaged trim or adding baseboard sections.' },
      { title: 'Move-in and move-out lists', text: 'Getting a home ready for new occupants or a sale.' },
      { title: 'Rental property upkeep', text: 'Repairs between tenants for owners and property managers.' }
    ],
    sections: [
      {
        title: 'Make a list',
        body: [
          'Write down every item, with a photo of each if possible. Grouping tasks into one visit usually costs less than separate trips, and it helps us plan the materials and time needed.'
        ]
      },
      {
        title: 'When a small job is bigger',
        body: [
          'Sometimes a small job reveals a larger problem, like a soft floor near a toilet or a stain on a ceiling. When that happens, we explain what we found and the options before doing more work.'
        ]
      }
    ],
    costFactors: [
      'Number and type of tasks',
      'Materials and parts needed',
      'Access and working height',
      'Whether painting or finishing is included',
      'Conditions found during the work'
    ],
    expectations: [
      'Send your list, ideally with photos',
      'Review and estimate',
      'Scheduled visit with materials planned',
      'Work completed and checked with you'
    ],
    related: ['drywall-repair', 'dry-rot-repair', 'baseboard-installation', 'interior-painting'],
    faqCategory: 'repairs',
    projectCategory: 'repairs',
    images: []
  }
]

export const enabledServices = services.filter((s) => s.enabled)

export function getService(slug: string): Service | undefined {
  return enabledServices.find((s) => s.slug === slug)
}

export function servicesByGroup(group: ServiceGroupId): Service[] {
  return enabledServices.filter((s) => s.group === group)
}

/** Services featured on the homepage, in order */
export const featuredServiceSlugs = [
  'kitchen-remodeling',
  'bathroom-remodeling',
  'room-additions',
  'flooring-installation',
  'interior-painting',
  'fences-gates'
]
