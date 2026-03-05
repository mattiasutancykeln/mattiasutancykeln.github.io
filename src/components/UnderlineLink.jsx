/**
 * Link with animated underline + color on hover. align="right" = underline grows from right edge.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const transition = { duration: 0.22, ease: [0.4, 0, 0.2, 1] };

export default function UnderlineLink({ to, children, align = 'left', ...props }) {
  const isRight = align === 'right';
  return (
    <Link
      to={to}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        fontSize: 'inherit',
        padding: '0.25rem 0',
        ...props.style,
      }}
      className={props.className}
    >
      <motion.span
        style={{ position: 'relative', display: 'inline-block' }}
        initial="rest"
        whileHover="hover"
        variants={{
          rest: { color: 'var(--text-primary)' },
          hover: { color: 'var(--accent-teal)', transition },
        }}
      >
        {children}
        <motion.span
          style={{
            position: 'absolute',
            [isRight ? 'right' : 'left']: 0,
            bottom: '2px',
            height: '2px',
            background: 'var(--accent-teal)',
            transformOrigin: isRight ? 'right' : 'left',
          }}
          variants={{
            rest: { width: 0 },
            hover: { width: '100%', transition },
          }}
        />
      </motion.span>
    </Link>
  );
}
