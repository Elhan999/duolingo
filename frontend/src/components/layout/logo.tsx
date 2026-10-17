import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.scss';

export function Logo({ compact = false }: { compact?: boolean }) {
  const size = compact ? 42 : 52;
  return (
    <Link href="/" aria-label="LearM" className={styles.logo}>
      <Image
        className={styles.logoMark}
        src="/learm-owl.png"
        alt=""
        width={size}
        height={size}
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
