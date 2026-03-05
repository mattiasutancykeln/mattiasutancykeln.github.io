/**
 * Lecture/workshop metadata. Single source for /lectures page (PROJECT.md §3.4).
 * Lectures do not use figure, externalLink, or status. Optional: pdfFile for first-page preview.
 */
export const lecturePosts = [
  {
    slug: 'optimised-learning-imo',
    title: 'Optimised learning for elite mathematicians',
    institution: 'Ung Vetenskapssport',
    date: '2025',
    summary: 'Workshop on optimised learning approaches for elite mathematicians and IMO team preparation.',
    tags: ['Mathematics', 'Education', 'Learning to learn'],
    pdfFile: 'compendium.pdf',
    venue: null,
    audience: 'IMO team members and coaches',
  },
  {
    slug: 'algebra1-smt',
    title: 'Polynomials',
    institution: 'Ung Vetenskapssport',
    date: '2025',
    summary: 'Algebra lecture for Swedish mathematical olympiad finalists.',
    tags: ['Mathematics', 'Education', 'Algebra'],
    pdfFile: 'polynomials.pdf',
    venue: null,
    audience: 'Swedish mathematical olympiad finalists',
  },
];
