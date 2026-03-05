/**
 * Landing overlay: links to the right of the name, CV + socials top right.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UnderlineLink from './UnderlineLink.jsx';
import { CONTACT } from '../content/contact.js';

const iconSize = 20;
const iconStyle = { width: iconSize, height: iconSize, color: 'var(--text-muted)', transition: 'color 0.15s' };

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
const ScholarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden>
    <path d="M12 14l-6 3V9l6 3 6-3v8l-6-3zm0-11.25L2 7.5l10 4.5 10-4.5L12 2.75z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={iconStyle} aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const CVIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={iconStyle} aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SOCIAL = [
  { href: CONTACT.linkedin, Icon: LinkedInIcon, label: 'LinkedIn' },
  { href: CONTACT.github, Icon: GitHubIcon, label: 'GitHub' },
  { href: CONTACT.scholar, Icon: ScholarIcon, label: 'Google Scholar' },
  { href: `mailto:${CONTACT.email}`, Icon: MailIcon, label: 'Email' },
  { href: CONTACT.instagram, Icon: InstagramIcon, label: 'Instagram' },
];

const linkBlockVariants = {
  initial: { opacity: 0, x: 16 },
  animate: (i) => ({ opacity: 1, x: 0, transition: { delay: 0.1 + i * 0.05, duration: 0.32 } }),
};

export default function NavOverlay() {
  return (
    <>
      {/* Links block: right-flushed, using the right side of the screen */}
      <motion.div
        style={{
          position: 'absolute',
          right: 'clamp(1.5rem, 5vw, 3rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.35rem',
          pointerEvents: 'auto',
          textAlign: 'right',
        }}
      >
        <motion.div variants={linkBlockVariants} initial="initial" animate="animate" custom={0}>
          <UnderlineLink to="/about" align="right" style={{ fontSize: '1.25rem' }}>
            About me
          </UnderlineLink>
        </motion.div>
        <motion.p
          variants={linkBlockVariants}
          initial="initial"
          animate="animate"
          custom={1}
          style={{
            margin: '0.6rem 0 0.2rem',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}
        >
          Also check out my:
        </motion.p>
        <motion.div variants={linkBlockVariants} initial="initial" animate="animate" custom={2}>
          <UnderlineLink to="/research" align="right" style={{ fontSize: '1.2rem' }}>
            Research
          </UnderlineLink>
        </motion.div>
        <motion.div variants={linkBlockVariants} initial="initial" animate="animate" custom={3}>
          <UnderlineLink to="/lectures" align="right" style={{ fontSize: '1.2rem' }}>
            Lectures
          </UnderlineLink>
        </motion.div>
      </motion.div>

      {/* Top right: CV + socials */}
      <motion.div
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          pointerEvents: 'auto',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        <Link
          to="/cv"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}
          className="nav-top-cv"
        >
          <CVIcon />
          <span>CV</span>
        </Link>
        <span style={{ width: 1, height: 14, background: 'var(--border)' }} aria-hidden />
        {SOCIAL.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              padding: 4,
            }}
            className="nav-icon-link"
          >
            <Icon />
          </a>
        ))}
      </motion.div>
    </>
  );
}
