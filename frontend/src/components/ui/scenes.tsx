'use client';
import { useEffect, useId, useRef } from 'react';
import { cn } from '@/lib/cn';
import styles from './scenes.module.scss';

type SceneProps = { className?: string };

// CSS animations stop under reduced motion globally; SMIL motion paths
// (orbiting chips, the paper plane) have to be paused by hand.
function useCalmSmil() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () =>
      query.matches ? svg.pauseAnimations() : svg.unpauseAnimations();
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return ref;
}

const ORBIT_A = 'M110 250a170 64 0 1 0 340 0a170 64 0 1 0-340 0';
const ORBIT_B = 'M140 250a140 92 0 1 0 280 0a140 92 0 1 0-280 0';
const FLIGHT = 'M-40 120C80 40 170 30 250 70s170 40 350-40';

const GREETINGS = [
  { text: 'Hello!', note: 'English', x: 34, y: 62, w: 104 },
  { text: 'Салам!', note: 'Кыргызча', x: 404, y: 110, w: 112 },
  { text: 'Hola!', note: 'Español', x: 22, y: 330, w: 96 },
  { text: 'Bonjour!', note: 'Français', x: 402, y: 372, w: 126 },
];

const CHIPS = [
  { glyph: 'A', orbit: ORBIT_A, tilt: -16, dur: 18, begin: 0 },
  { glyph: 'Б', orbit: ORBIT_A, tilt: -16, dur: 18, begin: -9 },
  { glyph: 'ñ', orbit: ORBIT_B, tilt: 24, dur: 24, begin: -4 },
  { glyph: 'あ', orbit: ORBIT_B, tilt: 24, dur: 24, begin: -16 },
];

const TWINKLES: [x: number, y: number, delay: number][] = [
  [96, 196, 0],
  [470, 50, 1.2],
  [500, 268, 2.1],
  [196, 452, 0.6],
  [356, 26, 2.8],
];

function Twinkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <path
      className={styles.twinkle}
      style={{ animationDelay: `${delay}s` }}
      d={`M${x} ${y - 7}q1.6 5.4 7 7q-5.4 1.6-7 7q-1.6-5.4-7-7q5.4-1.6 7-7z`}
    />
  );
}

/**
 * A small planet of languages: the globe turns, letters orbit it, greetings
 * float around and a paper plane loops overhead. Pointer moves the layers
 * apart (see --mx/--my from ParallaxFrame). Decorative only.
 */
export function WorldScene({ className }: SceneProps) {
  const ref = useCalmSmil();
  // Ids from useId may hold characters that break url(#…) references.
  const id = useId().replace(/[^\w-]/g, '');
  return (
    <svg
      ref={ref}
      className={cn(styles.scene, styles.world, className)}
      viewBox="0 0 560 500"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id + 'globe'}>
          <circle cx="280" cy="250" r="112" />
        </clipPath>
        <radialGradient id={id + 'halo'}>
          <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className={styles.far}>
        <circle
          className={styles.halo}
          fill={`url(#${id}halo)`}
          cx="280"
          cy="250"
          r="236"
        />
        <path className={styles.flight} d={FLIGHT} />
      </g>

      <g className={styles.mid}>
        <g transform="rotate(-16 280 250)">
          <path className={styles.orbit} d={ORBIT_A} />
        </g>
        <g transform="rotate(24 280 250)">
          <path className={styles.orbit} d={ORBIT_B} />
        </g>

        <g className={styles.globe}>
          <circle className={styles.globeBody} cx="280" cy="250" r="112" />
          <g clipPath={`url(#${id}globe)`}>
            <ellipse
              className={styles.parallel}
              cx="280"
              cy="208"
              rx="104"
              ry="10"
            />
            <ellipse
              className={styles.parallel}
              cx="280"
              cy="250"
              rx="112"
              ry="14"
            />
            <ellipse
              className={styles.parallel}
              cx="280"
              cy="292"
              rx="104"
              ry="10"
            />
            {[0, 1, 2].map((meridian) => (
              <ellipse
                key={meridian}
                className={styles.meridian}
                style={{ animationDelay: `${meridian * -4}s` }}
                cx="280"
                cy="250"
                rx="112"
                ry="112"
              />
            ))}
            <path className={styles.route} d="M222 214q46-48 108 6" />
            <circle className={styles.city} cx="222" cy="214" r="5" />
            <circle
              className={cn(styles.city, styles.cityLate)}
              cx="330"
              cy="220"
              r="5"
            />
            <circle
              className={styles.city}
              style={{ animationDelay: '1.4s' }}
              cx="268"
              cy="306"
              r="4"
            />
          </g>
          <circle className={styles.globeRim} cx="280" cy="250" r="112" />
        </g>

        {CHIPS.map(({ glyph, orbit, tilt, dur, begin }) => (
          <g key={glyph} transform={`rotate(${tilt} 280 250)`}>
            <g>
              <animateMotion
                dur={`${dur}s`}
                begin={`${begin}s`}
                repeatCount="indefinite"
                path={orbit}
              />
              <g transform={`rotate(${-tilt})`} className={styles.chip}>
                <rect x="-17" y="-17" width="34" height="34" rx="11" />
                <text>{glyph}</text>
              </g>
            </g>
          </g>
        ))}
      </g>

      <g className={styles.near}>
        {GREETINGS.map(({ text, note, x, y, w }, index) => (
          <g
            key={text}
            className={styles.greeting}
            style={{ animationDelay: `${index * -1.6}s` }}
          >
            <rect x={x} y={y} width={w} height="52" rx="16" />
            <path d={`M${x + 18} ${y + 50}l-4 12 16-12`} />
            <text className={styles.greetingText} x={x + 16} y={y + 24}>
              {text}
            </text>
            <text className={styles.greetingNote} x={x + 16} y={y + 40}>
              {note}
            </text>
          </g>
        ))}

        <g className={styles.typing}>
          <rect x="196" y="410" width="70" height="36" rx="18" />
          {[214, 231, 248].map((cx, index) => (
            <circle
              key={cx}
              cx={cx}
              cy="428"
              r="4"
              style={{ animationDelay: `${index * 0.18}s` }}
            />
          ))}
        </g>

        <g className={styles.plane}>
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            rotate="auto"
            path={FLIGHT}
          />
          <path className={styles.planeBody} d="M-14-9 16 0-14 9l5-9z" />
          <path className={styles.planeFold} d="M-9 0h25" />
        </g>

        {TWINKLES.map(([x, y, delay]) => (
          <Twinkle key={`${x}-${y}`} x={x} y={y} delay={delay} />
        ))}
      </g>
    </svg>
  );
}

const CONVERSATION_TWINKLES: [x: number, y: number, delay: number][] = [
  [250, 196, 0],
  [70, 300, 1.5],
  [470, 230, 2.4],
];

const PEOPLE = [
  { cx: 120, cy: 220, tone: 'primary', delay: 0 },
  { cx: 400, cy: 150, tone: 'info', delay: -1.3 },
  { cx: 330, cy: 300, tone: 'success', delay: -2.6 },
] as const;

/**
 * Three learners connected by dashed lines that carry little messages,
 * with greetings popping in turn and a typing bubble. They blink. Decorative.
 */
export function ConversationScene({ className }: SceneProps) {
  return (
    <svg
      className={cn(styles.scene, styles.conversation, className)}
      viewBox="0 0 520 380"
      aria-hidden="true"
    >
      <path className={styles.link} d="M150 206Q260 120 368 154" />
      <path className={styles.link} d="M150 238Q220 320 298 304" />
      <path className={styles.link} d="M396 186Q392 250 358 278" />
      <circle className={styles.ripple} cx="260" cy="200" r="150" />

      {PEOPLE.map(({ cx, cy, tone, delay }) => (
        <g
          key={tone}
          className={styles.person}
          data-tone={tone}
          style={{ animationDelay: `${delay}s` }}
        >
          <circle className={styles.head} cx={cx} cy={cy} r="34" />
          <g className={styles.eyes} style={{ animationDelay: `${delay}s` }}>
            <circle cx={cx - 11} cy={cy - 4} r="3.6" />
            <circle cx={cx + 11} cy={cy - 4} r="3.6" />
          </g>
          <path
            className={styles.smile}
            d={`M${cx - 10} ${cy + 9}q10 9 20 0`}
          />
        </g>
      ))}

      <g className={styles.pop} style={{ animationDelay: '0s' }}>
        <rect x="40" y="110" width="108" height="46" rx="15" />
        <path d="M86 154l8 14 6-14" />
        <text x="94" y="139">
          Hola!
        </text>
      </g>
      <g className={styles.pop} style={{ animationDelay: '-3s' }}>
        <rect x="350" y="52" width="120" height="46" rx="15" />
        <path d="M392 96l6 14 10-14" />
        <text x="410" y="81">
          Салам!
        </text>
      </g>
      <g className={styles.pop} style={{ animationDelay: '-6s' }}>
        <rect x="380" y="300" width="112" height="46" rx="15" />
        <path d="M396 302l-12-12 26 12" />
        <text x="436" y="329">
          Hello!
        </text>
      </g>

      <g className={styles.typing}>
        <rect x="196" y="40" width="70" height="36" rx="18" />
        {[214, 231, 248].map((cx, index) => (
          <circle
            key={cx}
            cx={cx}
            cy="58"
            r="4"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </g>

      {CONVERSATION_TWINKLES.map(([x, y, delay]) => (
        <Twinkle key={`${x}-${y}`} x={x} y={y} delay={delay} />
      ))}
    </svg>
  );
}

/**
 * A quiet horizon: the sun breathes, clouds drift, birds pass. Meant to sit
 * behind content at the bottom of a panel; it fades out toward the top.
 */
export function HorizonScene({ className }: SceneProps) {
  return (
    <svg
      className={cn(styles.scene, styles.horizon, className)}
      viewBox="0 0 1200 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g className={styles.sun}>
        <circle className={styles.sunRing} cx="860" cy="212" r="120" />
        <circle
          className={cn(styles.sunRing, styles.sunRingLate)}
          cx="860"
          cy="212"
          r="120"
        />
        <circle className={styles.sunCore} cx="860" cy="212" r="60" />
      </g>

      <g className={styles.clouds}>
        <path
          className={styles.cloud}
          d="M180 96h120a22 22 0 0 0-22-22 34 34 0 0 0-64-6 26 26 0 0 0-34 28z"
        />
        <path
          className={cn(styles.cloud, styles.cloudSlow)}
          d="M700 66h96a18 18 0 0 0-18-18 28 28 0 0 0-52-4 22 22 0 0 0-26 22z"
        />
      </g>

      <g className={styles.birds}>
        <path d="M420 90q9-8 18 0q9-8 18 0" />
        <path d="M462 72q7-6 14 0q7-6 14 0" />
      </g>

      <path
        className={styles.hillBack}
        d="M0 222C200 200 360 214 520 206s340-24 500-4 140 14 180 10v26H0z"
      />
      <path
        className={styles.hillFront}
        d="M0 244c180-18 340-4 520-12s360-18 520 0 120 8 160 6v22H0z"
      />
      <path
        className={styles.horizonLine}
        d="M0 244c180-18 340-4 520-12s360-18 520 0 120 8 160 6"
      />
    </svg>
  );
}
