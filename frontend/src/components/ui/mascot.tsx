import Image from 'next/image';
import { cn } from '@/lib/cn';
import styles from './mascot.module.scss';

export type MascotMood = 'idle' | 'happy' | 'sad';

/** Decorative LearM owl whose motion reflects the state of the screen. */
export function Mascot({
  mood = 'idle',
  size = 96,
  className,
}: {
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(styles.mascot, className)}
      data-mood={mood}
      aria-hidden="true"
    >
      <Image src="/learm-owl-round.png" alt="" width={size} height={size} />
    </span>
  );
}
