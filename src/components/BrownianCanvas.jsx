/**
 * Brownian particle simulation — landing page background (PROJECT.md §3.1, §7).
 *
 * COORDINATE SYSTEM (single source of truth):
 * - Simulation runs entirely in canvas buffer space: (0,0) to (canvas.width, canvas.height).
 * - All physics, text grid, and drawing use these dimensions only.
 * - Name collision uses a pixel grid from the rendered text (same shape as letters), rebuilt when canvas size changes.
 */
import { useRef, useEffect } from 'react';

const NUM_PARTICLES = 120;
const SMALL_RATIO = 0.85;
const BROWNIAN_FORCE = 0.3;
const DAMPEN = 0.995;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 1000;
const WRAP_MARGIN = 24;
const TRAIL_LENGTH = 6;
const TRAIL_MAX_ALPHA = 0.35;
const TEXT_FONT_SIZE = 140;
const TEXT_REFLECT_DAMP = 0.8;
const TEXT_FONT = '"Playfair Display", "EB Garamond", serif';
const NAME_LEFT_RATIO = 0.14;
const NAME_FONT_SCALE = 0.62;
const NAME_LINE_HEIGHT = 1.18;
const TEXT_GRID_CELL = 3;

// Scroll → shake the box; force applied to balls with liquid inertia
const SCROLL_SHAKE_SCALE = 0.08;
const SHAKE_DAMP = 0.88;
const SHAKE_INERTIA = 0.03;
// Virtual scroll offset (accumulates wheel); when user stops, it snaps back toward 0
const SNAP_DAMP = 0.88;
const SNAP_SHAKE_SCALE = 0.08;

function getTextFontSize(h) {
  return Math.min(TEXT_FONT_SIZE, Math.max(48, h * 0.42)) * NAME_FONT_SCALE;
}

function drawNameText(ctx, nameX, nameY, fontSize, fillStyle) {
  const lineHeight = fontSize * NAME_LINE_HEIGHT;
  ctx.font = `bold ${fontSize}px ${TEXT_FONT}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = fillStyle;
  ctx.fillText('Mattias', nameX, nameY - lineHeight / 2);
  ctx.fillText('Akke', nameX, nameY + lineHeight / 2);
}

/** Build collision grid from canvas image data (bright pixels = text). */
function buildTextGridFromImageData(imageData, sourceW, sourceH, fontSize) {
  if (sourceW <= 0 || sourceH <= 0) {
    return { grid: new Uint8Array(0), gW: 0, gH: 0, cell: TEXT_GRID_CELL, fontSize, sourceW: 0, sourceH: 0 };
  }
  const data = imageData.data;
  const cell = TEXT_GRID_CELL;
  const gW = Math.ceil(sourceW / cell);
  const gH = Math.ceil(sourceH / cell);
  const grid = new Uint8Array(gW * gH);
  for (let y = 0; y < sourceH; y += cell) {
    for (let x = 0; x < sourceW; x += cell) {
      const i = (y * sourceW + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const bright = (r + g + b) / 3 > 128;
      if (bright) {
        const gy = Math.floor(y / cell);
        const gx = Math.floor(x / cell);
        if (gy < gH && gx < gW) grid[gy * gW + gx] = 1;
      }
    }
  }
  return { grid, gW, gH, cell, fontSize, sourceW, sourceH };
}

/** True if circle (center cx, cy, radius r) overlaps any text cell. */
function circleOverlapsText(cx, cy, r, grid, gW, gH, cell) {
  const gxMin = Math.max(0, Math.floor((cx - r) / cell));
  const gxMax = Math.min(gW - 1, Math.floor((cx + r) / cell));
  const gyMin = Math.max(0, Math.floor((cy - r) / cell));
  const gyMax = Math.min(gH - 1, Math.floor((cy + r) / cell));
  for (let gy = gyMin; gy <= gyMax; gy++) {
    for (let gx = gxMin; gx <= gxMax; gx++) {
      if (grid[gy * gW + gx] !== 1) continue;
      const rx = gx * cell;
      const ry = gy * cell;
      const px = Math.max(rx, Math.min(rx + cell, cx));
      const py = Math.max(ry, Math.min(ry + cell, cy));
      const dx = cx - px;
      const dy = cy - py;
      if (dx * dx + dy * dy <= r * r) return true;
    }
  }
  return false;
}

function createParticles(w, h) {
  const particles = [];
  const nSmall = Math.floor(NUM_PARTICLES * SMALL_RATIO);
  const nLarge = NUM_PARTICLES - nSmall;
  const m = WRAP_MARGIN;

  const add = (side, r, mass, isLarge) => {
    let x, y, vx, vy;
    switch (side) {
      case 0:
        x = -m + Math.random() * m * 0.9;
        y = Math.random() * h;
        vx = 0.5 + Math.random() * 1.5;
        vy = (Math.random() - 0.5) * 2;
        break;
      case 1:
        x = w + Math.random() * m * 0.9;
        y = Math.random() * h;
        vx = -(0.5 + Math.random() * 1.5);
        vy = (Math.random() - 0.5) * 2;
        break;
      case 2:
        x = Math.random() * w;
        y = -m + Math.random() * m * 0.9;
        vx = (Math.random() - 0.5) * 2;
        vy = 0.5 + Math.random() * 1.5;
        break;
      default:
        x = Math.random() * w;
        y = h + Math.random() * m * 0.9;
        vx = (Math.random() - 0.5) * 2;
        vy = -(0.5 + Math.random() * 1.5);
    }
    particles.push({ x, y, vx, vy, r, mass, isLarge, history: [] });
  };

  for (let i = 0; i < nSmall; i++) {
    const r = 3 + Math.random() * 3;
    add(i % 4, r, r, false);
  }
  for (let i = 0; i < nLarge; i++) {
    const r = 10 + Math.random() * 10;
    add((nSmall + i) % 4, r, r * 1.5, true);
  }
  return particles;
}

function getParticleColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    sm: style.getPropertyValue('--particle-sm').trim() || 'rgba(62, 207, 178, 0.55)',
    lg: style.getPropertyValue('--particle-lg').trim() || 'rgba(126, 184, 154, 0.4)',
  };
}

function parseBgRgb() {
  const style = getComputedStyle(document.documentElement);
  const bg = style.getPropertyValue('--bg').trim() || '#0D1A14';
  if (bg.startsWith('#')) {
    const hex = bg.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }
  const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) return { r: +match[1], g: +match[2], b: +match[3] };
  return { r: 13, g: 26, b: 20 };
}

function getSolidBgFill() {
  const { r, g, b } = parseBgRgb();
  return `rgb(${r}, ${g}, ${b})`;
}

function getAccentTeal() {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue('--accent-teal').trim() || '#3ECFB2';
}

export default function BrownianCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const textGridRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const shakeRef = useRef({ vx: 0, vy: 0 });
  const scrollOffsetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const displayW = parent.clientWidth;
      const displayH = parent.clientHeight;
      if (displayW <= 0 || displayH <= 0) return;

      canvas.width = displayW;
      canvas.height = displayH;
      textGridRef.current = null;

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(displayW, displayH);
      } else {
        const periodX = displayW + 2 * WRAP_MARGIN;
        const periodY = displayH + 2 * WRAP_MARGIN;
        particlesRef.current.forEach((p) => {
          p.x = ((p.x % periodX) + periodX) % periodX - WRAP_MARGIN;
          p.y = ((p.y % periodY) + periodY) % periodY - WRAP_MARGIN;
        });
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const handleWheel = (e) => {
      const s = shakeRef.current;
      const o = scrollOffsetRef.current;
      o.x += e.deltaX;
      o.y += e.deltaY;
      s.vx -= e.deltaX * SCROLL_SHAKE_SCALE;
      s.vy -= e.deltaY * SCROLL_SHAKE_SCALE;
    };
    parent.addEventListener('wheel', handleWheel, { passive: true });

    const colors = getParticleColors();
    const solidBgFill = getSolidBgFill();

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const ctx = canvas.getContext('2d');
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.fillStyle = solidBgFill;
      ctx.fillRect(0, 0, w, h);

      let gridMatches = textGridRef.current && textGridRef.current.sourceW === w && textGridRef.current.sourceH === h;
      if (!gridMatches && w > 0 && h > 0) {
        const fontSize = getTextFontSize(h);
        const nameX = w * NAME_LEFT_RATIO;
        const nameY = h / 2;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        drawNameText(ctx, nameX, nameY, fontSize, '#fff');
        const imageData = ctx.getImageData(0, 0, w, h);
        textGridRef.current = buildTextGridFromImageData(imageData, w, h, fontSize);
        gridMatches = true;
        ctx.fillStyle = solidBgFill;
        ctx.fillRect(0, 0, w, h);
      }

      const grid = gridMatches && textGridRef.current ? textGridRef.current.grid : new Uint8Array(0);
      const gW = gridMatches && textGridRef.current ? textGridRef.current.gW : 0;
      const gH = gridMatches && textGridRef.current ? textGridRef.current.gH : 0;
      const cell = gridMatches && textGridRef.current ? textGridRef.current.cell : TEXT_GRID_CELL;
      const textFontSize = gridMatches && textGridRef.current ? textGridRef.current.fontSize : getTextFontSize(h);

      const shake = shakeRef.current;
      const scrollOffset = scrollOffsetRef.current;
      const prevX = scrollOffset.x;
      const prevY = scrollOffset.y;
      scrollOffset.x *= SNAP_DAMP;
      scrollOffset.y *= SNAP_DAMP;
      shake.vx += (prevX - scrollOffset.x) * SNAP_SHAKE_SCALE;
      shake.vy += (prevY - scrollOffset.y) * SNAP_SHAKE_SCALE;
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * BROWNIAN_FORCE;
        p.vy += (Math.random() - 0.5) * BROWNIAN_FORCE;
        p.vx *= DAMPEN;
        p.vy *= DAMPEN;

        p.vx += shake.vx * SHAKE_INERTIA;
        p.vy += shake.vy * SHAKE_INERTIA;

        if (mouse.x != null && mouse.y != null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPULSION_RADIUS && dist > 1) {
            const force = REPULSION_STRENGTH / (dist * dist * p.mass);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        let nx = p.x + p.vx;
        let ny = p.y + p.vy;

        const hitsName = gW > 0 && gH > 0 && circleOverlapsText(nx, ny, p.r, grid, gW, gH, cell);
        if (hitsName) {
          p.vx *= -TEXT_REFLECT_DAMP;
          p.vy *= -TEXT_REFLECT_DAMP;
        } else {
          const periodX = w + 2 * WRAP_MARGIN;
          const periodY = h + 2 * WRAP_MARGIN;
          if (nx < -WRAP_MARGIN) nx += periodX;
          else if (nx > w + WRAP_MARGIN) nx -= periodX;
          if (ny < -WRAP_MARGIN) ny += periodY;
          else if (ny > h + WRAP_MARGIN) ny -= periodY;
          p.x = nx;
          p.y = ny;
        }

        p.history.push({ x: p.x, y: p.y });
        if (p.history.length > TRAIL_LENGTH) p.history.shift();

        for (let i = 0; i < p.history.length; i++) {
          const t = p.history[i];
          const alpha = ((i + 1) / p.history.length) * TRAIL_MAX_ALPHA;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.isLarge ? colors.lg : colors.sm;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isLarge ? colors.lg : colors.sm;
        ctx.fill();
      }

      const teal = getAccentTeal();
      const nameX = w * NAME_LEFT_RATIO;
      const nameY = h / 2;
      ctx.save();
      ctx.shadowColor = teal;
      ctx.shadowBlur = 28;
      ctx.globalAlpha = 0.5;
      drawNameText(ctx, nameX, nameY, textFontSize, teal);
      ctx.restore();

      shake.vx *= SHAKE_DAMP;
      shake.vy *= SHAKE_DAMP;

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('wheel', handleWheel);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
      }}
      aria-hidden
    />
  );
}
