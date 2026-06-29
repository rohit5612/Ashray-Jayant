import coverDwtD from '../assets/projects/deal-with-the-devil/cover.svg'
import thumbDwtD from '../assets/projects/deal-with-the-devil/thumb.svg'
import galleryDwtD1 from '../assets/projects/deal-with-the-devil/gallery/01.svg'
import galleryDwtD2 from '../assets/projects/deal-with-the-devil/gallery/02.svg'
import coverRetro from '../assets/projects/retro-space-shooter/cover.svg'
import thumbRetro from '../assets/projects/retro-space-shooter/thumb.svg'
import galleryRetro1 from '../assets/projects/retro-space-shooter/gallery/01.svg'

const projects = [
  {
    id: 'deal-with-the-devil',
    slug: 'deal-with-the-devil',
    title: 'Deal With The Devil',
    subtitle: 'Narrative action prototype',
    engine: 'Unity',
    role: 'Gameplay Programmer',
    shortDescription:
      'A fast-paced prototype exploring risk-reward combat and reactive enemy AI.',
    fullDescription:
      'Deal With The Devil is a gameplay-first prototype built to explore tight combat loops, readable enemy telegraphs, and moment-to-moment player agency. The focus was on feel — responsive movement, impactful hits, and systems that reward aggressive play without punishing experimentation.',
    coverImage: coverDwtD,
    thumbnail: thumbDwtD,
    video: null,
    gallery: [galleryDwtD1, galleryDwtD2],
    year: '2025',
    duration: '3 months',
    projectType: 'Prototype',
    tags: ['PRIMARY_PROJECT', 'SOLO_PROJECT'],
    skills: ['C#', 'Unity', 'AI', 'Combat Systems', 'Animation'],
    features: [
      'Responsive third-person combat controller',
      'State-driven enemy AI with telegraphed attacks',
      'Risk-reward ability system',
      'Cinematic camera shakes and hit-stop feedback',
    ],
    contribution:
      'Designed and implemented all gameplay systems — player controller, combat framework, enemy behaviors, and game feel polish.',
    challenges: [
      'Balancing enemy aggression with readable attack windows',
      'Tuning hit-stop and camera feedback without breaking flow',
    ],
    lessonsLearned: [
      'Player readability beats visual complexity in combat prototypes',
      'Early playtesting exposed pacing issues faster than internal iteration',
      'Separating combat logic from animation improved iteration speed',
    ],
    links: {
      github: 'https://github.com',
      itch: 'https://itch.io',
    },
    featured: true,
  },
  {
    id: 'retro-space-shooter',
    slug: 'retro-space-shooter',
    title: 'Retro Space Shooter',
    subtitle: 'Arcade jam game',
    engine: 'Unity',
    role: 'Solo Developer',
    shortDescription:
      'A 48-hour jam game — dodge, shoot, survive waves of retro enemies.',
    fullDescription:
      'Built during a weekend game jam, Retro Space Shooter focuses on arcade clarity: simple controls, escalating waves, and punchy feedback. Scope was intentionally tight to ship a complete loop within the jam window.',
    coverImage: coverRetro,
    thumbnail: thumbRetro,
    video: null,
    gallery: [galleryRetro1],
    year: '2024',
    duration: '48 hours',
    projectType: 'Game Jam',
    tags: ['SECONDARY_PROJECT', 'GAME_JAM', 'SOLO_PROJECT'],
    skills: ['C#', 'Unity', '2D', 'Rapid Prototyping'],
    features: [
      'Wave-based enemy spawner',
      'Screen-wrap movement',
      'Score combo system',
      'Retro synth-inspired VFX',
    ],
    contribution:
      'Solo development — gameplay, art placeholder integration, juice, and build pipeline.',
    challenges: [
      'Shipping a complete game loop within 48 hours',
      'Keeping scope small enough to polish feel',
    ],
    lessonsLearned: [
      'Constraints force better design decisions',
      'Juice (screen shake, particles) sells simple mechanics',
    ],
    links: {
      itch: 'https://itch.io',
    },
    featured: true,
  },
  {
    id: 'movement-lab',
    slug: 'movement-lab',
    title: 'Movement Lab',
    subtitle: 'Controller feel experiment',
    engine: 'Unity',
    role: 'Solo Developer',
    shortDescription:
      'A sandbox for testing acceleration curves, coyote time, and dash mechanics.',
    fullDescription:
      'Movement Lab is a learning sandbox built to study platformer feel. Each mechanic is isolated so tuning values can be compared side-by-side.',
    coverImage: coverRetro,
    thumbnail: thumbRetro,
    video: null,
    gallery: [],
    year: '2024',
    duration: '2 weeks',
    projectType: 'Experiment',
    tags: ['HOBBY_PROJECT', 'LEARNING_PROJECT'],
    skills: ['C#', 'Unity', 'Character Controller'],
    features: ['Coyote time', 'Variable jump height', 'Dash cooldown system'],
    contribution: 'Solo — all movement systems and debug UI.',
    challenges: ['Making subtle feel differences perceptible during testing'],
    lessonsLearned: ['Small parameter changes have outsized impact on perceived quality'],
    links: {},
    featured: false,
  },
]

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export default projects
