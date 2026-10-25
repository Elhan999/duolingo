import { cn } from '@/lib/cn';
import styles from './living-scene.module.scss';

type Mood = 'evening' | 'messages' | 'sky';

const STARS = [0, 1, 2, 3, 4, 5];
const LEAVES = [0, 1, 2, 3, 4, 5];
const CLOUDS = [0, 1, 2];
const BUBBLES = [0, 1, 2, 3];
const BIRDS = [0, 1, 2];
const FIREFLIES = [0, 1, 2, 3, 4, 5, 6, 7];
const WORDS = ['Hola!', 'Привет!', 'Ciao!', 'Salut!'];
const HEARTS = [0, 1, 2, 3];

/**
 * A panorama brought to life. The picture moves as one layer (slow drift plus
 * scroll parallax), so nothing in it is ever distorted; each mood adds its own
 * living details on top. Decorative only.
 */
export function LivingScene({
  mood = 'evening',
  className,
  fade = false,
}: {
  mood?: Mood;
  className?: string;
  /** Fades the top into the surface so copy on top stays readable. */
  fade?: boolean;
}) {
  return (
    <div
      className={cn(styles.scene, className)}
      data-scene
      data-mood={mood}
      aria-hidden="true"
    >
      <div className={styles.image} />
      <span className={styles.sweep} />
      {CLOUDS.map((cloud) => (
        <b key={cloud} className={styles.cloud} />
      ))}
      {(mood === 'evening' || mood === 'messages') &&
        STARS.map((star) => <i key={star} className={styles.star} />)}
      {mood === 'evening' && (
        <>
          <span className={styles.shootingStar} />
          {LEAVES.map((leaf) => (
            <svg key={leaf} className={styles.leaf} viewBox="0 0 24 24">
              <path d="M12 2C6.5 6 4.5 12.5 6.5 21c6.5-2.5 10.5-9 5.5-19Z" />
              <path d="M7 20.5C9 14 10.5 9 12 3" />
            </svg>
          ))}
          {FIREFLIES.map((firefly) => (
            <i key={firefly} className={styles.firefly} />
          ))}
        </>
      )}
      {mood === 'messages' && (
        <>
          {BUBBLES.map((bubble) => (
            <span key={bubble} className={styles.bubble}>
              <i />
              <i />
              <i />
            </span>
          ))}
          {WORDS.map((word) => (
            <span key={word} className={styles.word}>
              {word}
            </span>
          ))}
          {HEARTS.map((heart) => (
            <svg key={heart} className={styles.heart} viewBox="0 0 24 22">
              <path d="M12 21S2 14.5 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 14.5 12 21 12 21Z" />
            </svg>
          ))}
        </>
      )}
      {mood === 'sky' && (
        <>
          <span className={styles.sunGlow} />
          <svg className={styles.balloon} viewBox="0 0 40 56">
            <path
              className={styles.balloonTop}
              d="M20 2C9 2 2 10 2 19c0 9 9 15 13 21h10c4-6 13-12 13-21C38 10 31 2 20 2Z"
            />
            <path
              className={styles.balloonStripe}
              d="M20 2c-5 4-7 11-7 17 0 8 2 15 2 21h10c0-6 2-13 2-21 0-6-2-13-7-17Z"
            />
            <path className={styles.balloonRope} d="M15 40l2 7m8-7-2 7" />
            <rect
              className={styles.balloonBasket}
              x="15"
              y="47"
              width="10"
              height="8"
              rx="2"
            />
          </svg>
          {BIRDS.map((bird) => (
            <svg key={bird} className={styles.bird} viewBox="0 0 24 10">
              <path d="M1 7 Q6 1 12 7 Q18 1 23 7" />
            </svg>
          ))}
        </>
      )}
      {fade && <div className={styles.fade} />}
    </div>
  );
}
