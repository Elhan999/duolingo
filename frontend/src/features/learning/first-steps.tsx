'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronRight } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { Card } from '@/components/ui/surface';
import { useLearningPath } from '@/features/placement/queries';
import { friendsOptions } from '@/features/social/queries';
import { languagesOptions, useProgress } from './queries';
import styles from './learning.module.scss';

/**
 * A short checklist for newcomers: each step links to where it is done and
 * ticks itself off from real data. It leaves once every step is complete.
 */
export function FirstSteps() {
  const {
    messages: { learning: t },
  } = useI18n();
  const languages = useQuery(languagesOptions());
  const language = languages.data?.find((item) => item.is_active)?.id ?? 0;
  const path = useLearningPath(language);
  const progress = useProgress();
  const friends = useQuery(friendsOptions());

  // Wait for every answer, so finished steps never flash as unfinished.
  if (!path.isSuccess || !progress.isSuccess || !friends.isSuccess) return null;

  const steps = [
    {
      label: t.stepLevel,
      href: '/learning-path',
      done: path.data.placement_completed,
    },
    {
      label: t.stepLesson,
      href: '/courses',
      done: progress.data.some((record) => record.completed),
    },
    { label: t.stepFriend, href: '/community', done: friends.data.length > 0 },
  ];
  const doneCount = steps.filter((step) => step.done).length;
  if (doneCount === steps.length) return null;
  const next = steps.findIndex((step) => !step.done);

  return (
    <Card className={styles.firstSteps}>
      <div className={styles.firstStepsHead}>
        <h2>{t.firstSteps}</h2>
        <span>
          {doneCount} / {steps.length}
        </span>
      </div>
      <p className={styles.muted}>{t.firstStepsHint}</p>
      <ol>
        {steps.map((step, index) => (
          <li key={step.href} data-done={step.done} data-next={index === next}>
            <Link href={step.href}>
              <span className={styles.stepMark} aria-hidden="true">
                {step.done ? <Check size={14} strokeWidth={3} /> : index + 1}
              </span>
              <span>{step.label}</span>
              {!step.done && <ChevronRight size={16} aria-hidden="true" />}
            </Link>
          </li>
        ))}
      </ol>
    </Card>
  );
}
