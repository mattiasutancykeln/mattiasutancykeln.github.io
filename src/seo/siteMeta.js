/**
 * Shared vocabulary for HTML meta, prerender snippets, and JSON-LD.
 * Kept in one module so keyword lists stay aligned with build + structured data.
 *
 * If you add major themes, mirror a short phrase in public/llms.txt § “Topics for search & retrieval”.
 */

/** Comma-separated meta keywords (some engines and internal tools still ingest this). */
export const META_KEYWORDS = [
  'Mattias Akke',
  'computational chemistry',
  'molecular dynamics',
  'machine learning',
  'AI for science',
  'artificial intelligence',
  'Bayesian optimization',
  'Bayesian optimisation',
  'active learning',
  'LLM',
  'large language models',
  'LLM-mediated optimization',
  'LangGraph',
  'PyTorch',
  'molecular simulation',
  'molecular design',
  'drug discovery',
  'biochemical discovery',
  'cheminformatics',
  'AstraZeneca',
  'Molecular AI Lab',
  'nanoscience',
  'engineering nanoscience',
  'Lund University',
  'LTH',
  'Sweden',
  'Lund',
  'biophysics',
  'microfluidics',
  'physics-informed neural networks',
  'amyloid',
  'GROMACS',
  'PLUMED',
  'metadynamics',
  'coarse-grained molecular dynamics',
  'Martini force field',
  'molecular motors',
  'supramolecular assemblies',
  'iGEM',
  'synthetic biology',
  'peptide design',
  'MIT',
  'University of Cambridge',
  'Politecnico di Torino',
  'Karolinska Institute',
  'competitive programming',
  'algorithmics',
  'Kodsport Sverige',
  'European Girls Olympiad in Informatics',
  'EGMO',
  'International Physics Olympiad',
  'IPhO',
  'mathematics olympiad',
  'IMO training',
  'STEM outreach',
].join(', ');

export const HTML_META_AUTHOR = 'Mattias Akke';

/** Encourage indexing + rich preview cards where valid. */
export const HTML_META_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/** Schema.org Person.knowsAbout (compact topical claims). */
export const KNOWS_ABOUT_TOPICS = [
  'computational chemistry',
  'molecular dynamics',
  'machine learning',
  'Bayesian optimization',
  'large language models',
  'active learning',
  'LangGraph',
  'molecular simulation',
  'nanoscience',
  'drug discovery',
  'biophysics',
  'iGEM',
  'synthetic biology',
  'competitive programming',
  'mathematics education',
  'AI for science',
];
