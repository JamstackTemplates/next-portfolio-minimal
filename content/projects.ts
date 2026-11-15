// Portfolio projects. Each record produces a card on Home/Work and a case study at /work/{slug}/.
// These three projects are fictitious placeholders for fictitious "Acme" clients. Replace them with your own work.
// Images live in public/images/; paths here start with /images/ and are prefixed for you.

export interface ProjectImage {
  /** Path inside public/, e.g. /images/my-project/cover.svg */
  src: string;
  width: number;
  height: number;
  /** Describe what the image shows. Use '' only for purely decorative images. */
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  /** Absolute https:// URL. Omit the link entirely rather than shipping a placeholder. */
  url: string;
}

export interface CaseStudySection {
  heading: string;
  /** One string per paragraph. */
  paragraphs: string[];
  /** Optional bullet list shown after the paragraphs. */
  points?: string[];
  /** Optional image shown after the section. */
  image?: ProjectImage;
}

export interface Project {
  /** Stable URL segment: lowercase letters, numbers and hyphens. */
  slug: string;
  title: string;
  /** One line used on cards and in metadata. */
  summary: string;
  /** Client or context. Use a real client only with permission. */
  client: string;
  year: string;
  discipline: string;
  role: string;
  /** Who you worked with and for how long. */
  team: string;
  duration: string;
  tags: string[];
  /** Show on the home page. */
  featured: boolean;
  cover: ProjectImage;
  /** Opening paragraph of the case study. */
  overview: string;
  sections: CaseStudySection[];
  /** What you'd keep or change: reflection rather than invented metrics. */
  lessons: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: 'tidepool',
    title: 'Tidepool',
    summary: 'An offline-first survey app for volunteers recording life on rocky shores.',
    client: 'Acme Coastal Trust',
    year: '2026',
    discipline: 'Product design · Front-end',
    role: 'Research, interface design and front-end development',
    team: 'With a volunteer coordinator and a marine ecologist',
    duration: 'Four months',
    tags: ['Offline-first', 'Progressive web app', 'Field research'],
    featured: true,
    cover: {
      src: '/images/tidepool/cover.svg',
      width: 1600,
      height: 1000,
      alt: 'Three phone screens from the Tidepool app: a survey checklist, a species counter and a sync summary.',
    },
    overview:
      'Volunteer surveyors record the species they find along fixed transects at low tide. They had been using printed sheets that were transcribed by hand weeks later. Tidepool replaces the sheets with a phone app that works with wet hands, bright sun and no signal, and syncs when volunteers get home.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Low tide is a short window. Surveyors kneel on wet rock, often in wind, and need to record quickly before the water returns. Paper worked in those conditions; most apps did not.',
          'Transcription was the real cost. Coordinators spent evenings deciphering smudged sheets, and errors were difficult to trace back to a survey.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I joined two survey sessions before designing anything. Watching people work changed the brief: the app needed large targets, very little typing and a layout that mirrored the transect order surveyors already knew.',
        ],
        points: [
          'Built as a progressive web app so volunteers install it from a link, with no app store account.',
          'All survey data is written to IndexedDB first; syncing is a separate, visible step with a clear queue.',
          'Counters use large stepper buttons and a high-contrast theme that remains legible in direct sunlight.',
          'Species lists are cached per site, so the app only shows what is likely to be found on that shore.',
        ],
        image: {
          src: '/images/tidepool/screens.svg',
          width: 1600,
          height: 900,
          alt: 'Sketch of the counter screen: species names with large minus and plus buttons beside each count.',
          caption: 'The counter screen went through five paper prototypes before the first line of code.',
        },
      },
      {
        heading: 'Result',
        paragraphs: [
          'The app was trialled across a full survey season alongside paper. Coordinators now review records the same day, and each record links back to the surveyor, site and time it came from.',
          'Paper sheets remain available as a fallback — a deliberate decision, because a dead phone battery should never cost a survey.',
        ],
      },
    ],
    lessons: [
      'Field observation was worth more than any amount of interviewing.',
      'Making sync explicit built trust: volunteers could see exactly what had and had not been sent.',
      'Next time I would test the species search with older handsets much earlier.',
    ],
    links: [],
  },
  {
    slug: 'ledgerline',
    title: 'Ledgerline',
    summary: 'A design system and component library for a co-operative bookkeeping tool.',
    client: 'Acme Co-operative',
    year: '2025',
    discipline: 'Design systems · Accessibility',
    role: 'Design system lead and React component engineering',
    team: 'With three product developers',
    duration: 'Six months, part-time',
    tags: ['Design systems', 'Accessibility', 'React'],
    featured: true,
    cover: {
      src: '/images/ledgerline/cover.svg',
      width: 1600,
      height: 1000,
      alt: 'A grid of interface components from Ledgerline: buttons, a data table, form fields and a colour palette.',
    },
    overview:
      'A small co-operative had grown a bookkeeping tool over several years. Each screen had been designed in isolation, so tables, forms and buttons behaved differently from page to page. Ledgerline gave the team a shared vocabulary and a set of accessible components they could adopt gradually.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'The product had four kinds of data table and three date pickers. Keyboard users could not complete several common tasks, and every new feature started with someone rebuilding a component from scratch.',
          'The team was small and already busy, so a big-bang redesign was not an option.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'I began with an inventory of every component in production, grouped by purpose rather than appearance. That made the duplication visible and gave the team an agreed order for replacing things.',
        ],
        points: [
          'Design tokens for colour, spacing, type and radius, shared between Figma and CSS custom properties.',
          'A focused set of components — buttons, fields, tables, dialogs and notices — each with keyboard and screen reader behaviour documented next to the code.',
          'Tabular figures and right-aligned amounts throughout, because the product is mostly numbers.',
          'A migration guide so each team could replace old components screen by screen.',
        ],
        image: {
          src: '/images/ledgerline/table.svg',
          width: 1600,
          height: 900,
          alt: 'The Ledgerline data table: aligned amounts, a sortable column header and a visible keyboard focus ring.',
          caption: 'Tables are the core of the product, so they received the most design and testing time.',
        },
      },
      {
        heading: 'Result',
        paragraphs: [
          'New screens are now assembled from the library, and the documentation site is the first place the team looks when building a feature. Keyboard support for the main invoicing and reconciliation flows was tested with the co-operative’s members, including a screen reader user.',
        ],
      },
    ],
    lessons: [
      'An honest inventory persuaded people more effectively than any mock-up.',
      'Documenting behaviour, not only appearance, is what made components reusable.',
      'Gradual migration was slower but kept the product shippable throughout.',
    ],
    links: [],
  },
  {
    slug: 'acme-transit-timetables',
    title: 'Acme Transit Timetables',
    summary: 'Clear, printable bus timetables generated from open transit data.',
    client: 'Acme Community Transport',
    year: '2024',
    discipline: 'Information design · Static site',
    role: 'Information design and static site generation',
    team: 'Solo, with feedback from passenger panels',
    duration: 'Ten weeks',
    tags: ['Information design', 'Print', 'Open data'],
    featured: true,
    cover: {
      src: '/images/acme-transit/cover.svg',
      width: 1600,
      height: 1000,
      alt: 'A printed bus timetable for route 12 with a simple line diagram of stops and a grid of departure times.',
    },
    overview:
      'A rural community transport service published its timetables as scanned PDFs that were difficult to read on a phone and impossible for screen readers. I built a small static site generator that turns the operator’s open timetable data into accessible web pages and print-ready leaflets from the same source.',
    sections: [
      {
        heading: 'The problem',
        paragraphs: [
          'Many passengers do not use smartphones, so printed timetables at stops and in the library matter as much as the website. Keeping the two in step had been entirely manual.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Passenger panels tested printed drafts at real bus stops. The most useful change came from them: list stops in the order you meet them, and highlight the last bus home.',
        ],
        points: [
          'One data source produces both the web pages and the print stylesheet, so they can no longer disagree.',
          'Departure grids are real HTML tables with row and column headers, readable by screen readers.',
          'A simple line diagram for each route, generated from stop order rather than drawn by hand.',
          'Large type and high contrast throughout, tested on paper as well as on screen.',
        ],
        image: {
          src: '/images/acme-transit/print.svg',
          width: 1600,
          height: 900,
          alt: 'A folded timetable leaflet next to the same timetable on a phone screen.',
          caption: 'Web and print are generated from the same timetable data.',
        },
      },
      {
        heading: 'Result',
        paragraphs: [
          'The operator now updates a single spreadsheet when the timetable changes, and both the website and the print files are rebuilt automatically. Volunteers collect the new leaflets from the local printer rather than redesigning them each season.',
        ],
      },
    ],
    lessons: [
      'Testing print at the bus stop revealed problems that never showed up on a desk.',
      'Generating the line diagram removed a whole category of mistakes.',
      'A static site was the right choice: nothing to patch, and it is fast on poor rural connections.',
    ],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

/** The project after this one, wrapping around, for "Next project" links. */
export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}

export const featuredProjects = projects.filter(project => project.featured);
