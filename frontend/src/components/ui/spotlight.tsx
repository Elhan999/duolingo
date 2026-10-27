'use client';
import { useEffect } from 'react';

/**
 * Feeds the pointer position into any element marked [data-spotlight] as
 * --spot-x / --spot-y, which a soft glow in globals.scss follows. One
 * listener for the whole app; mouse only, nothing runs for touch.
 */
export function SpotlightTracker() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        '[data-spotlight]',
      );
      if (!target) return;
      const box = target.getBoundingClientRect();
      target.style.setProperty('--spot-x', event.clientX - box.left + 'px');
      target.style.setProperty('--spot-y', event.clientY - box.top + 'px');
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
