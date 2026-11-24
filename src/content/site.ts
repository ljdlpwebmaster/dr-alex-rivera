/**
 * Single source of truth for all site content.
 *
 * Every word visitors read, and every value in the JSON-LD structured data,
 * comes from this file. Edit copy here; the components and schema update
 * together, so the page and the structured data can never disagree.
 *
 * Copy is used exactly as supplied in the brief.
 */

export interface Person {
  honorificPrefix: string;
  givenName: string;
  familyName: string;
  /** Full display name, e.g. "Dr Alex Rivera". */
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  locality: string;
  /** ISO 3166-1 alpha-2 country code. */
  countryCode: string;
  countryName: string;
  /** Topic the bio says she trains in, used for `knowsAbout`. */
  specialty: string;
}

export interface Course {
  /** Stable id: used as the HTML anchor and the JSON-LD @id fragment. */
  id: string;
  name: string;
  description: string;
  /** Length exactly as supplied, shown to visitors. */
  length: string;
  /** Link exactly as supplied. "#" means no course page yet. */
  href: string;
  /** Machine-readable workload for JSON-LD (ISO 8601 duration). */
  workload: string;
  /** Set for recurring courses (ISO 8601 duration between sessions). */
  repeatFrequency?: string;
}

const givenName = 'Alex';
const familyName = 'Rivera';
const honorificPrefix = 'Dr';

export const person: Person = {
  honorificPrefix,
  givenName,
  familyName,
  name: `${honorificPrefix} ${givenName} ${familyName}`,
  jobTitle: 'Clinical Psychologist and Trainer',
  bio: 'Dr Alex Rivera is a clinical psychologist based in Sydney, Australia. For the past 12 years she has trained psychologists, counsellors and social workers in Acceptance and Commitment Therapy, a practical approach that helps people handle difficult thoughts and feelings and act on what matters to them.',
  email: 'hello@example.com',
  locality: 'Sydney',
  countryCode: 'AU',
  countryName: 'Australia',
  specialty: 'Acceptance and Commitment Therapy',
};

export const courses: Course[] = [
  {
    id: 'introduction-to-act',
    name: 'Introduction to Acceptance and Commitment Therapy',
    description: 'The core ideas and skills, for practitioners new to the approach.',
    length: '6 hours, online',
    href: '#',
    workload: 'PT6H',
  },
  {
    id: 'act-for-anxiety',
    name: 'Acceptance and Commitment Therapy for Anxiety',
    description: 'How to apply the approach with clients experiencing anxiety.',
    length: '4 hours, online',
    href: '#',
    workload: 'PT4H',
  },
  {
    id: 'act-supervision',
    name: 'Acceptance and Commitment Therapy Supervision',
    description: 'Monthly group sessions to discuss cases and build confidence.',
    length: '1.5 hours a month, online',
    href: '#',
    workload: 'PT1H30M',
    repeatFrequency: 'P1M',
  },
];

/**
 * Page-level metadata. The description is built only from phrases in the
 * supplied bio, trimmed to stay under the ~160 character search snippet limit.
 */
export const page = {
  title: `${person.name} | ${person.jobTitle}`,
  description:
    'Clinical psychologist in Sydney, Australia, training psychologists, counsellors and social workers in Acceptance and Commitment Therapy.',
  siteName: person.name,
  locale: 'en_AU',
  lang: 'en-AU',
};

/** In-page navigation. Order matches the sections on the page. */
export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Contact', href: '#contact' },
] as const;

/** Alt text for each photo, kept with the rest of the copy. */
export const photos = {
  hero: {
    alt: 'Dr Alex Rivera smiling as she leads a training workshop for a small group of practitioners',
  },
  about: {
    alt: 'Dr Alex Rivera speaking during an online training session from her office',
  },
};
