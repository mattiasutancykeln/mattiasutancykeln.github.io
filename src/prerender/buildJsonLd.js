/**
 * JSON-LD graph for all prerendered pages (single source from content modules).
 */
import { researchPosts } from '../content/research.js';
import { lecturePosts } from '../content/lectures.js';
import { CONTACT } from '../content/contact.js';
import { KNOWS_ABOUT_TOPICS, META_KEYWORDS } from '../seo/siteMeta.js';

const SITE = 'https://mattiasakke.com';

export function buildJsonLd() {
  const person = {
    '@type': 'Person',
    name: 'Mattias Akke',
    url: `${SITE}/`,
    image: `${SITE}/headshot.jpg`,
    jobTitle: 'Researcher, Molecular AI Lab',
    worksFor: {
      '@type': 'Organization',
      name: 'AstraZeneca',
    },
    email: `mailto:${CONTACT.email}`,
    sameAs: [CONTACT.linkedin, CONTACT.github, CONTACT.scholar, CONTACT.instagram].filter(Boolean),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Lund University',
    },
    knowsAbout: KNOWS_ABOUT_TOPICS,
  };

  const website = {
    '@type': 'WebSite',
    name: 'Mattias Akke',
    url: SITE,
    description:
      'Personal site of Mattias Akke: nanoscience, computational chemistry, machine learning, molecular dynamics, Bayesian optimization, LLMs for scientific discovery, lectures, and CV.',
    keywords: META_KEYWORDS,
    inLanguage: 'en-GB',
    author: { '@type': 'Person', name: 'Mattias Akke' },
  };

  const researchList = {
    '@type': 'ItemList',
    name: 'Research',
    numberOfItems: researchPosts.length,
    itemListElement: researchPosts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.title,
        description: p.summary,
        url: p.externalLink || `${SITE}/research`,
      },
    })),
  };

  const lectureList = {
    '@type': 'ItemList',
    name: 'Lectures and workshops',
    numberOfItems: lecturePosts.length,
    itemListElement: lecturePosts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LearningResource',
        name: p.title,
        description: p.summary,
        url: `${SITE}/lectures`,
      },
    })),
  };

  const cvText = {
    '@type': 'DigitalDocument',
    name: 'Curriculum vitae (plain text)',
    encodingFormat: 'text/plain',
    url: `${SITE}/cv.txt`,
  };

  const cvJson = {
    '@type': 'DigitalDocument',
    name: 'Curriculum vitae (structured JSON)',
    encodingFormat: 'application/json',
    url: `${SITE}/cv.json`,
  };

  const cvPdf = {
    '@type': 'DigitalDocument',
    name: 'Curriculum vitae (PDF)',
    encodingFormat: 'application/pdf',
    url: `${SITE}/cv.pdf`,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [person, website, researchList, lectureList, cvText, cvJson, cvPdf],
  };
}

export function buildJsonLdScriptContent() {
  return JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');
}
