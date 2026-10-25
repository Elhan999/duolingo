'use client';
import Image from 'next/image';
import {
  BookOpen,
  Check,
  Compass,
  MessageCircle,
  Plus,
  Smartphone,
  UsersRound,
} from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { LanguageFlag } from '@/components/ui/language-flag';
import { Reveal } from './reveal';
import styles from './showcase.module.scss';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
const WORDS = ['Hello', 'Hola', 'Bonjour', 'Салам', 'Ciao', 'Hallo'];
const WEEK = [true, true, true, false, true, true, false];
const PEOPLE = ['AK', 'MS', 'DT', 'EL'];
// Endonyms are fixed so server and browser render identical text.
const WORLD: [code: string, name: string][] = [
  ['en', 'English'],
  ['es', 'Español'],
  ['fr', 'Français'],
  ['de', 'Deutsch'],
  ['it', 'Italiano'],
  ['pt', 'Português'],
  ['tr', 'Türkçe'],
  ['ky', 'Кыргызча'],
  ['kk', 'Қазақ тілі'],
  ['uz', 'Oʻzbek'],
  ['ru', 'Русский'],
  ['pl', 'Polski'],
  ['nl', 'Nederlands'],
  ['sv', 'Svenska'],
  ['zh', '中文'],
  ['ja', '日本語'],
  ['ko', '한국어'],
  ['ar', 'العربية'],
  ['hi', 'हिन्दी'],
  ['el', 'Ελληνικά'],
];

/** Bento grid: each tile pairs a real platform feature with a small visual. */
export function BentoFeatures() {
  const {
    messages: { landing: t },
  } = useI18n();
  return (
    <section id="features" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{t.features}</p>
          <h2>{t.benefitsTitle}</h2>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className={styles.bento}>
          <article className={styles.tileWide}>
            <div className={styles.copy}>
              <span className={styles.icon}>
                <BookOpen size={18} aria-hidden="true" />
              </span>
              <h3>{t.benefitTwo}</h3>
              <p>{t.benefitTwoBody}</p>
            </div>
            <div className={styles.lessonMock} aria-hidden="true">
              <strong>Hello</strong>
              <span data-picked="true">
                Hola <Check size={15} />
              </span>
              <span>Ciao</span>
              <span>Salut</span>
            </div>
          </article>
          <article className={styles.tile}>
            <span className={styles.icon}>
              <Compass size={18} aria-hidden="true" />
            </span>
            <h3>{t.benefitOne}</h3>
            <p>{t.benefitOneBody}</p>
            <div className={styles.week} aria-hidden="true">
              {WEEK.map((done, index) => (
                <i key={index} data-done={done} />
              ))}
            </div>
          </article>
          <article className={styles.tile}>
            <span className={styles.icon}>
              <UsersRound size={18} aria-hidden="true" />
            </span>
            <h3>{t.benefitThree}</h3>
            <p>{t.benefitThreeBody}</p>
            <div className={styles.people} aria-hidden="true">
              {PEOPLE.map((initials) => (
                <span key={initials}>{initials}</span>
              ))}
              <span>
                <Plus size={14} />
              </span>
              <MessageCircle size={20} />
            </div>
          </article>
          <article className={styles.tile}>
            <h3>{t.factPlacement}</h3>
            <div className={styles.levels} aria-hidden="true">
              {LEVELS.map((level) => (
                <span key={level} data-active={level === 'A2'}>
                  {level}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.tile}>
            <h3>{t.factLocales}</h3>
            <div className={styles.flags} aria-hidden="true">
              {['ru', 'ky', 'en'].map((code) => (
                <LanguageFlag key={code} code={code} width={44} height={32} />
              ))}
            </div>
          </article>
          <article className={styles.tileBanner}>
            <div className={styles.copy}>
              <span className={styles.icon}>
                <Smartphone size={18} aria-hidden="true" />
              </span>
              <h3>{t.factPwa}</h3>
              <div className={styles.words} aria-hidden="true">
                {WORDS.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            </div>
            <div className={styles.phone} aria-hidden="true">
              <Image src="/learm-owl-round.png" alt="" width={72} height={72} />
              <i />
              <i />
              <i />
            </div>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

/** An endless, pausable strip of world languages in their own names. */
export function LanguageMarquee() {
  const {
    locale,
    messages: { landing: t },
  } = useI18n();

  return (
    <section
      className={styles.world}
      aria-labelledby="world-heading"
      lang={locale}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{t.worldLabel}</p>
        <h2 id="world-heading">{t.worldTitle}</h2>
      </div>
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[...WORLD, ...WORLD].map(([code, name], index) => (
            <span key={code + index} className={styles.chip} lang={code}>
              <LanguageFlag code={code} width={28} height={20} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Honest answers about what the platform does, as a native accordion. */
export function Faq() {
  const {
    messages: { landing: t },
  } = useI18n();
  const items = [
    [t.faq1q, t.faq1a],
    [t.faq2q, t.faq2a],
    [t.faq3q, t.faq3a],
    [t.faq4q, t.faq4a],
    [t.faq5q, t.faq5a],
  ];
  return (
    <section id="faq" className={styles.section}>
      <Reveal>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{t.faqLabel}</p>
          <h2>{t.faqTitle}</h2>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className={styles.faq}>
          {items.map(([question, answer], index) => (
            <details key={question} name="faq" open={index === 0}>
              <summary>
                {question}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
