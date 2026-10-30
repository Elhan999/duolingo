'use client';
import { useState } from 'react';
import { BookOpen, Check, Sparkles, Trophy } from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { Card } from '@/components/ui/surface';
import { Button } from '@/components/ui/button';
import styles from './experience.module.scss';
export function LearningExperience() {
  const {
    messages: { landing: t },
  } = useI18n();
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  return (
    <section className={styles.experience}>
      <div>
        <p className={styles.eyebrow}>{t.experienceLabel}</p>
        <h2>{t.experienceTitle}</h2>
        <p>{t.experienceBody}</p>
        <div className={styles.experienceTags}>
          <span>
            <BookOpen size={17} />
            {t.progressOne}
          </span>
          <span>
            <Sparkles size={17} />
            {t.progressTwo}
          </span>
        </div>
      </div>
      <Card className={styles.exercise}>
        <p className={styles.eyebrow}>{t.exerciseLabel}</p>
        <fieldset>
          <legend>{t.exerciseQuestion}</legend>
          {['hello', 'goodbye'].map((value, index) => (
            <label key={value} className={styles.answer}>
              <input
                type="radio"
                name="landing-exercise"
                value={value}
                checked={answer === value}
                onChange={() => {
                  setAnswer(value);
                  setChecked(false);
                }}
              />
              <span>{index === 0 ? t.exerciseAnswer : t.exerciseOther}</span>
              {checked && value === answer && value === 'hello' && (
                <Check size={18} />
              )}
            </label>
          ))}
        </fieldset>
        {checked && (
          <p
            role="status"
            className={answer === 'hello' ? styles.correct : styles.incorrect}
          >
            {answer === 'hello' ? t.exerciseCorrect : t.exerciseWrong}
          </p>
        )}
        <Button disabled={!answer} onClick={() => setChecked(true)}>
          {t.exerciseCheck}
        </Button>
        <small>{t.exerciseDemo}</small>
      </Card>
    </section>
  );
}
export function ProgressPreview() {
  const {
    messages: { landing: t, learning: l },
  } = useI18n();
  const stats = [
    { value: '24', Icon: BookOpen, label: t.progressOne },
    { value: '1 240', Icon: Sparkles, label: t.progressTwo },
    { value: '5', Icon: Trophy, label: t.progressThree },
  ];
  return (
    <section className={styles.progressSection}>
      <div className={styles.progressArt} aria-hidden="true">
        <div className={styles.chartCard}>
          <div className={styles.chartHead}>
            <span>{l.weekly}</span>
            <b>+18%</b>
          </div>
          <svg
            className={styles.chart}
            viewBox="0 0 320 118"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="learn-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.26"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path
              d="M0 92 L46 80 L92 86 L138 58 L184 66 L230 40 L276 48 L320 20 L320 118 L0 118 Z"
              fill="url(#learn-chart-fill)"
            />
            <path
              d="M0 92 L46 80 L92 86 L138 58 L184 66 L230 40 L276 48 L320 20"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="230"
              cy="40"
              r="4.5"
              fill="var(--color-surface)"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
            />
          </svg>
        </div>
        <div className={styles.statRow}>
          {stats.map(({ value, Icon, label }) => (
            <div key={label}>
              <Icon size={17} />
              <b>{value}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className={styles.eyebrow}>{t.progressLabel}</p>
        <h2>{t.progressTitle}</h2>
        <p>{t.progressBody}</p>
        <div className={styles.progressLabels}>
          <span>{t.progressOne}</span>
          <span>{t.progressTwo}</span>
          <span>{t.progressThree}</span>
        </div>
      </div>
    </section>
  );
}
