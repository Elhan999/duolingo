'use client';
import { useRef, type PointerEvent, type ReactNode } from 'react';

/**
 * Tracks the pointer over the hero and exposes it as --mx / --my (-1…1).
 * Layers inside read those variables at different strengths, which turns the
 * flat illustration into a scene with depth. Mouse only; respects reduced motion.
 */
export function ParallaxFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const set = (x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty('--mx', x.toFixed(3));
      ref.current?.style.setProperty('--my', y.toFixed(3));
    });
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    set(
      ((event.clientX - box.left) / box.width) * 2 - 1,
      ((event.clientY - box.top) / box.height) * 2 - 1,
    );
  };

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={() => set(0, 0)}
    >
      {children}
    </div>
  );
}
