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
  { slug: 'kitchen-remodeling', label: 'Kitchen remodeling' },
  { slug: 'bathroom-remodeling', label: 'Bathroom remodeling' },
  { slug: 'room-additions', label: 'Room addition' },
  { slug: 'flooring-installation', label: 'Flooring installation' },
  { slug: 'epoxy-flooring', label: 'Epoxy flooring' },
  { slug: 'tile-installation', label: 'Tile installation' },
  { slug: 'baseboard-installation', label: 'Baseboard installation' },
  { slug: 'interior-painting', label: 'Interior painting' },
  { slug: 'exterior-painting', label: 'Exterior painting' },
  { slug: 'power-washing', label: 'Pressure washing' },
  { slug: 'fences-gates', label: 'Fences & gates' },
  { slug: 'window-replacement', label: 'Window replacement or repair' },
  { slug: 'gazebo-construction', label: 'Gazebo' },
  { slug: 'drywall-repair', label: 'Drywall repair' },
  { slug: 'dry-rot-repair', label: 'Dry rot repair' },
  { slug: 'handyman-services', label: 'Handyman services' },
  { slug: 'home-remodeling', label: 'Other remodeling / not sure' }
]

const notSure: PlannerOption = { value: 'not-sure', label: 'Not sure yet' }

export const plannerQuestions: Record<string, PlannerQuestion[]> = {
  'kitchen-remodeling': [
    { id: 'kitchen-scope', label: 'What kind of kitchen project?', type: 'choice', options: [
      { value: 'full', label: 'Full remodel' }, { value: 'cabinets-counters', label: 'Cabinets and countertops' },
      { value: 'refresh', label: 'Refresh (backsplash, paint, fixtures)' }, notSure] },
    { id: 'layout', label: 'Will the layout change?', type: 'choice', options: [
      { value: 'same', label: 'Keep the same layout' }, { value: 'change', label: 'Change the layout' }, notSure] }
  ],
  'room-additions': [
    { id: 'addition-use', label: 'What will the new space be used for?', type: 'choice', options: [
      { value: 'bedroom', label: 'Bedroom' }, { value: 'living', label: 'Family or living room' },
      { value: 'office', label: 'Office' }, { value: 'suite', label: 'Primary suite' }, { value: 'other', label: 'Something else' }] },
    { id: 'planning-stage', label: 'Where are you in planning?', type: 'choice', options: [
      { value: 'idea', label: 'Early idea' }, { value: 'design', label: 'Working on designs' },
      { value: 'plans-ready', label: 'Plans are ready' }] },
    { id: 'size', label: 'Approximate size, if known', type: 'text', placeholder: 'e.g. about 200 sq ft' }
  ],
  'flooring-installation': [
    { id: 'material', label: 'What flooring are you considering?', type: 'choice', options: [
      { value: 'lvp', label: 'Vinyl plank (LVP)' }, { value: 'laminate', label: 'Laminate' },
      { value: 'engineered-wood', label: 'Engineered wood' }, { value: 'tile', label: 'Tile' }, notSure] },
    { id: 'area', label: 'Approximate area, if known', type: 'text', placeholder: 'e.g. 3 bedrooms, about 600 sq ft' }
  ],
  'epoxy-flooring': [
    { id: 'space', label: 'Which space?', type: 'choice', options: [
      { value: 'garage', label: 'Garage' }, { value: 'workshop', label: 'Workshop or utility area' },
      { value: 'commercial', label: 'Commercial space' }, { value: 'other', label: 'Other' }] },
    { id: 'area', label: 'Approximate area, if known', type: 'text', placeholder: 'e.g. 2-car garage' }
  ],
  'baseboard-installation': [
    { id: 'baseboard-scope', label: 'What do you need?', type: 'choice', options: [
      { value: 'with-flooring', label: 'Baseboards with new flooring' }, { value: 'replace', label: 'Replace existing baseboards' },
      { value: 'new', label: 'Add baseboards' }, notSure] }
  ],
  'fences-gates': [
    { id: 'fence-scope', label: 'What do you need?', type: 'choice', options: [
      { value: 'new', label: 'New fence' }, { value: 'replace', label: 'Replace an old fence' },
      { value: 'repair', label: 'Repair a fence' }, { value: 'gate', label: 'Gate only' }] },
    { id: 'length', label: 'Approximate length, if known', type: 'text', placeholder: 'e.g. backyard, about 120 ft' }
  ],
  'drywall-repair': [
    { id: 'damage', label: 'What kind of damage?', type: 'choice', options: [
      { value: 'holes', label: 'Holes or dents' }, { value: 'cracks', label: 'Cracks' },
      { value: 'water', label: 'Water damage' }, { value: 'multiple', label: 'Several issues' }] }
  ],
  'dry-rot-repair': [
    { id: 'location', label: 'Where is the rot?', type: 'choice', options: [
      { value: 'fascia', label: 'Fascia or eaves' }, { value: 'windows-doors', label: 'Window or door trim' },
      { value: 'exterior-trim', label: 'Other exterior wood' }, { value: 'multiple', label: 'Several areas' }, notSure] },
    { id: 'report', label: 'Do you have a pest inspection report?', type: 'choice', options: [
      { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] }
  ],
  'handyman-services': [
    { id: 'task-count', label: 'How many items are on your list?', type: 'choice', options: [
      { value: '1', label: 'One' }, { value: '2-5', label: '2 to 5' }, { value: '6+', label: '6 or more' }] }
  ],
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
  'interior-painting': [
    { id: 'rooms', label: 'What needs painting?', type: 'choice', options: [
      { value: 'one-room', label: 'One room' }, { value: 'several', label: 'Several rooms' },
      { value: 'whole', label: 'Whole interior' }, { value: 'trim-doors', label: 'Trim or doors only' }] }
  ],
  'exterior-painting': [
    { id: 'stories', label: 'How many stories?', type: 'choice', options: [
      { value: '1', label: 'One' }, { value: '2', label: 'Two' }, { value: '3+', label: 'Three or more' }, notSure] },
    { id: 'surface', label: 'Main exterior surface', type: 'choice', options: [
      { value: 'stucco', label: 'Stucco' }, { value: 'wood', label: 'Wood' },
      { value: 'fiber-cement', label: 'Fiber cement' }, notSure] }
  ],
  'window-replacement': [
    { id: 'window-work', label: 'What do you need?', type: 'choice', options: [
      { value: 'replace', label: 'Replace windows' }, { value: 'repair', label: 'Repair windows' }, notSure] },
    { id: 'window-count', label: 'How many windows?', type: 'choice', options: [
      { value: '1', label: 'One' }, { value: '2-5', label: '2 to 5' }, { value: '6+', label: '6 or more' }, notSure] }
  ],
  'gazebo-construction': [
    { id: 'gazebo-have', label: 'Do you already have the gazebo?', type: 'choice', options: [
      { value: 'have-kit', label: 'Yes, I have it' }, { value: 'need-one', label: 'No, I need one' }, notSure] },
    { id: 'gazebo-surface', label: 'Where will it go?', type: 'choice', options: [
      { value: 'concrete', label: 'Concrete patio or pad' }, { value: 'pavers', label: 'Pavers' }, { value: 'deck', label: 'Deck' }, notSure] }
  ],
  'power-washing': [
    { id: 'surfaces', label: 'What needs cleaning?', type: 'choice', options: [
      { value: 'driveway', label: 'Driveway or walkways' }, { value: 'patio', label: 'Patio or deck' },
      { value: 'house', label: 'House exterior' }, { value: 'fence', label: 'Fence' }, { value: 'multiple', label: 'Several areas' }] }
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
    label: 'Remodel my kitchen or bath',
    description: 'Kitchens, bathrooms, full renovations',
    icon: 'Bath',
    next: {
      question: 'Which room?',
      options: [
        { label: 'Kitchen', service: 'kitchen-remodeling' },
        { label: 'Bathroom', service: 'bathroom-remodeling' },
        { label: 'Several rooms or the whole home', service: 'home-remodeling' }
      ]
    }
  },
  { label: 'Add a room', description: 'More living space for your home', icon: 'HousePlus', service: 'room-additions' },
  {
    label: 'Install new floors',
    description: 'Flooring, tile, epoxy, baseboards',
    icon: 'Layers',
    next: {
      question: 'What kind of floor?',
      options: [
        { label: 'Vinyl plank, laminate, or wood', service: 'flooring-installation' },
        { label: 'Tile', service: 'tile-installation' },
        { label: 'Epoxy for a garage or concrete', service: 'epoxy-flooring' },
        { label: 'Baseboards and trim', service: 'baseboard-installation' }
      ]
    }
  },
  {
    label: 'Paint my property',
    description: 'Inside or outside',
    icon: 'PaintRoller',
    next: {
      question: 'Which part of the property?',
      options: [
        { label: 'Interior rooms', service: 'interior-painting' },
        { label: 'Exterior walls and trim', service: 'exterior-painting' },
        { label: 'Cleaning before painting', service: 'power-washing' }
      ]
    }
  },
  {
    label: 'Fences, gates, or a gazebo',
    description: 'Build, replace, or repair',
    icon: 'Fence',
    next: {
      question: 'What are you building?',
      options: [
        { label: 'A fence or gate', service: 'fences-gates' },
        { label: 'A gazebo', service: 'gazebo-construction' }
      ]
    }
  },
  {
    label: 'Repairs and small jobs',
    description: 'Drywall, dry rot, windows, handyman',
    icon: 'Wrench',
    next: {
      question: 'What needs fixing?',
      options: [
        { label: 'Drywall holes, cracks, or water damage', service: 'drywall-repair' },
        { label: 'Rotted wood outside', service: 'dry-rot-repair' },
        { label: 'Windows: replace or repair', service: 'window-replacement' },
        { label: 'A list of small jobs', service: 'handyman-services' }
      ]
    }
  }
]
