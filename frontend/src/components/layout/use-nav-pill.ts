'use client';
import { useLayoutEffect, useRef, useState } from 'react';

export type NavPill = { x: number; y: number; width: number; height: number };

const ACTIVE = '[data-nav-active="true"]';

// Each page mounts its own shell, so the last position lives outside React:
// the highlight can then travel from the previous section to the new one.
let lastPill: NavPill | null = null;

function measure(nav: HTMLElement): NavPill | null {
  const item = nav.querySelector<HTMLElement>(ACTIVE);
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

/** A highlight that slides to the active navigation item. */
export function useNavPill(active: string, collapsed: boolean) {
  const ref = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<NavPill | null>(null);

  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const next = measure(nav);
    const from = lastPill;
    let frame = 0;
    // Paint once at the previous position, then move on the next frame.
    setPill(from ?? next);
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setPill(next));
    });
    lastPill = next;

    const observer = new ResizeObserver(() => {
      const current = measure(nav);
      lastPill = current;
      setPill(current);
    });
    observer.observe(nav);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [active, collapsed]);

  return { ref, pill };
}
