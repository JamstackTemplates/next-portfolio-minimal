// Owner profile. Edit this file to make the portfolio yours.
// Everything here is placeholder content for a fictitious person, "Jane Doe", and fictitious
// "Acme" organisations, so it is obvious that none of it describes a real person or company.
// Plain strings only: text is rendered as text, never as HTML.

export interface ProfileLink {
  /** Visible link text, e.g. "GitHub". */
  label: string;
  /** Absolute https:// URL. Entries with an empty URL are not rendered. */
  url: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  detail: string;
}

export interface Profile {
  name: string;
  /** Short specialism shown under your name. */
  role: string;
  location: string;
  /** A few words set very large at the top of the home page. Keep it under about 50 characters. */
  headline: string;
  /** One or two sentences under the headline; also the default site description. */
  introduction: string;
  /** A short paragraph for the home page "About" summary. */
  summary: string;
  /** About page biography, one string per paragraph. */
  biography: string[];
  /** Public contact address. Choose an address you are happy to publish. */
  email: string;
  /** Optional honest availability note. Set to '' to hide it. */
  availability: string;
  /** Things you are good at, grouped. */
  strengths: { title: string; detail: string }[];
  skills: string[];
  /** How you like to work, one step per entry. */
  approach: { title: string; detail: string }[];
  experience: ExperienceItem[];
  /** Public profiles. Leave `url` empty to hide an entry. */
  links: ProfileLink[];
}

export const profile: Profile = {
  name: 'Jane Doe',
  role: 'Independent developer & interface designer',
  location: 'Anytown — working remotely',
  headline: 'Calm, durable software for small organisations.',
  introduction:
    'I’m an independent designer and developer. I make field tools, design systems and public information that has to work for everyone — on old phones, in poor signal and in a hurry.',
  summary:
    'I work across the whole path from a rough idea to a maintained product — research, interface design and front-end engineering — usually as the only designer-developer on a small team. I prefer plain tools, readable code and interfaces that still make sense in a hurry.',
  biography: [
    'I’m an independent developer and interface designer. For the past ten years I’ve worked with charities, co-operatives, public bodies and small product teams who need something built carefully rather than quickly forgotten.',
    'My background is in typography and print, which still shapes how I work: I start with the content and the reader’s situation, then choose the least complicated technology that will serve them well for years. Most of my projects are web applications, component libraries and data-heavy public information.',
    'I take on a small number of projects at a time so that each one gets proper attention, and I stay involved after launch when a client wants ongoing support.',
  ],
  email: 'jane.doe@example.com',
  availability: 'Currently booking projects from early next quarter.',
  strengths: [
    {
      title: 'Interface design',
      detail: 'Research, information architecture, prototyping and visual design for web and mobile.',
    },
    {
      title: 'Front-end engineering',
      detail: 'TypeScript, React, accessible component libraries, offline-first and static web applications.',
    },
    {
      title: 'Design systems',
      detail: 'Tokens, documentation and shared components that small teams can actually maintain.',
    },
  ],
  skills: [
    'TypeScript',
    'React & Next.js',
    'HTML & CSS',
    'Accessibility (WCAG 2.2)',
    'Service Workers & IndexedDB',
    'Figma',
    'Typography',
    'Usability testing',
    'Data visualisation',
    'Technical writing',
  ],
  approach: [
    {
      title: 'Understand the situation',
      detail:
        'A short discovery phase with the people who will use the product: where they are, what they already use and what gets in their way.',
    },
    {
      title: 'Prototype early',
      detail:
        'Working prototypes in the browser rather than long specifications, so decisions are tested against real content and devices.',
    },
    {
      title: 'Build to be maintained',
      detail:
        'Plain dependencies, written decisions and handover documentation, so your team is not dependent on me after launch.',
    },
  ],
  experience: [
    {
      period: '2019 — now',
      title: 'Independent practice',
      detail: 'Product design and front-end development for charities, co-operatives and small product teams.',
    },
    {
      period: '2016 — 2019',
      title: 'Senior front-end developer, Acme Digital',
      detail: 'Led front-end work on public-sector services and introduced a shared component library.',
    },
    {
      period: '2013 — 2016',
      title: 'Designer, Acme Editions',
      detail: 'Book, report and wayfinding design; first web projects for publishing clients.',
    },
  ],
  links: [
    // Add your public profiles. Entries with an empty URL are hidden, so no dead links ship.
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'Mastodon', url: '' },
  ],
};

/** Profile links that have a URL. */
export const publicLinks = profile.links.filter(link => link.url.trim() !== '');
