/**
 * Landing page — full-viewport canvas + floating nav (PROJECT.md §3.1)
 */
import BrownianCanvas from '../components/BrownianCanvas.jsx';
import NavOverlay from '../components/NavOverlay.jsx';

function Landing() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <BrownianCanvas />
      <NavOverlay />
      <p
        className="font-mono landing-footer-caption"
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: 0,
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      >
        Brownian dynamics — Langevin thermostat · Mattias Akke — nanoscience, computational chemistry and ML
      </p>
    </div>
  );
}

export default Landing;
