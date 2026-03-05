/**
 * About page (PROJECT.md §3.2)
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CONTACT } from '../content/contact.js';

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  }),
};
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
const headshotVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4 } },
};

export default function About() {
  const headshotSrc = `${import.meta.env.BASE_URL}headshot.jpg`;

  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(1.5rem, 5vw, 3rem) 1.5rem',
      }}
    >
      <motion.div variants={item}>
        <Link
          to="/"
          className="font-mono"
          style={{
            display: 'inline-block',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          ← home
        </Link>
      </motion.div>

      <motion.div
        variants={headshotVariants}
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          border: '3px solid var(--accent-teal)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          flexShrink: 0,
        }}
      >
        <img
          src={headshotSrc}
          alt="Mattias Akke"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.background = 'var(--bg-surface)';
            e.target.onerror = null;
            e.target.src = '';
          }}
        />
      </motion.div>

      <motion.h1
        variants={item}
        className="font-display"
        style={{ fontSize: '2.4rem', margin: '0 0 0.5rem', fontWeight: 600 }}
      >
        Mattias Akke
      </motion.h1>
      <motion.p
        variants={item}
        className="font-mono"
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          margin: '0 0 1.5rem',
        }}
      >
        MSc.Eng. Nanoscience · AI for science · Mathematical Optimization
      </motion.p>

      <motion.div variants={item} style={{ marginBottom: '1.5rem' }}>
        <p style={{ lineHeight: 1.7, margin: 0 }}>
          I'm a researcher at the intersection of computational chemistry, machine learning, and
          mathematical modelling. My work spans molecular dynamics simulations of self-assembling supramolecular
          systems, Bayesian optimisation, generative models for molecular design, and open-ended discovery with LLMs. Currently working in the Molecular AI Lab at AstraZeneca.
        </p>
        <p style={{ lineHeight: 1.7, margin: '1rem 0 0' }}>
          I completed my MSc.Eng. in Engineering Nanoscience at Lund University, with research internships at MIT
          (Gómez-Bombarelli group), University of Cambridge (Knowles group), Politecnico di Torino (Pavan group), Lund University (Burke group),
          and Karolinska Institute. I'm a Physics Olympiad medalist, EUCYS winner in Biochemistry, and organizer of
          the European Girls' Olympiad in Informatics as the chair of Kodsport Sweden. Outside research I run long distances,
          climb rocks, and teach competitive programming to high-school students.
        </p>
      </motion.div>

      <motion.p variants={item} style={{ lineHeight: 1.7, margin: 0 }}>
        Let's have a chat:{' '}
        <a
          href={`mailto:${CONTACT.email}`}
          style={{
            color: 'var(--accent-teal)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          {CONTACT.email}
        </a>
      </motion.p>
    </motion.article>
  );
}
