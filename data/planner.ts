/**
 * Project Planner + Project Navigator configuration.
 * Contextual questions are optional by design: homeowners often don't know exact sizes.
 */

export interface PlannerOption {
  value: string
  label: string
}

export interface PlannerQuestion {
  id: string
  label: string
  type: 'choice' | 'text'
  options?: PlannerOption[]
  placeholder?: string
  hint?: string
}

export const plannerServiceOptions: { slug: string; label: string }[] = [
  { slug: 'bathroom-remodeling', label: 'Bathroom remodeling' },
  { slug: 'tile-installation', label: 'Tile installation' },
  { slug: 'interior-painting', label: 'Interior painting' },
  { slug: 'exterior-painting', label: 'Exterior painting' },
  { slug: 'siding', label: 'Siding' },
  { slug: 'fence-repair', label: 'Fence repair' },
  { slug: 'power-washing', label: 'Pressure washing' },
  { slug: 'wall-installation', label: 'Wall installation' },
  { slug: 'window-services', label: 'Window services' },
  { slug: 'gazebo-construction', label: 'Gazebo construction' },
  { slug: 'new-construction', label: 'New construction' },
  { slug: 'home-remodeling', label: 'Other remodeling / not sure' }
]

const notSure: PlannerOption = { value: 'not-sure', label: 'Not sure yet' }

export const plannerQuestions: Record<string, PlannerQuestion[]> = {
  'tile-installation': [
    { id: 'surface', label: 'Where is the tile going?', type: 'choice', options: [
      { value: 'floor', label: 'Floor' }, { value: 'wall', label: 'Wall or backsplash' },
      { value: 'shower', label: 'Shower or tub surround' }, { value: 'multiple', label: 'More than one area' }, notSure] },
    { id: 'install-type', label: 'Is this new tile or a replacement?', type: 'choice', options: [
      { value: 'new', label: 'New installation' }, { value: 'replacement', label: 'Replacing existing tile' }, notSure] },
    { id: 'area', label: 'Approximate area, if known', type: 'text', placeholder: 'e.g. about 120 sq ft', hint: 'A rough guess is fine.' }
  ],
  'bathroom-remodeling': [
    { id: 'remodel-scope', label: 'What kind of remodel?', type: 'choice', options: [
      { value: 'full', label: 'Full remodel' }, { value: 'partial', label: 'Partial update' }, notSure] },
    { id: 'main-area', label: 'Main area of work', type: 'choice', options: [
      { value: 'shower', label: 'Shower or tub' }, { value: 'vanity', label: 'Vanity and sink' },
      { value: 'floor', label: 'Flooring' }, { value: 'everything', label: 'The whole room' }, notSure] }
  ],
  'new-construction': [
    { id: 'project-type', label: 'General project type', type: 'choice', options: [
      { value: 'home', label: 'New home' }, { value: 'structure', label: 'Other residential structure' },
      { value: 'commercial', label: 'Commercial building' }, { value: 'other', label: 'Something else' }] },
    { id: 'planning-stage', label: 'Where are you in planning?', type: 'choice', options: [
      { value: 'idea', label: 'Early idea' }, { value: 'design', label: 'Working on designs' },
      { value: 'plans-ready', label: 'Plans are ready' }, { value: 'permitted', label: 'Permits in hand or in review' }] }
  ],
  'interior-painting': [
    { id: 'rooms', label: 'What needs painting?', type: 'choice', options: [
      { value: 'one-room', label: 'One room' }, { value: 'several', label: 'Several rooms' },
      { value: 'whole', label: 'Whole interior' }, { value: 'trim-doors', label: 'Trim or doors only' }] }
  ],
  'exterior-painting': [
    { id: 'stories', label: 'How many stories?', type: 'choice', options: [
      { value: '1', label: 'One' }, { value: '2', label: 'Two' }, { value: '3+', label: 'Three or more' }, notSure] },
    { id: 'surface', label: 'Main exterior surface', type: 'choice', options: [
      { value: 'stucco', label: 'Stucco' }, { value: 'wood', label: 'Wood siding' },
      { value: 'fiber-cement', label: 'Fiber cement' }, notSure] }
  ],
  'fence-repair': [
    { id: 'damage', label: 'What needs repair?', type: 'choice', options: [
      { value: 'posts', label: 'Leaning or broken posts' }, { value: 'boards', label: 'Boards or pickets' },
      { value: 'gate', label: 'Gate' }, { value: 'multiple', label: 'Several issues' }] },
    { id: 'length', label: 'Approximate length affected, if known', type: 'text', placeholder: 'e.g. two sections, about 16 ft' }
  ],
  siding: [
    { id: 'siding-scope', label: 'What do you need?', type: 'choice', options: [
      { value: 'repair', label: 'Repair damaged areas' }, { value: 'replace-section', label: 'Replace a section' },
      { value: 'full', label: 'New siding for the building' }, notSure] }
  ],
  'power-washing': [
    { id: 'surfaces', label: 'What needs cleaning?', type: 'choice', options: [
      { value: 'driveway', label: 'Driveway or walkways' }, { value: 'patio', label: 'Patio or deck' },
      { value: 'house', label: 'House exterior' }, { value: 'fence', label: 'Fence' }, { value: 'multiple', label: 'Several areas' }] }
  ],
  'gazebo-construction': [
    { id: 'gazebo-stage', label: 'Do you have a design in mind?', type: 'choice', options: [
      { value: 'idea', label: 'Just an idea' }, { value: 'examples', label: 'I have examples' }, { value: 'plans', label: 'I have plans' }] }
  ]
}

export const timelineOptions: PlannerOption[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: 'Within 1–3 months' },
  { value: 'planning-ahead', label: 'Planning ahead' },
  { value: 'not-sure', label: 'Not sure yet' }
]

/** ───────── Project Navigator (homepage + services page) ───────── */

export interface NavigatorChoice {
  label: string
  description: string
  icon: string
  /** Either a final service recommendation or follow-up choices */
  service?: string
  next?: { question: string; options: { label: string; service: string }[] }
}

export const navigatorChoices: NavigatorChoice[] = [
  {
    label: 'Remodel a bathroom',
    description: 'Showers, vanities, full renovations',
    icon: 'Bath',
    next: {
      question: 'How much are you planning to change?',
      options: [
        { label: 'The whole room', service: 'bathroom-remodeling' },
        { label: 'Mainly the shower or tile', service: 'tile-installation' },
        { label: 'Just paint and finishes', service: 'interior-painting' }
      ]
    }
  },
  { label: 'Install new tile', description: 'Floors, showers, backsplashes', icon: 'Grid3x3', service: 'tile-installation' },
  {
    label: 'Paint my property',
    description: 'Inside or outside',
    icon: 'PaintRoller',
    next: {
      question: 'Which part of the property?',
      options: [
        { label: 'Interior rooms', service: 'interior-painting' },
        { label: 'Exterior walls and trim', service: 'exterior-painting' }
      ]
    }
  },
  {
    label: 'Improve my exterior',
    description: 'Siding, fences, cleaning',
    icon: 'House',
    next: {
      question: 'What needs attention?',
      options: [
        { label: 'Siding', service: 'siding' },
        { label: 'Fence or gate', service: 'fence-repair' },
        { label: 'Dirty surfaces', service: 'power-washing' },
        { label: 'Faded paint', service: 'exterior-painting' }
      ]
    }
  },
  { label: 'Build an outdoor structure', description: 'Gazebos and shade', icon: 'Tent', service: 'gazebo-construction' },
  {
    label: 'Start a construction project',
    description: 'Ground-up residential or commercial',
    icon: 'Building2',
    service: 'new-construction'
  }
]
