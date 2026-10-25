'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './community-mark.module.scss';

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
  // Grains on the lower edge trickle down now and then, and climb back.
  trickle: number;
  drop: number;
};

// The COMMUNITY "m" in a 100 × 50 box: a short left stem and two bent
// bands that each step down into a stem, like the original logo.
const MARK = [
  [0, 14, 13, 14, 13, 50, 0, 50],
  [15, 0, 38, 0, 56, 20, 56, 50, 43, 50, 43, 25, 33, 13, 15, 13],
  [58, 0, 81, 0, 99, 20, 99, 50, 86, 50, 86, 25, 76, 13, 58, 13],
];
const WORD = 'COMMUNITY';
// Space around the logo the grains may be pushed into.
const PAD = 28;
// Reach and strength of the cursor: together they open a hole of about
// 10–12px around the pointer, whatever the logo size.
const RADIUS = 24;
const PUSH = 2.2;

// Everything scales from the height of the "m".
type Layout = {
  size: number;
  width: number;
  font: string;
  spacing: string;
};

function layout(size: number): Layout {
  const probe = document.createElement('canvas').getContext('2d');
  const font = `800 ${size / 2}px ${getComputedStyle(document.body).fontFamily}`;
  const spacing = size / 15 + 'px';
  const fallback = { size, width: Math.ceil(size * 6.4), font, spacing };
  if (!probe) return fallback;
  probe.font = font;
  probe.letterSpacing = spacing;
  const word = probe.measureText(WORD).width;
  return { ...fallback, width: Math.ceil(size * 2.4 + word) };
}

/** Paints the logo off screen and keeps every visible pixel as a grain. */
function sample(canvas: HTMLCanvasElement, box: Layout): Particle[] {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const markHeight = box.size;
  const markWidth = box.size * 2;
  const width = box.width + PAD * 2;
  const height = box.size + PAD * 2;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const source = document.createElement('canvas');
  source.width = canvas.width;
  source.height = canvas.height;
  const ctx = source.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];
  const root = getComputedStyle(document.documentElement);
  const primary = root.getPropertyValue('--color-primary').trim();
  const info = root.getPropertyValue('--color-info').trim();
  ctx.scale(dpr, dpr);

  // The mark: light at the top left, deeper blue toward the bottom right.
  const scale = markHeight / 50;
  const markGradient = ctx.createLinearGradient(
    PAD,
    PAD,
    PAD + markWidth,
    PAD + markHeight,
  );
  markGradient.addColorStop(0, '#b9dcff');
  markGradient.addColorStop(1, primary);
  ctx.fillStyle = markGradient;
  for (const shape of MARK) {
    ctx.beginPath();
    for (let i = 0; i < shape.length; i += 2) {
      const x = PAD + (shape[i] ?? 0) * scale;
      const y = PAD + (shape[i + 1] ?? 0) * scale;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  // The word, centred on the mark's height.
  const left = PAD + markWidth + box.size * 0.4;
  ctx.font = box.font;
  ctx.letterSpacing = box.spacing;
  ctx.textBaseline = 'middle';
  const wordGradient = ctx.createLinearGradient(left, 0, PAD + box.width, 0);
  wordGradient.addColorStop(0, info);
  wordGradient.addColorStop(1, primary);
  ctx.fillStyle = wordGradient;
  ctx.fillText(WORD, left, PAD + markHeight / 2 + 1);

  const { data } = ctx.getImageData(0, 0, source.width, source.height);
  const step = Math.max(1, Math.round(dpr));
  const particles: Particle[] = [];
  for (let y = 0; y < source.height; y += step) {
    for (let x = 0; x < source.width; x += step) {
      const i = (y * source.width + x) * 4;
      if ((data[i + 3] ?? 0) < 130) continue;
      const homeX = x / dpr;
      const homeY = y / dpr;
      // Only grains near the bottom of a shape are loose enough to trickle.
      const below = ((y + step * 3) * source.width + x) * 4;
      const edge = (data[below + 3] ?? 0) < 130;
      particles.push({
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        color: `rgb(${data[i]} ${data[i + 1]} ${data[i + 2]})`,
        phase: Math.random() * Math.PI * 2,
        trickle: edge ? Math.random() * 400 : -1,
        drop: 0,
      });
    }
  }
  return particles;
}

/** Runs the grains: they shimmer, trickle and flee the pointer, then return. */
function animate(canvas: HTMLCanvasElement, particles: Particle[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const dpr = canvas.width / parseFloat(canvas.style.width);
  const width = canvas.width / dpr;
  const height = canvas.height / dpr;
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pointer: { x: number; y: number } | null = null;
  let frame = 0;
  let visible = true;
  let tick = 0;

  const onMove = (event: PointerEvent) => {
    const box = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
  };
  const onLeave = () => {
    pointer = null;
  };

  const draw = () => {
    tick += 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      // Loose grains slip down a few pixels, hang there, then climb back.
      if (p.trickle >= 0) {
        p.trickle -= 1;
        if (p.trickle < 0) {
          p.drop = p.drop ? 0 : 3 + Math.random() * 7;
          p.trickle = p.drop
            ? 60 + Math.random() * 90
            : 200 + Math.random() * 500;
        }
      }
      const shimmer = Math.sin(tick * 0.05 + p.phase) * 0.35;
      let ax = (p.homeX + shimmer - p.x) * 0.045;
      let ay = (p.homeY + p.drop - p.y) * 0.045;
      if (pointer) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < RADIUS && distance > 0.01) {
          // Grains flee the cursor; the closer, the harder they are pushed.
          const push = (1 - distance / RADIUS) ** 2 * PUSH;
          ax += (dx / distance) * push + (Math.random() - 0.5) * 0.3;
          ay += (dy / distance) * push + (Math.random() - 0.5) * 0.3;
        }
      }
      p.vx = (p.vx + ax) * 0.86;
      p.vy = (p.vy + ay) * 0.86;
      p.x = Math.min(width - 1, Math.max(0, p.x + p.vx));
      p.y = Math.min(height - 1, Math.max(0, p.y + p.vy));
      // Never fades away: grains that wander off only dim a little.
      const away = Math.hypot(p.x - p.homeX, p.y - p.homeY);
      ctx.globalAlpha = Math.max(0.55, 1 - away / 70);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, 1.3, 1.3);
    }
    ctx.globalAlpha = 1;
    if (visible && !calm) frame = requestAnimationFrame(draw);
  };

  // Spend frames only while the footer is on screen.
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    cancelAnimationFrame(frame);
    if (visible && !calm) frame = requestAnimationFrame(draw);
  });
  observer.observe(canvas);
  if (calm) draw();
  else window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
  };
}

/**
 * The COMMUNITY logo — the big "m" and the word — built from fine blue
 * grains. It is always whole: grains trickle and scatter away from the
 * cursor, then gather back into place. The word stays readable for
 * assistive technology through a visually hidden label.
 */
export function CommunityMark({
  size = 30,
  className,
}: {
  /** Height of the "m" in px; the word and spacing scale with it. */
  size?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    let stop = () => {};
    let disposed = false;
    const start = () => {
      stop();
      const box = layout(size);
      root.style.width = box.width + 'px';
      stop = animate(canvas, sample(canvas, box));
    };
    // Wait for the web font, otherwise the word is sampled in a fallback face.
    void document.fonts.ready.then(() => {
      if (!disposed) start();
    });
    // Colours come from the theme, so repaint the grains when it changes.
    const themes = new MutationObserver(start);
    themes.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => {
      disposed = true;
      themes.disconnect();
      stop();
    };
  }, [size]);

  return (
    <span
      ref={rootRef}
      className={cn(styles.mark, className)}
      style={{ height: size, width: size * 6.4 }}
    >
      <span className="sr-only">{WORD}</span>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ left: -PAD, top: -PAD }}
        aria-hidden="true"
      />
    </span>
  );
}
