import type { Service, ServiceGroup, ServiceGroupId } from '../types'

/**
 * Service catalogue. Source: client-supplied list
 * (Tiles, Bathroom, Interior Paint, Exterior Paint, Fence Repair, Siding,
 *  Wall Install, Power Wash, Window, Gazebo) + reported ground-up construction.
 *
 * Copy is written to be accurate without claiming unconfirmed specialties.
 * Items marked with `scopeNote` need the client to confirm exact scope.
 * Add photos to `images` (see docs/ASSETS.md); empty arrays show labeled placeholders.
 */

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'remodeling',
    name: 'Remodeling & interiors',
    description: 'Bathrooms, interior painting, walls, and windows.'
  },
  {
    id: 'tile',
    name: 'Tile & surfaces',
    description: 'Floor, wall, and shower tile installation.'
  },
  {
    id: 'exterior',
    name: 'Exterior & property',
    description: 'Painting, siding, fences, and pressure washing.'
  },
  {
    id: 'outdoor',
    name: 'Outdoor structures',
    description: 'Gazebos and backyard structures.'
  },
  {
    id: 'construction',
    name: 'General & new construction',
    description: 'Ground-up residential and commercial projects.'
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
      'Home remodeling in Sacramento, CA: bathrooms, tile, interior painting, walls, and windows. Licensed Class B contractor. Request a free estimate.',
    heroTitle: 'Home remodeling in Sacramento',
    heroLead:
      'Update the rooms you use every day. We handle bathroom remodels, tile, interior painting, and related improvements for Sacramento homes and commercial spaces, with one contractor coordinating the work.',
    cardText: 'Room updates and renovations coordinated by one licensed contractor.',
    intro: [
      'A remodel usually starts with one problem: a bathroom that no longer works for your family, worn flooring, or rooms that feel dated. Good remodeling work solves that problem without creating new ones, which comes down to accurate scope, clear decisions up front, and careful work on site.',
      'True Arm Construction holds a California Class B General Building Contractor license (#1128503). A Class B license allows a contractor to take on projects that involve multiple building trades, which is what most remodels are. We start with a conversation about what you want to change, then put together a scope and estimate you can review before any work begins.'
    ],
    scopeTitle: 'Remodeling work we take on',
    scope: [
      { title: 'Bathroom remodels', text: 'From vanity and fixture updates to full layout changes, including tile and shower work.' },
      { title: 'Tile installation', text: 'Floors, walls, backsplashes, and shower surrounds in porcelain, ceramic, and natural stone.' },
      { title: 'Interior painting', text: 'Walls, ceilings, trim, and doors, with the surface prep that makes paint last.' },
      { title: 'Wall work', text: 'Wall installation projects scoped to your space. Ask us about your specific project.' },
      { title: 'Window services', text: 'Window-related improvements discussed case by case during your estimate.' },
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
    related: ['bathroom-remodeling', 'tile-installation', 'interior-painting', 'wall-installation'],
    faqCategory: 'general',
    faqIds: ['prepare-remodel', 'permits', 'estimate-info'],
    projectCategory: 'bathroom',
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
    related: ['tile-installation', 'interior-painting', 'home-remodeling', 'wall-installation'],
    faqCategory: 'bathroom',
    projectCategory: 'bathroom',
    images: []
  },

  // ───────────────────────── Tile (Ads campaign 2) ─────────────────────────
  {
    slug: 'tile-installation',
    name: 'Tile Installation',
    shortName: 'Tile installation',
    group: 'tile',
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
    related: ['bathroom-remodeling', 'home-remodeling', 'interior-painting', 'wall-installation'],
    faqCategory: 'tile',
    projectCategory: 'tile',
    images: []
  },

  // ───────────────────────── Interior painting ─────────────────────────
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    shortName: 'Interior painting',
    group: 'remodeling',
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
    related: ['exterior-painting', 'home-remodeling', 'wall-installation', 'bathroom-remodeling'],
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
    cardText: 'Prep, repairs, and durable coatings for siding, trim, and stucco.',
    intro: [
      'Exterior paint protects your building as much as it improves how it looks. Long, hot, dry summers and strong UV exposure in the Sacramento Valley can cause fading, chalking, and cracking, especially on south- and west-facing walls.',
      'We paint home and commercial exteriors, including siding, trim, fascia, doors, and stucco. Before painting, we look at the condition of the surface and note any areas that need repair so the new paint has a sound base.'
    ],
    scopeTitle: 'Exterior painting work',
    scope: [
      { title: 'Siding', text: 'Wood, fiber cement, and other paintable siding materials.' },
      { title: 'Stucco', text: 'Coatings suited to stucco, with crack repair before painting.' },
      { title: 'Trim, fascia, and eaves', text: 'The details that frame the house and take the most weather.' },
      { title: 'Doors and garage doors', text: 'Entry and garage doors finished to match your color plan.' },
      { title: 'Fences and outbuildings', text: 'Fences, sheds, and gazebos painted or refreshed.' },
      { title: 'Commercial exteriors', text: 'Storefronts and commercial buildings, scheduled around operations.' }
    ],
    sections: [
      {
        title: 'Surface prep comes first',
        body: [
          'Paint only lasts as long as the surface underneath it. Exterior prep can include washing, scraping loose paint, sanding, replacing damaged wood, caulking gaps, and spot-priming bare areas. Pressure washing is often part of this step, with enough drying time before paint goes on.'
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
    related: ['power-washing', 'siding', 'fence-repair', 'interior-painting'],
    faqCategory: 'painting',
    projectCategory: 'exterior-painting',
    images: []
  },

  // ───────────────────────── Fence repair ─────────────────────────
  {
    slug: 'fence-repair',
    name: 'Fence Repair',
    shortName: 'Fence repair',
    group: 'exterior',
    enabled: true,
    icon: 'Fence',
    seoTitle: `Fence Repair in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Fence repair in Sacramento: leaning posts, broken boards, sagging gates, and storm damage. Request a free fence repair estimate.',
    heroTitle: 'Fence repair in Sacramento',
    heroLead:
      'A leaning section, a gate that will not latch, or boards that blew out in a winter storm. We assess the problem and repair what is needed to make the fence solid again.',
    cardText: 'Posts, boards, gates, and storm damage repaired.',
    intro: [
      'Most fence problems start at the posts. When a post rots at ground level or loosens in its footing, the whole section begins to lean, and boards and gates follow. Repairing the cause instead of only the visible damage makes the fix last.',
      'We repair fences for homes and commercial properties around Sacramento. During the estimate we look at posts, rails, boards, and gates and tell you whether a repair makes sense or whether a section is past saving.'
    ],
    scopeTitle: 'Fence repairs we handle',
    scope: [
      { title: 'Leaning or broken posts', text: 'Resetting or replacing posts that have rotted or loosened.' },
      { title: 'Board replacement', text: 'Replacing cracked, missing, or warped boards and pickets.' },
      { title: 'Rails and stringers', text: 'Fixing the horizontal members that hold the fence together.' },
      { title: 'Gates', text: 'Sagging gates, hinges, and latches adjusted or rebuilt.' },
      { title: 'Storm damage', text: 'Sections damaged by wind, falling branches, or impact.' },
      { title: 'Paint or stain', text: 'Finishing repaired sections so they match and last longer.' }
    ],
    sections: [
      {
        title: 'Repair or replace?',
        body: [
          'If the damage is limited to a few posts or boards and the rest of the fence is sound, repair is usually the practical choice. When rot or leaning affects much of the fence, replacing sections may cost less over time. We will explain what we see so you can make the call.'
        ]
      },
      {
        title: 'Shared fences and property lines',
        body: [
          'Many residential fences sit on or near a property line and are shared with a neighbor. California has rules about shared boundary fences (Civil Code section 841). It is a good idea to talk with your neighbor before work begins on a shared fence.'
        ]
      }
    ],
    costFactors: [
      'Number of posts and sections involved',
      'Fence material and height',
      'Condition of footings',
      'Gate repairs or hardware replacement',
      'Matching existing boards and finishes',
      'Access along the fence line'
    ],
    expectations: [
      'Tell us what is damaged and roughly how much',
      'On-site look at posts, rails, and gates',
      'Estimate with repair recommendations',
      'Materials matched as closely as practical',
      'Repairs completed and the area cleaned up'
    ],
    related: ['exterior-painting', 'power-washing', 'gazebo-construction', 'siding'],
    faqCategory: 'exterior',
    projectCategory: 'fence',
    images: []
  },

  // ───────────────────────── Siding ─────────────────────────
  {
    slug: 'siding',
    name: 'Siding Services',
    shortName: 'Siding',
    group: 'exterior',
    enabled: true,
    icon: 'PanelsTopLeft',
    seoTitle: `Siding Services in ${SAC}, CA | Repair & Installation`,
    metaDescription:
      'Siding services in Sacramento: damaged siding repair, section replacement, and new siding for homes and commercial buildings. Free estimates.',
    heroTitle: 'Siding services in Sacramento',
    heroLead:
      'Siding is the outer layer that keeps weather out of your walls. We repair damaged areas and install siding for homes and commercial buildings, with attention to the details that keep water out.',
    cardText: 'Repair and installation that protects the building envelope.',
    intro: [
      'Cracked, warped, or loose siding is more than a cosmetic issue. Gaps let water and pests reach the sheathing and framing behind it, and that damage tends to spread out of sight.',
      'We provide siding services for Sacramento-area properties. During the estimate we identify the existing siding material, check the condition of the wall behind any damaged areas when accessible, and recommend repair or replacement based on what we find.'
    ],
    scopeTitle: 'Siding work',
    scope: [
      { title: 'Damaged siding repair', text: 'Replacing cracked, rotted, or impact-damaged boards and panels.' },
      { title: 'Section replacement', text: 'Replacing larger areas while blending with existing siding.' },
      { title: 'New siding installation', text: 'Full or partial re-siding projects, scoped during the estimate.' },
      { title: 'Trim and flashing details', text: 'Corners, window and door trim, and flashing that keep water out.' },
      { title: 'Paint-ready finishing', text: 'Coordinating siding work with exterior painting.' }
    ],
    scopeNote:
      'Available siding materials and full re-siding scope are confirmed during your estimate.',
    sections: [
      {
        title: 'Common siding materials',
        body: [
          'Sacramento homes commonly have wood, fiber cement, stucco, or vinyl exteriors. Each material has different repair methods and lifespans. Fiber cement is popular for its fire and rot resistance; wood offers a traditional look but needs regular painting.'
        ]
      },
      {
        title: 'What happens behind the siding',
        body: [
          'Siding works together with a water-resistive barrier and flashing at windows, doors, and roof lines. When we remove damaged siding, we look at the barrier and sheathing underneath. If there is water damage, we will show you and discuss options before continuing.'
        ]
      }
    ],
    costFactors: [
      'Siding material and profile',
      'Area of repair or replacement',
      'Damage to sheathing or framing found behind the siding',
      'Trim, flashing, and corner details',
      'Building height and access',
      'Painting after installation'
    ],
    expectations: [
      'Share photos or describe the damaged areas',
      'Inspection of the siding and visible wall conditions',
      'Estimate with repair or replacement options',
      'Material ordered and matched where possible',
      'Installation, sealing, and coordination with painting'
    ],
    related: ['exterior-painting', 'power-washing', 'window-services', 'fence-repair'],
    faqCategory: 'exterior',
    projectCategory: 'siding',
    images: []
  },

  // ───────────────────────── Wall installation (scope TBC) ─────────────────────────
  {
    slug: 'wall-installation',
    name: 'Wall Installation',
    shortName: 'Wall installation',
    group: 'remodeling',
    enabled: true,
    icon: 'BrickWall',
    seoTitle: `Wall Installation in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Wall installation projects in Sacramento for homes and commercial spaces. Tell us about your space and we will scope the work. Free estimates.',
    heroTitle: 'Wall installation in Sacramento',
    heroLead:
      'Need a new wall to divide a room, close off a space, or change how an area works? Tell us what you have in mind and we will look at the space and scope the work with you.',
    cardText: 'New walls scoped to your space and how you want to use it.',
    intro: [
      'Adding a wall can create a home office, a separate bedroom, or a more practical commercial floor plan. The right approach depends on the space: what is above and below, whether the wall needs electrical outlets or switches, and how it will be finished.',
      'Because every wall project is different, we confirm the exact scope during your estimate. Describe the space and what you want the wall to do, and we will explain what the project involves.'
    ],
    scopeTitle: 'What to tell us about your wall project',
    scope: [
      { title: 'Where the wall will go', text: 'The room, approximate length, and ceiling height.' },
      { title: 'What it is for', text: 'Dividing a room, creating privacy, closing an opening, or a feature wall.' },
      { title: 'Doors or openings', text: 'Whether the new wall needs a doorway or pass-through.' },
      { title: 'Electrical needs', text: 'Outlets, switches, or lighting you want in or near the wall.' },
      { title: 'Finish', text: 'Paint, texture, tile, or other finishes you have in mind.' }
    ],
    scopeNote:
      'Wall installation scope varies by project and is confirmed during your estimate. Structural changes, such as removing or altering load-bearing walls, are evaluated case by case.',
    sections: [
      {
        title: 'Planning considerations',
        body: [
          'A new wall affects lighting, airflow, and how people move through a space. Check that heating and cooling vents, windows, and existing outlets will still work once the wall is in place. For bedrooms, building codes include requirements such as emergency escape openings, which is one reason scope is confirmed on site.',
          'Adding walls may require a permit, especially when electrical work is involved or when a space is being converted to a bedroom. We discuss this with you during the estimate.'
        ]
      }
    ],
    costFactors: [
      'Length and height of the wall',
      'Doors or openings in the wall',
      'Electrical work',
      'Finish level, texture, and paint',
      'Flooring and ceiling conditions where the wall meets them',
      'Permit requirements'
    ],
    expectations: [
      'Describe the space and what the wall should do',
      'Site visit to measure and check conditions',
      'Scope and estimate confirmed with you',
      'Work scheduled and completed with cleanup'
    ],
    related: ['home-remodeling', 'interior-painting', 'tile-installation', 'window-services'],
    faqCategory: 'general',
    faqIds: ['permits', 'estimate-info'],
    projectCategory: 'general-construction',
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
      'Pressure washing and power washing in Sacramento for driveways, walkways, patios, siding, and fences. Request a free estimate.',
    heroTitle: 'Pressure washing in Sacramento',
    heroLead:
      'Remove dirt, mildew, and buildup from driveways, patios, siding, and fences, either as a standalone service or as prep before exterior painting.',
    cardText: 'Driveways, patios, siding, and fences, or prep before painting.',
    intro: [
      'Pressure washing restores surfaces that have collected dirt, algae, and stains, and it is often the first step before painting or sealing. The key is matching pressure and technique to the surface: concrete can take far more than painted wood or older siding.',
      'We offer pressure washing for homes and commercial properties in the Sacramento area, and we include it as surface prep in many exterior painting projects.'
    ],
    scopeTitle: 'Surfaces we clean',
    scope: [
      { title: 'Driveways and walkways', text: 'Concrete and pavers cleaned of dirt and surface stains.' },
      { title: 'Patios and pool decks', text: 'Outdoor living areas cleaned and refreshed.' },
      { title: 'Siding and exterior walls', text: 'Appropriate pressure for the material to avoid damage.' },
      { title: 'Fences and gazebos', text: 'Wood and other outdoor structures cleaned before staining or painting.' },
      { title: 'Pre-paint prep', text: 'Removing chalk, dirt, and loose material so paint bonds well.' }
    ],
    sections: [
      {
        title: 'Pressure washing versus soft washing',
        body: [
          'High pressure works well on concrete and masonry. Painted surfaces, wood, and some siding materials need lower pressure and a gentler approach to avoid gouging, forcing water behind siding, or stripping finishes. We choose the method for each surface.'
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
    related: ['exterior-painting', 'fence-repair', 'siding', 'gazebo-construction'],
    faqCategory: 'exterior',
    projectCategory: 'exterior-painting',
    images: []
  },

  // ───────────────────────── Window services (scope TBC) ─────────────────────────
  {
    slug: 'window-services',
    name: 'Window Services',
    shortName: 'Window services',
    group: 'remodeling',
    enabled: true,
    icon: 'AppWindow',
    seoTitle: `Window Services in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Window services for Sacramento homes and commercial buildings. Describe your window project and request a free estimate.',
    heroTitle: 'Window services in Sacramento',
    heroLead:
      'Have a window project in mind? Tell us what is going on with your windows and what you want to achieve, and we will review it and explain the options.',
    cardText: 'Window projects reviewed and scoped case by case.',
    intro: [
      'Window projects range widely, from trim and finishing work around existing windows to larger changes. Since every situation is different, we review window work case by case and confirm exactly what we can take on during your estimate.',
      'When you contact us, describe the windows involved, what you have noticed (drafts, damage, stuck sashes, or simply a dated look), and what result you want.'
    ],
    scopeTitle: 'What to include in your request',
    scope: [
      { title: 'Number of windows', text: 'How many windows are involved and which rooms they are in.' },
      { title: 'What you have noticed', text: 'Drafts, condensation, damaged trim, or difficulty opening and closing.' },
      { title: 'Your goal', text: 'Repair, improved appearance, or a broader update.' },
      { title: 'Related work', text: 'Trim, siding, or painting around the windows.' },
      { title: 'Photos', text: 'Photos help us understand the situation before the site visit.' }
    ],
    scopeNote:
      'Window services are scoped case by case. The exact work available for your project is confirmed during your estimate.',
    sections: [
      {
        title: 'Windows and energy rules in California',
        body: [
          'In California, replacing windows is regulated by the state energy code (Title 24), and window replacement typically requires a permit. If your project involves new windows, this is something to plan for. The [California Energy Commission](https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards) publishes the current standards.'
        ]
      }
    ],
    costFactors: [
      'Number and size of windows',
      'Type of work involved',
      'Condition of trim and surrounding wall',
      'Interior and exterior finishing',
      'Access, including upper floors',
      'Permit requirements'
    ],
    expectations: [
      'Describe the windows and what you want to change',
      'Site review to confirm scope',
      'Estimate with the work clearly described',
      'Work scheduled once scope is agreed'
    ],
    related: ['siding', 'interior-painting', 'exterior-painting', 'home-remodeling'],
    faqCategory: 'general',
    faqIds: ['permits', 'estimate-info'],
    projectCategory: 'window',
    images: []
  },

  // ───────────────────────── Gazebo ─────────────────────────
  {
    slug: 'gazebo-construction',
    name: 'Gazebo Construction',
    shortName: 'Gazebo construction',
    group: 'outdoor',
    enabled: true,
    icon: 'Tent',
    seoTitle: `Gazebo Construction in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Custom gazebo construction in Sacramento for shade and outdoor living. Planning, footings, framing, and finishing. Request a free estimate.',
    heroTitle: 'Gazebo construction in Sacramento',
    heroLead:
      'A gazebo gives you shade through Sacramento summers and a place to gather outside. We build gazebos sized for your yard and finished to suit your home.',
    cardText: 'Shade structures built for Sacramento summers.',
    intro: [
      'With long, hot summers, shade can make a backyard usable for months longer each year. A well-built gazebo needs solid footings, correct framing, and a roof that handles both sun and winter rain.',
      'We build gazebos for Sacramento-area homes and commercial properties. We start with how you want to use the space, then plan size, placement, and finishes around your yard.'
    ],
    scopeTitle: 'Gazebo project details',
    scope: [
      { title: 'Size and placement', text: 'Planning around your yard, setbacks, sun angle, and views.' },
      { title: 'Footings and foundation', text: 'A solid base suited to the structure and soil.' },
      { title: 'Framing and roof', text: 'Structure and roofing built to handle sun and rain.' },
      { title: 'Finishes', text: 'Paint or stain, trim, and details that match your home.' },
      { title: 'Lighting and fans', text: 'Planned in advance if you want electrical in the structure.' }
    ],
    sections: [
      {
        title: 'Planning your gazebo',
        body: [
          'Think about how many people you want to seat, whether you want a dining table or lounge furniture, and where the shade will fall during the hottest part of the day. Placement also matters for drainage, access, and setbacks from property lines.',
          'Depending on size, height, location, and whether electrical work is included, a gazebo may require a permit. Your HOA may also have rules about outdoor structures. We review this during the estimate.'
        ]
      },
      {
        title: 'Materials',
        body: [
          'Wood gazebos offer a classic look and can be painted or stained. Material choice affects maintenance; for example, wood benefits from periodic refinishing in strong sun. We discuss options and trade-offs with you.'
        ]
      }
    ],
    costFactors: [
      'Size and shape of the gazebo',
      'Footing and foundation requirements',
      'Material and roofing choices',
      'Electrical for lights or fans',
      'Site access and ground preparation',
      'Permit and HOA requirements'
    ],
    expectations: [
      'Share how you want to use the space and your yard size',
      'Site visit to review placement and ground conditions',
      'Design direction and estimate',
      'Materials confirmed and work scheduled',
      'Footings, framing, roof, and finishing'
    ],
    related: ['fence-repair', 'exterior-painting', 'power-washing', 'new-construction'],
    faqCategory: 'exterior',
    faqIds: ['permits'],
    projectCategory: 'gazebo',
    images: []
  },

  // ───────────────────────── New construction (Ads campaign 3) ─────────────────────────
  {
    slug: 'new-construction',
    name: 'New Construction',
    shortName: 'New construction',
    group: 'construction',
    enabled: true,
    icon: 'Building2',
    adsLanding: true,
    seoTitle: `New Construction Contractor in ${SAC}, CA | True Arm Construction`,
    metaDescription:
      'Ground-up residential and commercial construction in Sacramento by a California Class B General Building Contractor. Discuss your project and get an estimate.',
    heroTitle: 'New construction in Sacramento',
    heroLead:
      'Ground-up residential and commercial projects, planned carefully from the first conversation. We help you understand scope, sequencing, and what to prepare before construction begins.',
    cardText: 'Ground-up residential and commercial building projects.',
    intro: [
      'New construction is a larger commitment than a remodel, with more decisions, more coordination, and more people involved. The early stages, before anything is built, have the biggest effect on cost, schedule, and the finished result.',
      'True Arm Construction holds a California Class B General Building Contractor license (#1128503), the classification for projects involving multiple building trades. We work with property owners on residential and commercial projects in the Sacramento area. Every project starts with a consultation to understand what you want to build, where you are in the process, and what is still needed.'
    ],
    scopeTitle: 'How a new construction project comes together',
    scope: [
      { title: 'Initial consultation', text: 'Your goals, the property, budget range, and where you are in planning.' },
      { title: 'Scope evaluation', text: 'Reviewing plans if you have them and identifying open questions.' },
      { title: 'Planning and coordination', text: 'Sequencing the work and coordinating the trades involved.' },
      { title: 'Design and permits', text: 'Working with your design professionals and the permitting process.' },
      { title: 'Construction phases', text: 'Site work, foundation, framing, systems, and finishes.' },
      { title: 'Completion', text: 'Final inspections, walkthrough, and project close-out.' }
    ],
    sections: [
      {
        title: 'Before you build: what to have ready',
        body: [
          'It helps to know the property details (address, lot size, and any known easements or restrictions), your intended use, and your target budget range. If you already have architectural or engineering drawings, share them. If not, that is fine: tell us where you are in the process.',
          'Most new construction requires plans prepared by licensed design professionals and a building permit from the local jurisdiction. Depending on the project, you may also deal with zoning review, utility connections, and fees.'
        ]
      },
      {
        title: 'Construction phases',
        body: [
          'Projects typically move through site preparation, foundation, framing, rough mechanical, electrical, and plumbing work, insulation, drywall, and finishes, with inspections at required milestones. Each phase depends on the one before it, which is why planning and material lead times matter.'
        ]
      },
      {
        title: 'What affects cost and timeline',
        body: [
          'Size and complexity, site conditions, material selections, design changes after work starts, permit review times, inspection scheduling, and weather all affect new construction. We give you an estimate based on your specific scope and explain the assumptions behind it.'
        ]
      }
    ],
    anchors: [
      {
        id: 'residential',
        title: 'Residential construction',
        body: [
          'Residential projects can include new homes and other new structures on residential property. We talk through how you will use the building, your design and finish priorities, and how the build will fit your property.'
        ]
      },
      {
        id: 'commercial',
        title: 'Commercial construction',
        body: [
          'Commercial projects bring additional considerations such as occupancy type, accessibility requirements, and coordination with business operations or tenants. We discuss these during the consultation so the scope reflects how the space will be used.'
        ]
      }
    ],
    costFactors: [
      'Building size and complexity',
      'Site conditions, grading, and utilities',
      'Foundation type',
      'Material and finish selections',
      'Design, engineering, and permit requirements',
      'Changes after construction begins'
    ],
    expectations: [
      'Initial consultation about your project and property',
      'Review of plans, documents, and open questions',
      'Scope evaluation and estimate',
      'Planning, permits, and scheduling',
      'Construction with inspections at required stages',
      'Final walkthrough and close-out'
    ],
    related: ['home-remodeling', 'bathroom-remodeling', 'tile-installation', 'exterior-painting'],
    faqCategory: 'construction',
    projectCategory: 'general-construction',
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
  'bathroom-remodeling',
  'tile-installation',
  'new-construction',
  'interior-painting',
  'exterior-painting',
  'siding'
]
