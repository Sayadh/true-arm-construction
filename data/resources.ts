import type { ResourceArticle } from '../types'

/**
 * Homeowner guides. Publish only substantive, reviewed articles.
 * Planned topics (not yet written, not published):
 *  - How much does it cost to paint a house in Sacramento? (waiting for the owner's price ranges)
 *  - Choosing materials for a tile installation project
 *  - What to consider before planning a room addition
 */
export const resources: ResourceArticle[] = [
  {
    slug: 'cabinet-painting-vs-replacement',
    title: 'Cabinet painting vs replacement: how to decide',
    description:
      'When painting kitchen or bathroom cabinets makes sense, when replacement is the better call, and what a durable cabinet paint job involves.',
    published: true,
    publishedOn: '2026-11-18',
    readingMinutes: 6,
    relatedServices: ['cabinet-painting', 'kitchen-remodeling', 'interior-painting'],
    body: [
      {
        paragraphs: [
          'Cabinets take up more visual space than almost anything else in a kitchen, so changing their color changes the whole room. The question many homeowners in Sacramento ask is whether to paint the cabinets they have or replace them. The answer depends less on taste than on the condition of the boxes, the layout, and the material.'
        ]
      },
      {
        heading: 'Painting makes sense when',
        list: [
          'The cabinet boxes are solid, square, and free of water damage',
          'You like the layout and the amount of storage',
          'The doors are solid wood, plywood, or MDF, which take primer and paint well',
          'You want a new look without the time and disruption of tearing out the kitchen'
        ]
      },
      {
        paragraphs: [
          'In these cases, painting gives you a new color and a smooth, factory-like finish for considerably less than new cabinets, and your countertops and backsplash can stay in place.'
        ]
      },
      {
        heading: 'Replacement is usually better when',
        list: [
          'Boxes are swollen, delaminating, or soft, often under the sink or near the dishwasher',
          'The layout does not work and you want to move appliances or add an island',
          'Doors are thermofoil or plastic laminate that is peeling, which paint does not bond to reliably',
          'You are already replacing countertops and want different cabinet sizes'
        ]
      },
      {
        paragraphs: [
          'Paint changes the surface, not the structure. If the problem is how the kitchen works, a [kitchen remodel](/services/kitchen-remodeling) is the better investment.'
        ]
      },
      {
        heading: 'What a durable cabinet paint job involves',
        paragraphs: [
          'Cabinets are handled and cleaned every day, so the preparation matters more than on a wall. A careful job usually follows these steps:'
        ],
        list: [
          'Remove doors, drawer fronts, and hardware, and label everything',
          'Degrease every surface, since kitchen grease prevents paint from bonding',
          'Repair dings and fill grain or holes where needed, then sand',
          'Apply a bonding primer suited to the material',
          'Spray or carefully brush and roll a cabinet-grade finish in thin coats',
          'Reinstall and adjust doors and hardware once the finish has dried'
        ]
      },
      {
        heading: 'Dry is not the same as cured',
        paragraphs: [
          'Cabinet paint can feel dry within hours but keeps hardening for a period afterwards; the product data sheet gives the exact times. During that time, use the cabinets gently: avoid scrubbing, and close doors softly. It is the main thing homeowners can do to help a new finish last.'
        ]
      },
      {
        heading: 'Questions to ask before you decide',
        list: [
          'Are there any soft or swollen spots in the boxes?',
          'What are the doors made of?',
          'Is the current layout something you want to keep for years?',
          'Will you change the hardware, and do the new pulls use the same hole spacing?'
        ]
      },
      {
        paragraphs: [
          'If painting is the right fit, see our [cabinet painting](/services/cabinet-painting) service or browse all of our [house painting in Sacramento](/painting) services and request a free estimate.'
        ]
      }
    ]
  },
  {
    slug: 'lead-safe-painting-homes-built-before-1978',
    title: 'Lead-safe painting for homes built before 1978',
    description:
      "Why paint in older Sacramento homes needs special care, what the EPA's RRP Rule requires, and what to expect from a lead-safe paint job.",
    published: true,
    publishedOn: '2026-11-18',
    readingMinutes: 6,
    relatedServices: ['interior-painting', 'exterior-painting', 'cabinet-painting'],
    body: [
      {
        paragraphs: [
          'Lead-based paint was banned for residential use in the United States in 1978. Homes built before then may still have it, often under several newer coats. Intact paint is not the main concern; the risk comes when old paint is sanded, scraped, or cut, which creates lead dust that is easy to breathe in or swallow and hard to see.',
          'Many Sacramento neighborhoods were built before 1978, so this affects a lot of painting projects in the area.'
        ]
      },
      {
        heading: 'What the RRP Rule requires',
        paragraphs: [
          "The EPA's Renovation, Repair and Painting (RRP) Rule applies to paid work that disturbs painted surfaces in homes built before 1978, and in child-occupied facilities such as schools and daycare centers. Under the rule:"
        ],
        list: [
          'The company doing the work must be an EPA-certified firm',
          'A certified renovator must direct the work and train the crew in lead-safe practices',
          "Before work begins, the occupants receive EPA's Renovate Right pamphlet",
          'Lead-safe work practices are used, and the area is cleaned and verified at the end'
        ]
      },
      {
        paragraphs: [
          'It applies when more than 6 square feet of painted surface per room is disturbed inside, or more than 20 square feet outside. Scraping and sanding before a repaint usually go past that quickly.'
        ]
      },
      {
        heading: 'What lead-safe work practices look like',
        list: [
          'The work area is contained with plastic sheeting, and doors and vents are covered',
          'Occupants, especially children and pregnant women, and pets stay out of the work area',
          'High-dust methods are avoided: no open-flame burning, and no power sanding without HEPA dust collection',
          'Paint chips and dust are collected daily, not swept into the air',
          'Final clean-up uses HEPA vacuums and wet cleaning, followed by a cleaning check'
        ]
      },
      {
        heading: 'Does my house have lead paint?',
        paragraphs: [
          "If the home was built before 1978, assume it may, unless it has been tested. A certified renovator can use EPA-recognized test kits on the surfaces being worked on, or a certified inspector can test the whole home. If you do not know the year your home was built, county property records usually show it.",
          'For official information, see the [EPA lead page](https://www.epa.gov/lead) and the RRP program resources linked from it.'
        ]
      },
      {
        heading: 'Questions to ask a painting contractor',
        list: [
          'Is your firm EPA Lead-Safe Certified? What is the certification number?',
          'Who on the crew is a certified renovator?',
          'How will you contain the work area and clean up each day?',
          'How will you verify the area is clean at the end?'
        ]
      },
      {
        paragraphs: [
          'True Arm Construction is an EPA Lead-Safe Certified Firm; the certificate is on our [licenses and certifications](/licenses-certifications) page. When you request an estimate for [house painting in Sacramento](/painting), tell us the year the home was built and we will plan the work accordingly.'
        ]
      }
    ]
  },
  {
    slug: 'best-time-to-paint-house-exterior-sacramento',
    title: 'Best time to paint a house exterior in Sacramento',
    description:
      "How Sacramento's hot, dry summers and wet winters affect exterior painting, which months usually work best, and how to plan around the weather.",
    published: true,
    publishedOn: '2026-11-18',
    readingMinutes: 5,
    relatedServices: ['exterior-painting', 'deck-fence-staining', 'dry-rot-repair'],
    body: [
      {
        paragraphs: [
          'Exterior paint depends on the weather twice: on the day it goes on, and in the hours afterwards while it dries and starts to cure. Sacramento has a Mediterranean climate, with hot, dry summers and mild, wet winters, so the calendar matters more than in many places.'
        ]
      },
      {
        heading: 'Spring and fall are usually the best windows',
        paragraphs: [
          'Late spring and early fall tend to bring the conditions most paint manufacturers ask for: moderate temperatures, dry surfaces, and little chance of rain. Siding and trim are not baking in the sun, and the paint has time to level out before it skins over.',
          'Because these months are popular, it helps to request an estimate several weeks ahead of when you would like the work done.'
        ]
      },
      {
        heading: 'Painting in summer',
        paragraphs: [
          'Summer is dry, which is good, but afternoon heat is hard on fresh paint. When surfaces are very hot or in direct sun, paint can dry too fast, leaving lap marks and weaker adhesion. Summer jobs work well when they are planned around it:'
        ],
        list: [
          'Start early in the day',
          'Follow the shade around the house, painting each wall after the sun has left it',
          'Keep to the temperature range on the product label',
          'Give extra attention to south- and west-facing walls, which take the most sun'
        ]
      },
      {
        heading: 'Painting in winter',
        paragraphs: [
          'Winter brings most of the year’s rain, cooler temperatures, morning dew, and short days. Painting is possible during dry stretches with suitable products, but the schedule has to stay flexible, and surfaces must be fully dry before paint goes on. Interior painting is often the better project for the wet months.'
        ]
      },
      {
        heading: 'Weather is only part of it: preparation',
        paragraphs: [
          'Most exterior paint failures in the Sacramento Valley start with skipped preparation, not with the date. Before painting, the surfaces should be:'
        ],
        list: [
          'Washed and fully dry',
          'Scraped and sanded where paint is loose',
          'Repaired where wood is soft, especially fascia, trim, and fence boards that get sprinkler spray',
          'Caulked at gaps and primed on bare wood or patches',
          'Handled with lead-safe practices if the home was built before 1978'
        ]
      },
      {
        paragraphs: [
          'Soft or rotten wood should be fixed first; see [dry rot repair](/services/dry-rot-repair). For fences and decks, staining is often a better choice than paint; see [deck and fence staining](/services/deck-fence-staining).'
        ]
      },
      {
        heading: 'Planning your exterior paint job',
        paragraphs: [
          'Decide on colors early, especially if your HOA needs to approve them, and plan for the work to pause if the weather turns. For a schedule that fits your house and the season, request a free estimate for [house painting in Sacramento](/painting) or read more about our [exterior painting](/services/exterior-painting) service.'
        ]
      }
    ]
  },
  {
    slug: 'how-to-prepare-for-a-contractor-estimate',
    title: 'How to prepare for a contractor estimate',
    description:
      'What to gather, what to ask, and how to compare estimates before a remodeling or construction project in Sacramento.',
    published: true,
    publishedOn: '2026-11-01',
    readingMinutes: 6,
    relatedServices: ['home-remodeling', 'kitchen-remodeling', 'room-additions'],
    body: [
      {
        paragraphs: [
          'An estimate is only as accurate as the information behind it. A little preparation before the first conversation helps a contractor understand your project, saves time on both sides, and makes it easier to compare estimates fairly.'
        ]
      },
      {
        heading: 'Start with the problem, not the solution',
        paragraphs: [
          'Before thinking about materials, write down what is not working today. A bathroom might be hard to clean, too small for two people in the morning, or showing signs of water damage. A fence might lean or a gate might not latch. Describing the problem lets the contractor suggest options you may not have considered.',
          'Then note what a good result looks like to you. It can be as simple as “a walk-in shower that is easy to keep clean” or “a backyard with shade in the afternoon.”'
        ]
      },
      {
        heading: 'Gather the basics',
        list: [
          'Property address or ZIP code, and whether it is residential or commercial',
          'The rooms or areas involved, and approximate sizes if you know them',
          'Photos of the current space, including any damage',
          'Examples of styles or finishes you like',
          'Any drawings, plans, or HOA guidelines that apply',
          'The year the home was built, especially if it is older than 1978'
        ],
        paragraphs: [
          'You do not need exact measurements. Approximate sizes and good photos are enough for an initial conversation; a site visit will confirm the details.'
        ]
      },
      {
        heading: 'Think about budget and timing',
        paragraphs: [
          'Sharing a budget range is not a commitment. It helps a contractor suggest a scope that fits, or explain early if your goals and budget are far apart. If you are unsure, say so and ask what usually drives cost for your type of project.',
          'Timing matters too. Note any fixed dates, such as a move-in, an event, or a lease start, and whether you plan to live in the home during the work.'
        ]
      },
      {
        heading: 'Questions worth asking',
        list: [
          'What is included in the estimate, and what is not?',
          'Does this work need a permit, and who handles it?',
          'What happens if you find hidden damage once work begins?',
          'Which materials or selections need to be decided before the start date?',
          'How will we communicate during the project?'
        ]
      },
      {
        heading: 'Comparing estimates',
        paragraphs: [
          'When you have more than one estimate, compare the scope line by line before comparing totals. A lower price sometimes leaves out preparation, permits, disposal, or materials that another estimate includes.',
          'In California, you can check any contractor’s license number, classification, and status on the Contractors State License Board website at cslb.ca.gov. It takes a minute and is worth doing for every contractor you consider.'
        ]
      },
      {
        heading: 'Next step',
        paragraphs: [
          'When you are ready, our project planner walks you through these questions in a few short steps, and you can skip anything you do not know yet.'
        ]
      }
    ]
  },
  {
    slug: 'preparing-for-a-bathroom-remodel-in-sacramento',
    title: 'Preparing for a bathroom remodel in Sacramento',
    description:
      'Decisions to make early, how to plan around a bathroom being out of service, and what to know about permits in Sacramento.',
    published: true,
    publishedOn: '2026-11-01',
    readingMinutes: 7,
    relatedServices: ['bathroom-remodeling', 'tile-installation', 'interior-painting'],
    body: [
      {
        paragraphs: [
          'A bathroom remodel packs many trades into a small room. The projects that go smoothly tend to have one thing in common: the important decisions were made before demolition started.'
        ]
      },
      {
        heading: 'Decide on the layout first',
        paragraphs: [
          'Keeping the toilet, shower, and sink where they are is usually simpler than moving them, because relocating fixtures means moving drain and supply lines. If the current layout works, a remodel can focus on surfaces and fixtures. If it does not, changing the layout may be the most valuable part of the project.',
          'Common layout changes include converting a tub to a walk-in shower, enlarging a shower, or swapping a single vanity for a double.'
        ]
      },
      {
        heading: 'Choose items with lead times early',
        list: [
          'Vanity and countertop',
          'Shower valve and trim, since the valve is installed before tile',
          'Tile for floors and shower walls',
          'Shower glass, which is usually measured after tile is complete',
          'Lighting and the exhaust fan'
        ],
        paragraphs: [
          'Having these selected, and ideally on hand, before work begins reduces the risk of a project waiting on a single item.'
        ]
      },
      {
        heading: 'Plan for the bathroom being out of service',
        paragraphs: [
          'If this is your only bathroom, talk with your contractor about how the work will be sequenced and how long the room may be unusable. If you have another bathroom, check that it will stay available and think about how the household will share it.',
          'Expect some noise and dust during demolition. Ask how the work area will be protected and how materials will move through your home.'
        ]
      },
      {
        heading: 'Moisture and ventilation',
        paragraphs: [
          'A remodel is the best time to make sure the shower is properly waterproofed and the room is well ventilated. An exhaust fan that is sized for the room and vented to the outside helps protect paint, grout, and cabinetry from moisture over time.'
        ]
      },
      {
        heading: 'Permits in Sacramento',
        paragraphs: [
          'Whether your remodel needs a permit depends on the scope. Moving plumbing, adding electrical circuits, or changing walls typically requires one; replacing a vanity in the same location often does not. Requirements differ between the City of Sacramento and unincorporated Sacramento County, so check with the jurisdiction where the property is located. Your contractor should explain what applies to your project.'
        ]
      },
      {
        heading: 'Questions to settle before work begins',
        list: [
          'Is the layout final?',
          'Are all fixtures and tile selected?',
          'Where will materials be stored during the project?',
          'How will hidden damage be handled if it is found?',
          'What does the final walkthrough include?'
        ]
      }
    ]
  }
]

export const publishedResources = resources.filter((r) => r.published)

export function getResource(slug: string): ResourceArticle | undefined {
  return publishedResources.find((r) => r.slug === slug)
}
