/**
 * Lecture/workshop metadata. Single source for /lectures page (PROJECT.md §3.4).
 * Same shape as research plus venue and audience. Add figure.png per slug in public/content/lectures/[slug]/ if desired.
 */
export const lecturePosts = [
  {
    slug: 'optimised-learning-imo',
    title: 'Optimised learning for elite mathematicians',
    institution: 'Nordic IMO Teams',
    date: '2025',
    summary: 'Workshop on optimised learning approaches for elite mathematicians and IMO team preparation.',
    tags: ['Mathematics', 'Education'],
    figure: 'figure.png',
    externalLink: null,
    pdfFile: null,
    status: null,
    venue: 'Nordic IMO Teams workshop',
    audience: 'IMO team members and coaches',
  },
  {
    slug: 'competitive-programming-kodsport',
    title: 'Competitive programming workshops',
    institution: 'Kodsport Sverige',
    date: '2019–now',
    summary: 'Ongoing workshops and training in competitive programming for Swedish students.',
    tags: ['Competitive Programming', 'Education'],
    figure: 'figure.png',
    externalLink: null,
    pdfFile: null,
    status: null,
    venue: 'Kodsport Sverige',
    audience: 'High-school and university students',
  },
  {
    slug: 'advanced-maths-ung-vetenskapssport',
    title: 'Advanced mathematics workshops',
    institution: 'Ung Vetenskapssport',
    date: '2018–now',
    summary: 'Advanced mathematics workshops for young science enthusiasts.',
    tags: ['Mathematics', 'Education'],
    figure: 'figure.png',
    externalLink: null,
    pdfFile: null,
    status: null,
    venue: 'Ung Vetenskapssport',
    audience: 'High-school students',
  },
];
