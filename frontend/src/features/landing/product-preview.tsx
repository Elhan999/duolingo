'use client';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  CheckCircle2,
  Flame,
  Globe2,
  House,
  Lock,
  MessageCircle,
  Play,
  Sparkles,
  Trophy,
  UsersRound,
} from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import styles from './product-preview.module.scss';

const NAV = [
  { key: 'dashboard', Icon: House, active: true },
  { key: 'courses', Icon: BookOpen, active: false },
  { key: 'progress', Icon: ChartNoAxesCombined, active: false },
  { key: 'friends', Icon: UsersRound, active: false },
  { key: 'community', Icon: Globe2, active: false },
  { key: 'chats', Icon: MessageCircle, active: false },
] as const;

const WEEK = [34, 62, 48, 88, 70, 26, 78];
const BOARD = [
  { name: 'AK', points: '1 240' },
  { name: 'MS', points: '980' },
  { name: 'DT', points: '860' },
];

/**
 * A static, decorative view of the learning space. It is hidden from assistive
 * technology on purpose: the real screens are the accessible experience, this
 * only shows at a glance what is waiting inside.
 */
export function ProductPreview() {
  const {
    locale,
    messages: { nav, learning: t },
  } = useI18n();
  // A fixed week, so the initials never depend on today's date.
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(
      new Date(2026, 9, 26 + index),
    ),
  );

  return (
    <section className={styles.showcase} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.frame}>
        <div className={styles.bar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.address}>
            <Lock size={11} />
            learm.app/dashboard
          </span>
          <span className={styles.barTag}>A2</span>
        </div>
        <div className={styles.body}>
          <aside className={styles.side}>
            <div className={styles.brand}>
              <Image src="/learm-owl-round.png" alt="" width={30} height={30} />
              <span>
                Lear<b>M</b>
              </span>
            </div>
            <div className={styles.sideNav}>
              {NAV.map(({ key, Icon, active }) => (
                <span
                  key={key}
                  className={styles.sideLink}
                  data-active={active || undefined}
                >
                  <Icon size={17} strokeWidth={1.8} />
                  {nav[key]}
                </span>
              ))}
            </div>
            <div className={styles.sideFoot}>
              <span className={styles.sideAvatar}>LM</span>
              <span>
                <b>LearM</b>
                <i>{nav.guestHint}</i>
              </span>
            </div>
          </aside>
          <div className={styles.main}>
            <div className={styles.top}>
              <div>
                <p className={styles.eyebrow}>{t.eyebrow}</p>
                <strong>{t.welcome}!</strong>
                <small>{t.dashboardHint}</small>
              </div>
              <div className={styles.counters}>
                <span data-tone="flame">
                  <Flame size={16} />
                  12
                </span>
                <span data-tone="xp">
                  <Sparkles size={16} />1 240
                </span>
              </div>
            </div>
            <div className={styles.grid}>
              <article className={styles.continue}>
                <div className={styles.continueTop}>
                  <span className={styles.courseIcon}>
                    <BookOpen size={24} />
                  </span>
                  <span className={styles.level}>{t.level} A2</span>
                </div>
                <p className={styles.overline}>{t.currentCourse}</p>
                <h3>English A2 · Everyday English</h3>
                <div className={styles.progressRow}>
                  <span className={styles.progress}>
                    <i style={{ width: '68%' }} />
                  </span>
                  <b>68%</b>
                </div>
                <small className={styles.progressNote}>
                  8 / 12 · {t.completed}
                </small>
                <div className={styles.path}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      data-state={
                        index < 3 ? 'done' : index === 3 ? 'current' : 'locked'
                      }
                    >
                      {index < 3 ? (
                        <CheckCircle2 size={13} />
                      ) : index === 3 ? (
                        <Play size={12} />
                      ) : (
                        <Lock size={11} />
                      )}
                    </span>
                  ))}
                </div>
                <span className={styles.cta}>
                  {t.continueLesson}
                  <ArrowRight size={15} />
                </span>
                <Image
                  className={styles.watermark}
                  src="/learm-owl-round.png"
                  alt=""
                  width={132}
                  height={132}
                />
              </article>
              <article className={styles.week}>
                <div className={styles.cardHead}>
                  <span>{t.weekly}</span>
                  <Flame size={15} />
                </div>
                <div className={styles.bars}>
                  {WEEK.map((value, index) => (
                    <i
                      key={index}
                      style={{ height: value + '%' }}
                      data-today={index === 3 || undefined}
                    />
                  ))}
                </div>
                <div className={styles.barLabels}>
                  {weekdays.map((day, index) => (
                    <span key={index}>{day}</span>
                  ))}
                </div>
              </article>
              <article className={styles.board}>
                <div className={styles.cardHead}>
                  <span>{t.xp}</span>
                  <Trophy size={15} />
                </div>
                {BOARD.map((person, index) => (
                  <div key={person.name} className={styles.boardRow}>
                    <span className={styles.rank} data-place={index + 1}>
                      {index + 1}
                    </span>
                    <span className={styles.boardAvatar}>{person.name}</span>
                    <b>{person.points}</b>
                  </div>
                ))}
              </article>
              <article className={styles.done}>
                <CheckCircle2 size={18} />
                <span>
                  {t.lessons} <b>3</b>
                </span>
                <span>
                  {t.xp} <b>+40</b>
                </span>
              </article>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.floatCard} data-side="left">
        <Sparkles size={15} />
        +40 XP
      </span>
      <span className={styles.floatCard} data-side="right">
        <Flame size={15} />
        12
      </span>
    </section>
  );
}
