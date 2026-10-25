'use client';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type NavPill = { x: number; y: number; width: number; height: number };

const ACTIVE = '[data-nav-active="true"]';
const DURATION = 620;
// Slow start and soft landing: the highlight eases out of one item and
// settles into the next like a drop of liquid.
const EASING = 'cubic-bezier(0.65, 0, 0.25, 1)';

// Each page mounts its own shell, so state that must survive a navigation
// lives outside React: the last resting place and the glide in flight.
let lastPill: NavPill | null = null;
let flight: { frames: Keyframe[]; start: number } | null = null;

function measure(nav: HTMLElement, selector = ACTIVE): NavPill | null {
  const item = nav.querySelector<HTMLElement>(selector);
  if (!item) return null;
  const box = nav.getBoundingClientRect();
  const rect = item.getBoundingClientRect();
  return {
    x: rect.left - box.left,
    y: rect.top - box.top,
    width: rect.width,
    height: rect.height,
  };
}

function same(a: NavPill, b: NavPill) {
  return (
    Math.abs(a.y - b.y) < 0.5 &&
    Math.abs(a.x - b.x) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5
  );
}

/**
 * Keyframes for a liquid move: the leading edge stretches toward the target
 * first, the pill thins a little while it is long, then the trailing edge
 * catches up and the pill settles.
 */
function glideFrames(from: NavPill, to: NavPill): Keyframe[] {
  const frame = (y: number, height: number, width: number, squeeze = 1) => ({
    transform: `translate(${to.x}px, ${y}px) scaleX(${squeeze})`,
    height: `${height}px`,
    width: `${width}px`,
  });
  const down = to.y > from.y;
  const fromBottom = from.y + from.height;
  const toBottom = to.y + to.height;
  // The far edge arrives early; the near edge has only just started.
  const lead = down
    ? frame(
        from.y + (to.y - from.y) * 0.12,
        toBottom - (from.y + (to.y - from.y) * 0.12),
        to.width,
        0.94,
      )
    : frame(
        to.y,
        fromBottom - (fromBottom - toBottom) * 0.12 - to.y,
        to.width,
        0.94,
      );
  return [
    { ...frame(from.y, from.height, from.width), offset: 0 },
    { ...lead, offset: 0.45 },
    // A touch of overshoot past the target, then rest.
    { ...frame(to.y + (down ? 2 : -2), to.height, to.width), offset: 0.82 },
    { ...frame(to.y, to.height, to.width), offset: 1 },
  ];
}

/** A highlight that flows to the active navigation item. */
export function useNavPill(active: string, collapsed: boolean) {
  const ref = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [pill, setPill] = useState<NavPill | null>(null);
  // The item the pill is heading to after a click, before the page changes.
  const [target, setTarget] = useState<{ from: string; to: string } | null>(
    null,
  );

  // Runs the glide on the pill element; `elapsed` resumes one already in
  // flight when a new page's shell takes over mid-move.
  const play = useCallback((frames: Keyframe[], elapsed = 0) => {
    const element = pillRef.current;
    if (!element) return;
    element.getAnimations().forEach((animation) => animation.cancel());
    const animation = element.animate(frames, {
      duration: DURATION,
      easing: EASING,
    });
    animation.currentTime = elapsed;
  }, []);

  const glide = useCallback(
    (from: NavPill | null, to: NavPill) => {
      if (!from || same(from, to)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const frames = glideFrames(from, to);
      flight = { frames, start: performance.now() };
      play(frames);
    },
    [play],
  );

  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const next = measure(nav);
    const from = lastPill;
    lastPill = next;
    setPill(next);
    // Started before the first paint, so the pill never flashes at its end.
    if (next) {
      const elapsed = flight ? performance.now() - flight.start : DURATION;
      // A click already started this move: carry on from where it is.
      if (flight && elapsed < DURATION && from && same(from, next))
        play(flight.frames, elapsed);
      else glide(from, next);
    }

    const observer = new ResizeObserver(() => {
      const current = measure(nav);
      lastPill = current;
      setPill(current);
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active, collapsed, glide, play]);

  /** Starts the move the moment an item is clicked, before the page loads. */
  const moveTo = useCallback(
    (section: string) => {
      const nav = ref.current;
      if (!nav) return;
      const target = measure(nav, `[data-section="${section}"]`);
      if (!target) return;
      const from = lastPill;
      lastPill = target;
      setPill(target);
      setTarget({ from: active, to: section });
      glide(from, target);
    },
    [active, glide],
  );

  // Label colour follows the pill at once; a stale target (from an earlier
  // page) is ignored.
  const current = target?.from === active ? target.to : active;
  return { ref, pillRef, pill, moveTo, current };
}
