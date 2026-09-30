'use client';
import Link from 'next/link';
import { Flame, Sparkles } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { useStreak, useXp } from './queries';
import styles from './learning.module.scss';
/** Duolingo-style streak and XP counters shown in the app header. */
export function HeaderStats() {
  const {
    locale,
    messages: { learning: t },
  } = useI18n();
  const streak = useStreak();
  const xp = useXp();
  const format = new Intl.NumberFormat(locale);
  const days = streak.data === null ? 0 : streak.data?.current_streak;
  const points = xp.data?.reduce((sum, item) => sum + item.xp, 0);
  return (
    <Link href="/progress" className={styles.headerStats}>
      <span
        className={styles.streakStat}
        data-active={!!days || undefined}
        title={t.streak}
      >
        <Flame size={18} aria-hidden="true" />
        <span className="sr-only">{t.streak}: </span>
        {days === undefined ? '—' : format.format(days)}
      </span>
      <span className={styles.xpStat} title={t.xp}>
        <Sparkles size={18} aria-hidden="true" />
        <span className="sr-only">{t.xp}: </span>
        {points === undefined ? '—' : format.format(points)}
      </span>
    </Link>
  );
}
