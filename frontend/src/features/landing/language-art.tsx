import { cn } from '@/lib/cn';
import { WorldScene } from '@/components/ui/scenes';
import { ParallaxFrame } from './parallax-frame';
import styles from './language-art.module.scss';

/** The hero picture: a living planet of languages that follows the pointer. */
export function LanguageArt({ compact = false }: { compact?: boolean }) {
  return (
    <ParallaxFrame className={cn(styles.art, compact && styles.compactArt)}>
      <WorldScene />
    </ParallaxFrame>
  );
}
