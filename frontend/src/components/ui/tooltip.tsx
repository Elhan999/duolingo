'use client';
import {
  useId,
  useRef,
  useState,
  type ReactElement,
  cloneElement,
} from 'react';
import styles from './tooltip.module.scss';

const VIEWPORT_GAP = 8;

export function Tooltip({
  text,
  children,
  placement = 'top',
}: {
  text: string;
  children: ReactElement<{ 'aria-describedby'?: string }>;
  /** "bottom" for controls at the top edge, such as the header. */
  placement?: 'top' | 'bottom';
}) {
  const id = useId();
  const tip = useRef<HTMLSpanElement>(null);
  const [dismissed, setDismissed] = useState(false);

  // Keep the visible tip inside the viewport instead of letting a centred
  // tip overflow the page on narrow screens.
  const show = () => {
    setDismissed(false);
    requestAnimationFrame(() => {
      const node = tip.current;
      if (!node) return;
      const current = parseFloat(node.style.getPropertyValue('--tip-shift'));
      const shift = Number.isNaN(current) ? 0 : current;
      const rect = node.getBoundingClientRect();
      if (!rect.width) return;
      const max = document.documentElement.clientWidth - VIEWPORT_GAP;
      const correction =
        rect.left < VIEWPORT_GAP
          ? VIEWPORT_GAP - rect.left
          : rect.right > max
            ? max - rect.right
            : 0;
      node.style.setProperty('--tip-shift', `${shift + correction}px`);
    });
  };

  return (
    <span
      className={styles.root}
      onMouseEnter={show}
      onFocus={show}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setDismissed(true);
      }}
    >
      {cloneElement(children, {
        'aria-describedby': [children.props['aria-describedby'], id]
          .filter(Boolean)
          .join(' '),
      })}
      <span
        ref={tip}
        id={id}
        role="tooltip"
        className={styles.tip}
        data-placement={placement}
        data-dismissed={dismissed}
      >
        {text}
      </span>
    </span>
  );
}
