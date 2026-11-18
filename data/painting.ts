import type { PaintingHub } from '../types'

/**
 * Painting hub (/painting): the lead service line (client decision, 2026-11).
 * Services listed here must exist in data/services.ts. Only confirmed facts:
 * no paint brands, warranties, prices, or durations until the client confirms them.
 */
export const paintingHub: PaintingHub = {
  path: '/painting',
  seoTitle: 'Painting Contractor in Sacramento, CA | Interior & Exterior',
  metaDescription:
    'Interior, exterior, cabinet, and commercial painting in Sacramento by a licensed contractor and EPA Lead-Safe Certified Firm. Request a free painting estimate.',
  heroTitle: 'Interior and exterior painting in Sacramento',
  heroLead:
    'Homes and businesses painted with real preparation, protected floors and furniture, and clean lines. A licensed contractor and an EPA Lead-Safe Certified Firm, so older homes are handled the right way.',
  heroMedia: 'exterior-painting-duplex-exterior-repaint',
  services: ['interior-painting', 'exterior-painting', 'cabinet-painting', 'commercial-painting', 'deck-fence-staining'],
  promises: [
    {
      icon: 'Ruler',
      title: 'Preparation first',
      text: 'Patching, sanding, caulking, and priming where needed. Most paint problems start with skipped prep.'
    },
    {
      icon: 'ShieldCheck',
      title: 'Your home protected',
      text: 'Floors, furniture, windows, and landscaping covered and masked before any paint is opened.'
    },
    {
      icon: 'Paintbrush',
      title: 'Clean, even finish',
      text: 'Straight lines at ceilings and trim, even coverage, and the right sheen for each surface.'
    },
    {
      icon: 'FileBadge',
      title: 'Lead-safe for older homes',
      text: 'EPA Lead-Safe Certified Firm for work on painted surfaces in homes built before 1978.'
    },
    {
      icon: 'ClipboardList',
      title: 'Clear written estimate',
      text: 'Surfaces, prep, primer, coats, and colors spelled out before work is scheduled.'
    },
    {
      icon: 'House',
      title: 'Clean-up and walkthrough',
      text: 'We clean up each day, touch up at the end, and walk the finished work with you.'
    }
  ],
  process: [
    { title: 'Tell us what to paint', text: 'Use the short form below or call. Photos help us prepare.' },
    { title: 'Walkthrough and estimate', text: 'We look at the surfaces, measure, and send a written estimate.' },
    { title: 'Colors and schedule', text: 'Colors and sheens are confirmed and the start date is set.' },
    { title: 'Protect and prepare', text: 'Covering, masking, patching, sanding, and priming.' },
    { title: 'Paint', text: 'Even coats with clean lines, room by room or wall by wall.' },
    { title: 'Final walkthrough', text: 'Touch-ups, clean-up, and a final walk of the work together.' }
  ],
  leadSafe: {
    title: 'Built before 1978? Painting has to be lead-safe.',
    body: [
      'Many Sacramento homes were built before 1978, when lead-based paint was still in use. Under the federal Renovation, Repair and Painting Rule, paid work that disturbs paint in those homes must be done by an EPA-certified firm using lead-safe work practices: containment, careful surface preparation, and thorough clean-up.',
      'True Arm Construction is an EPA Lead-Safe Certified Firm. Tell us the year your home was built when you request an estimate, and we will plan the work accordingly.'
    ]
  },
  faqIds: ['paint-lead-safe', 'paint-estimate-included', 'paint-how-long', 'paint-exterior-season', 'cabinet-paint-vs-replace', 'stain-vs-paint-fence'],
  quote: {
    title: 'Get a free painting estimate',
    lead: 'Answer a few quick questions. We will contact you to schedule a walkthrough or ask for photos.',
    projectTypes: [
      { value: 'interior-painting', label: 'Interior' },
      { value: 'exterior-painting', label: 'Exterior' },
      { value: 'cabinet-painting', label: 'Cabinets' },
      { value: 'commercial-painting', label: 'Commercial' },
      { value: 'deck-fence-staining', label: 'Deck or fence' }
    ],
    sizes: [
      { value: 'small', label: 'One room or a small area' },
      { value: 'medium', label: 'Several rooms or one side' },
      { value: 'large', label: 'Whole home or building' },
      { value: 'not-sure', label: 'Not sure yet' }
    ],
    timings: [
      { value: 'asap', label: 'As soon as possible' },
      { value: '1-3-months', label: 'In 1 to 3 months' },
      { value: 'planning', label: 'Just planning' }
    ]
  }
}
