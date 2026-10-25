import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

export function Logo({ compact = false }: { compact?: boolean }) {
  // The owl in a clean round badge — no square corners.
  const height = compact ? 42 : 50;
  const width = height;
  return (
    <Link href="/" aria-label="LearM" className={styles.logo}>
      <Image
        className={styles.logoMark}
        src="/learm-owl-round.png"
        alt=""
        width={width}
        height={height}
        priority
      />

      {!compact && (
        <span className={styles.logoText}>
          Lear<span className={styles.logoM}>M</span>
        </span>
      )}
    </Link>
  );
}
