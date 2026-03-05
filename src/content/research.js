import { prerenderToNodeStream } from "react-dom/static";

/**
 * Research post metadata. Single source for /research page (PROJECT.md §3.3).
 * Update this array to add or edit entries; optional: add figure.png and paper.pdf per slug in public/content/research/[slug]/.
 */
export const researchPosts = [
  {
    slug: 'bayesian-opt-llms',
    title: 'Bayesian Optimization for Biochemical Discovery with LLMs',
    institution: 'MIT — Gómez-Bombarelli Group',
    date: '2025',
    summary: 'We combined large language models with Bayesian optimization loops for accelerated biochemical property prediction and molecular design, probing the limits of LLMs in chemical discovery.',
    tags: ['Bayesian Optimization', 'LLMs', 'Drug Discovery'],
    figure: 'figure.png',
    externalLink: 'https://chemrxiv.org/doi/full/10.26434/chemrxiv-2025-w1wsh',
    pdfFile: 'poster.pdf',
    status: 'Under review',
  },
  {
    slug: 'multiscale-motors',
    title: 'Multiscale Modelling of Supramolecular Assemblies of Light-Driven Molecular Motors',
    institution: 'Politecnico di Torino — Pavan Group',
    date: '2023',
    summary: 'We modeled the behaviour of light-driven molecular motors in supramolecular assemblies using molecular dynamics, metadynamics, and coarse-graining.',
    tags: ['Molecular Dynamics', 'Metadynamics', 'Coarse Graining', 'Molecular Motors'],
    figure: 'figure.png',
    externalLink: null,
    pdfFile: 'poster.pdf',
    status: 'Ongoing',
  },
  {
    slug: 'cambridge-ion-amyloid',
    title: 'Probing amyloid-ion binding with microfluidics and Physics-informed NN',
    institution: 'University of Cambridge — Knowles Group',
    date: '2021',
    summary: 'Measured the binding of divalent cations to alpha-synuclein monomers using microfluidic electrophoresis and worked on a physics-informed neural networks for accellerated fitting of reaction kinetics.',
    tags: ['Microfluidics', 'Machine Learning', 'Amyloid', 'Biophysics'],
    figure: 'figure.png',
    externalLink: null,
    pdfFile: "report.pdf",
    status: "Unpublished",
  },
  {
    slug: 'igem-curli',
    title: 'iGEM: Mathematical modelling of curli-producing bacteria',
    institution: 'Lund University',
    date: '2021',
    summary: 'We modeled the production of curli biofilms in curli-producing bacteria and probed the effect of various drug candidates. iGEM competition entry.',
    tags: ['iGEM', 'Amyloid', 'Mathematical Modelling'],
    figure: 'figure.png',
    externalLink: 'https://2021.igem.org/Team:Lund/Model',
    pdfFile: null,
    status: 'Gold medal',
  },
  {
    slug: 'igem-anti-oomycete',
    title: 'iGEM: Generating anti-oomycete peptides with ensemble models',
    institution: 'Lund University',
    date: '2021',
    summary: 'We developed an ensemble model for anti-oomycete peptide classification and a genetic algorithm for de-novo peptide design. iGEM competition entry.',
    tags: ['iGEM', 'Synthetic Biology', 'Machine Learning'],
    figure: 'figure.png',
    externalLink: 'https://2020.igem.org/Team:Lund/Model',
    pdfFile: null,
    status: 'Gold medal',
  },
  
];
