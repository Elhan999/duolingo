import { cn } from '@/lib/cn';
import styles from './illustrations.module.scss';

type ArtProps = { className?: string };

/** Open book with greeting letters drifting above it. Decorative only. */
export function BookIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="127" rx="64" ry="7" />
        <g className={styles.book}>
          <path
            className={styles.page}
            d="M100 48C84 36 56 31 30 35v64c26-4 54 0 70 12z"
          />
          <path
            className={styles.page}
            d="M100 48c16-12 44-17 70-13v64c-26-4-54 0-70 12z"
          />
          <path className={styles.spine} d="M100 48v64" />
          <path className={styles.rule} d="M44 54c16-2 34 0 44 6" />
          <path className={styles.rule} d="M44 68c16-2 34 0 44 6" />
          <path className={styles.rule} d="M44 82c14-2 28-1 38 3" />
          <path className={styles.rule} d="M156 54c-16-2-34 0-44 6" />
          <path className={styles.rule} d="M156 68c-16-2-34 0-44 6" />
          <path className={styles.rule} d="M156 82c-14-2-28-1-38 3" />
        </g>
        <g className={cn(styles.chip, styles.chipOne)}>
          <rect x="10" y="8" width="36" height="32" rx="10" />
          <text x="28" y="24">
            A
          </text>
        </g>
        <g className={cn(styles.chip, styles.chipTwo)}>
          <rect x="82" y="0" width="36" height="32" rx="10" />
          <text x="100" y="16">
            Б
          </text>
        </g>
        <g className={cn(styles.chip, styles.chipThree)}>
          <rect x="154" y="14" width="36" height="32" rx="10" />
          <text x="172" y="30">
            ñ
          </text>
        </g>
        <circle className={styles.sparkle} cx="64" cy="26" r="3.5" />
        <circle
          className={cn(styles.sparkle, styles.sparkleLate)}
          cx="140"
          cy="8"
          r="2.5"
        />
      </svg>
    </span>
  );
}

/** Two message bubbles with typing dots, gently floating. Decorative only. */
export function ChatIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="131" rx="62" ry="6" />
        <g className={cn(styles.bubble, styles.bubbleBack)}>
          <rect x="18" y="14" width="106" height="56" rx="16" />
          <path d="M42 70v18l20-18" />
          <rect
            className={styles.line}
            x="34"
            y="30"
            width="64"
            height="7"
            rx="3.5"
          />
          <rect
            className={styles.line}
            x="34"
            y="46"
            width="44"
            height="7"
            rx="3.5"
          />
        </g>
        <g className={cn(styles.bubble, styles.bubbleFront)}>
          <rect x="80" y="66" width="104" height="52" rx="16" />
          <path d="M158 118v16l-18-16" />
          <g className={styles.dots}>
            <circle cx="108" cy="92" r="5.5" />
            <circle cx="126" cy="92" r="5.5" />
            <circle cx="144" cy="92" r="5.5" />
          </g>
        </g>
        <circle className={styles.sparkle} cx="172" cy="30" r="3.5" />
        <circle
          className={cn(styles.sparkle, styles.sparkleLate)}
          cx="30"
          cy="106"
          r="2.5"
        />
      </svg>
    </span>
  );
}

/** Paper plane climbing a dashed route with milestone dots. Decorative only. */
export function JourneyIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="130" rx="70" ry="6" />
        <path
          className={styles.trail}
          d="M22 116C52 116 54 78 88 78s34-36 68-38"
        />
        <circle className={styles.node} cx="22" cy="116" r="6" />
        <circle
          className={cn(styles.node, styles.nodeMid)}
          cx="88"
          cy="78"
          r="6"
        />
        <g className={styles.plane}>
          <path className={styles.planeBody} d="M146 50 194 18l-20 46-10-16z" />
          <path className={styles.planeFold} d="M194 18l-30 32" />
        </g>
        <circle className={styles.sparkle} cx="60" cy="40" r="3.5" />
        <circle
          className={cn(styles.sparkle, styles.sparkleLate)}
          cx="150"
          cy="96"
          r="3"
        />
        <circle className={styles.sparkle} cx="116" cy="20" r="2.5" />
      </svg>
    </span>
  );
}
