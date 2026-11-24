/**
 * Builds the page's JSON-LD (schema.org) graph from the content model.
 *
 * One @graph links the entities by @id, so search engines and AI answer
 * engines can see that this page is about Dr Rivera and that she provides
 * each course:
 *
 *   WebSite ─▶ ProfilePage ─(mainEntity)─▶ Person ◀─(provider)─ Course ×3
 */
import { courses, page, person, type Course } from '../content/site';

interface GraphOptions {
  /** Absolute canonical URL of the page, with trailing slash. */
  pageUrl: string;
  /** Absolute URL of the main photo. */
  imageUrl: string;
}

export function buildStructuredData({ pageUrl, imageUrl }: GraphOptions) {
  const ids = {
    website: `${pageUrl}#website`,
    page: `${pageUrl}#webpage`,
    person: `${pageUrl}#person`,
    course: (course: Course) => `${pageUrl}#${course.id}`,
  };

  const personNode = {
    '@type': 'Person',
    '@id': ids.person,
    name: person.name,
    honorificPrefix: person.honorificPrefix,
    givenName: person.givenName,
    familyName: person.familyName,
    jobTitle: person.jobTitle,
    description: person.bio,
    email: `mailto:${person.email}`,
    image: imageUrl,
    url: pageUrl,
    knowsAbout: person.specialty,
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.locality,
      addressCountry: person.countryCode,
    },
  };

  const courseNodes = courses.map((course) => ({
    '@type': 'Course',
    '@id': ids.course(course),
    name: course.name,
    description: course.description,
    url: `${pageUrl}#${course.id}`,
    inLanguage: page.lang,
    provider: { '@id': ids.person },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: course.workload,
      instructor: { '@id': ids.person },
      ...(course.repeatFrequency && {
        courseSchedule: {
          '@type': 'Schedule',
          repeatFrequency: course.repeatFrequency,
          duration: course.workload,
        },
      }),
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ids.website,
        url: pageUrl,
        name: person.name,
        inLanguage: page.lang,
      },
      {
        '@type': 'ProfilePage',
        '@id': ids.page,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: page.lang,
        isPartOf: { '@id': ids.website },
        mainEntity: { '@id': ids.person },
        primaryImageOfPage: imageUrl,
      },
      personNode,
      ...courseNodes,
    ],
  };
}
