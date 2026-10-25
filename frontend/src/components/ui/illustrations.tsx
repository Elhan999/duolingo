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

function Sparkles() {
  return (
    <>
      <circle className={styles.sparkle} cx="30" cy="30" r="3.5" />
      <circle
        className={cn(styles.sparkle, styles.sparkleLate)}
        cx="176"
        cy="24"
        r="3"
      />
      <circle className={styles.sparkle} cx="184" cy="112" r="2.5" />
    </>
  );
}

/** Two friends; one waves, a heart floats up between them. Decorative only. */
export function FriendsIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="131" rx="72" ry="6" />
        <g className={cn(styles.friend, styles.friendLeft)}>
          <path
            className={styles.friendBody}
            d="M34 126c0-24 14-38 34-38s34 14 34 38z"
          />
          <circle className={styles.friendHead} cx="68" cy="62" r="22" />
          <g className={styles.eyes}>
            <circle cx="60" cy="60" r="2.8" />
            <circle cx="76" cy="60" r="2.8" />
          </g>
          <path className={styles.smile} d="M60 70q8 7 16 0" />
        </g>
        <g className={cn(styles.friend, styles.friendRight)}>
          <path
            className={styles.friendBody}
            d="M104 126c0-21 12-33 30-33s30 12 30 33z"
          />
          <g className={styles.waving}>
            <path className={styles.arm} d="M156 104l14-30" />
            <circle className={styles.hand} cx="171" cy="70" r="7" />
          </g>
          <circle className={styles.friendHead} cx="134" cy="68" r="19" />
          <g className={cn(styles.eyes, styles.eyesLate)}>
            <circle cx="127" cy="66" r="2.6" />
            <circle cx="141" cy="66" r="2.6" />
          </g>
          <path className={styles.smile} d="M127 75q7 6 14 0" />
        </g>
        <path
          className={styles.heart}
          d="M100 44s-14-8-14-17a7 7 0 0 1 14-3 7 7 0 0 1 14 3c0 9-14 17-14 17z"
        />
        <Sparkles />
      </svg>
    </span>
  );
}

const CONFETTI: [x: number, y: number][] = [
  [44, 10],
  [64, 2],
  [86, 12],
  [112, 4],
  [134, 10],
  [154, 0],
  [170, 14],
  [30, 4],
];

/** A shining cup under falling confetti. Decorative only. */
export function TrophyIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="129" rx="56" ry="6" />
        <circle className={styles.rays} cx="100" cy="58" r="52" />
        <g className={styles.trophy}>
          <path
            className={styles.handle}
            d="M70 34H58a12 12 0 0 0 0 24h14M130 34h12a12 12 0 0 1 0 24h-14"
          />
          <path
            className={styles.cup}
            d="M70 22h60v34c0 18-13 30-30 30S70 74 70 56z"
          />
          <path className={styles.shine} d="M82 32v22c0 6 3 11 7 14" />
          <path
            className={styles.star}
            d="m100 36 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"
          />
          <rect
            className={styles.stem}
            x="92"
            y="86"
            width="16"
            height="14"
            rx="3"
          />
          <rect
            className={styles.base}
            x="74"
            y="100"
            width="52"
            height="16"
            rx="6"
          />
        </g>
        <g className={styles.confetti}>
          {CONFETTI.map(([x, y]) => (
            <rect key={x} x={x} y={y} width="6" height="10" rx="2" />
          ))}
        </g>
      </svg>
    </span>
  );
}

/** A bell that rings now and then, with a fresh-news badge. Decorative only. */
export function BellIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="129" rx="50" ry="6" />
        <path className={styles.soundWave} d="M52 46a40 40 0 0 0 0 44" />
        <path
          className={cn(styles.soundWave, styles.soundWaveLate)}
          d="M38 38a56 56 0 0 0 0 60"
        />
        <path className={styles.soundWave} d="M148 46a40 40 0 0 1 0 44" />
        <path
          className={cn(styles.soundWave, styles.soundWaveLate)}
          d="M162 38a56 56 0 0 1 0 60"
        />
        <g className={styles.bell}>
          <circle className={styles.clapper} cx="100" cy="104" r="8" />
          <circle className={styles.bellTop} cx="100" cy="20" r="6" />
          <path
            className={styles.bellBody}
            d="M100 24c-21 0-33 17-33 38v20l-11 14h88l-11-14V62c0-21-12-38-33-38z"
          />
          <path className={styles.bellShine} d="M80 54c2-9 7-14 13-16" />
        </g>
        <circle className={styles.badge} cx="132" cy="34" r="9" />
        <Sparkles />
      </svg>
    </span>
  );
}

/** A padlock that wiggles while its key floats nearby. Decorative only. */
export function LockIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="130" rx="52" ry="6" />
        <g className={styles.lock}>
          <path className={styles.shackle} d="M78 62V46a22 22 0 0 1 44 0v16" />
          <rect
            className={styles.lockBody}
            x="62"
            y="60"
            width="76"
            height="60"
            rx="16"
          />
          <circle className={styles.keyhole} cx="100" cy="84" r="8" />
          <rect
            className={styles.keyhole}
            x="96"
            y="88"
            width="8"
            height="16"
            rx="3"
          />
        </g>
        <g className={styles.key}>
          <circle className={styles.keyRing} cx="162" cy="50" r="11" />
          <path className={styles.keyBlade} d="M162 61v34m0-10h8m-8 8h6" />
        </g>
        <Sparkles />
      </svg>
    </span>
  );
}

/** A compass whose needle searches, then settles. Decorative only. */
export function CompassIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="100" cy="131" rx="50" ry="6" />
        <circle className={styles.orbitRing} cx="100" cy="66" r="58" />
        <circle className={styles.compassFace} cx="100" cy="66" r="44" />
        <circle className={styles.compassInner} cx="100" cy="66" r="33" />
        <path
          className={styles.ticks}
          d="M100 26v8M100 98v8M60 66h8M132 66h8"
        />
        <g className={styles.needle}>
          <path className={styles.needleNorth} d="m100 36 9 30H91z" />
          <path className={styles.needleSouth} d="m100 96 9-30H91z" />
        </g>
        <circle className={styles.pivot} cx="100" cy="66" r="5" />
        <Sparkles />
      </svg>
    </span>
  );
}

/** A magnifier looking over a page of colourful lines. Decorative only. */
export function SearchIllustration({ className }: ArtProps) {
  return (
    <span className={cn(styles.frame, className)} aria-hidden="true">
      <svg viewBox="0 0 200 140">
        <ellipse className={styles.shadow} cx="96" cy="131" rx="64" ry="6" />
        <g className={styles.sheet}>
          <rect
            className={styles.sheetBody}
            x="34"
            y="20"
            width="104"
            height="98"
            rx="14"
          />
          <rect
            className={styles.lineOne}
            x="50"
            y="40"
            width="60"
            height="8"
            rx="4"
          />
          <rect
            className={styles.lineTwo}
            x="50"
            y="58"
            width="72"
            height="8"
            rx="4"
          />
          <rect
            className={styles.lineThree}
            x="50"
            y="76"
            width="44"
            height="8"
            rx="4"
          />
          <rect
            className={styles.lineOne}
            x="50"
            y="94"
            width="56"
            height="8"
            rx="4"
          />
        </g>
        <g className={styles.magnifier}>
          <path className={styles.magnifierHandle} d="M150 104l20 20" />
          <circle className={styles.lens} cx="134" cy="88" r="24" />
          <path className={styles.glint} d="M120 82a15 15 0 0 1 10-10" />
        </g>
        <Sparkles />
      </svg>
    </span>
  );
}
