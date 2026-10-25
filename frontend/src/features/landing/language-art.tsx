import Image from 'next/image';
import { cn } from '@/lib/cn';
import { ParallaxFrame } from './parallax-frame';
import styles from './language-art.module.scss';

const SPARKS = [0, 1, 2, 3, 4, 5, 6, 7];
const CLOUDS = [0, 1, 2];
const BIRDS = [0, 1, 2];
const BUTTERFLIES = [0, 1];
// Letters from different alphabets drift up around the travellers.
const LETTERS = ['A', 'Б', 'ñ', 'あ', 'ü', 'ع'];
const HEARTS = [0, 1, 2];

export function LanguageArt({ compact = false }: { compact?: boolean }) {
  return (
    <ParallaxFrame className={cn(styles.art, compact && styles.compactArt)}>
      {/* The stage is sized like the cropped photo, so the paper plane lines
          up with its trail on every screen size. Layers move at different
          strengths with the pointer, which gives the picture depth. */}
      <div className={styles.stage}>
        <Image
          src="/landing/hero-dark-noplane.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(styles.heroImage, styles.darkImage)}
        />
        <Image
          src="/learm-travelers-community-light.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(styles.heroImage, styles.lightImage)}
        />
        <span className={styles.sunRays} />
        <span className={styles.lightSweep} />
        <span className={styles.globeGlow} />
        {SPARKS.map((spark) => (
          <i key={spark} className={styles.spark} />
        ))}
        <Image
          src="/landing/paper-plane.png"
          alt=""
          width={62}
          height={44}
          className={styles.plane}
        />
      </div>
      <div className={styles.cloudLayer}>
        {CLOUDS.map((cloud) => (
          <b key={cloud} className={styles.cloud} />
        ))}
        {BIRDS.map((bird) => (
          <svg key={bird} className={styles.bird} viewBox="0 0 24 10">
            <path d="M1 7 Q6 1 12 7 Q18 1 23 7" />
          </svg>
        ))}
      </div>
      <div className={styles.lifeLayer}>
        {BUTTERFLIES.map((butterfly) => (
          <svg key={butterfly} className={styles.butterfly} viewBox="0 0 32 24">
            <g className={styles.wingLeft}>
              <path d="M16 12C10 2 2 0 2 7s6 7 14 5Z" />
              <path d="M16 12c-6 2-11 5-9 9s7 0 9-9Z" />
            </g>
            <g className={styles.wingRight}>
              <path d="M16 12c6-10 14-12 14-5s-6 7-14 5Z" />
              <path d="M16 12c6 2 11 5 9 9s-7 0-9-9Z" />
            </g>
            <path className={styles.butterflyBody} d="M16 7v11" />
          </svg>
        ))}
        {LETTERS.map((letter) => (
          <span key={letter} className={styles.letter}>
            {letter}
          </span>
        ))}
        {/* Own layer: the hearts' nth-of-type rules must not count the
            butterflies, which are svgs too. */}
        <div className={styles.hearts}>
          {HEARTS.map((heart) => (
            <svg key={heart} className={styles.heart} viewBox="0 0 24 22">
              <path d="M12 21S2 14.5 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 14.5 12 21 12 21Z" />
            </svg>
          ))}
        </div>
      </div>
      {!compact && (
        <div className={styles.frontLayer}>
          <span className={styles.greetingOne}>
            Hello! <small>English</small>
          </span>
          <span className={styles.greetingTwo}>
            Салам! <small>Кыргызча</small>
          </span>
          <span className={styles.greetingThree}>
            Bonjour! <small>Français</small>
          </span>
        </div>
      )}
    </ParallaxFrame>
  );
}
