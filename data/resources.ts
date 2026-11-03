import type { ResourceArticle } from '../types'

/**
 * Homeowner guides. Publish only substantive, reviewed articles.
 * Planned topics (not yet written, not published):
 *  - Choosing materials for a tile installation project
 *  - Planning interior and exterior painting
 *  - What to consider before starting new construction
 */
export const resources: ResourceArticle[] = [
  {
    slug: 'how-to-prepare-for-a-contractor-estimate',
    title: 'How to prepare for a contractor estimate',
    description:
      'What to gather, what to ask, and how to compare estimates before a remodeling or construction project in Sacramento.',
    published: true,
    publishedOn: '2026-11-01',
    readingMinutes: 6,
    relatedServices: ['home-remodeling', 'bathroom-remodeling', 'new-construction'],
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
