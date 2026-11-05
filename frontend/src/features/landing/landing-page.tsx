'use client';
import {
  ArrowRight,
  ArrowUpRight,
  Languages,
  MessageCircle,
  MoonStar,
  Smartphone,
  Sparkles,
  Target,
} from 'lucide-react';
import { useI18n } from '@/providers/i18n-provider';
import { Logo } from '@/components/layout/logo';
import { LivingScene } from '@/components/ui/living-scene';
import { CommunityMark } from '@/components/ui/community-mark';
import { communityCopy } from './community-copy';
import { LinkButton } from '@/components/ui/link-button';
import { PublicHeader } from './public-header';
import { LanguageArt } from './language-art';
import { CatalogPreview } from './catalog-preview';
import { LearningExperience, ProgressPreview } from './experience';
import { WaveDivider } from './wave-divider';
import { Reveal } from './reveal';
import { ScrollToTopButton } from './scroll-to-top-button';
import { BentoFeatures, Faq, LanguageMarquee } from './showcase';
import styles from './landing.module.scss';
export function LandingPage() {
  const {
    locale,
    messages: { landing: t },
  } = useI18n();
  const community = communityCopy[locale];
  // The brand word sits in a different place in each language.
  const [madeBefore = '', madeAfter = ''] = community.made.split('COMMUNITY');
  const facts = [
    { Icon: Target, label: t.factPlacement },
    { Icon: Languages, label: t.factLocales },
    { Icon: Smartphone, label: t.factPwa },
    { Icon: MoonStar, label: t.factThemes },
  ];
  const steps = [
    { title: t.stepOne, body: t.stepOneBody },
    { title: t.stepTwo, body: t.stepTwoBody },
    { title: t.stepThree, body: t.stepThreeBody },
  ];
  return (
    <div className={styles.page}>
      <PublicHeader />
      <main id="main-content">
        <div className={styles.heroFrame}>
          <section className={styles.hero}>
            <LanguageArt />
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span />
                {t.eyebrow}
              </p>
              <h1>
                {t.heroTitle.split('\n').map((line, index) => (
                  <span key={line} data-accent={index > 0}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className={styles.heroDescription}>{t.heroDescription}</p>
              <div className={styles.heroActions}>
                <LinkButton href="/register">
                  {t.start}
                  <ArrowRight size={18} />
                </LinkButton>
                <LinkButton href="#courses" variant="secondary">
                  {t.explore}
                  <ArrowUpRight size={17} />
                </LinkButton>
              </div>
              <p className={styles.heroNote}>
                <Sparkles size={15} />
                {t.heroNote}
              </p>
            </div>
          </section>
          <ul className={styles.promiseStrip}>
            {facts.map(({ Icon, label }) => (
              <li key={label}>
                <Icon size={20} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <WaveDivider />
        </div>
        <BentoFeatures />
        <CatalogPreview />
        <section className={styles.section}>
          <Reveal>
            <div className={styles.centerHeading}>
              <p className={styles.eyebrow}>{t.howLabel}</p>
              <h2>{t.howTitle}</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <Reveal>
          <LearningExperience />
        </Reveal>
        <Reveal>
          <ProgressPreview />
        </Reveal>
        <Reveal>
          <section id="community" className={styles.community}>
            <div className={styles.communityArt} aria-hidden="true">
              <LivingScene mood="messages" />
              <span>Hola!</span>
              <span>Салам!</span>
              <span>Hello!</span>
              <div>
                <MessageCircle size={66} strokeWidth={1} />
              </div>
              <i />
              <b />
            </div>
            <div>
              <p className={styles.eyebrow}>{t.communityLabel}</p>
              <a href="#about" className={styles.creatorCredit}>
                {madeBefore.trim() && <span>{madeBefore.trim()}</span>}
                <CommunityMark size={26} />
                {madeAfter.trim() && <span>{madeAfter.trim()}</span>}
              </a>
              <h2>{t.communityTitle}</h2>
              <p>{t.communityBody}</p>
              <LinkButton href="/register">
                {t.join}
                <ArrowRight size={17} />
              </LinkButton>
              <small>{t.communityNote}</small>
            </div>
          </section>
        </Reveal>
        <Reveal>
          <section id="about" className={styles.about}>
            <p className={styles.eyebrow}>{t.about}</p>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            <div className={styles.creatorCard}>
              <CommunityMark size={36} />
              <div>
                <h3>{community.title}</h3>
                <p>{community.body}</p>
                <LinkButton href="#community" variant="secondary">
                  {community.link}
                  <ArrowUpRight size={17} />
                </LinkButton>
              </div>
            </div>
          </section>
        </Reveal>
        <Faq />
        <Reveal>
          <section className={styles.cta}>
            <LivingScene mood="evening" fade />
            <Sparkles size={26} />
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaBody}</p>
            <LinkButton href="/register">
              {t.start}
              <ArrowRight size={18} />
            </LinkButton>
          </section>
        </Reveal>
        <LanguageMarquee />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <Logo />
            <p>{t.footer}</p>
          </div>

          <nav className={styles.footerLinks} aria-label={t.about}>
            <a href="#about">{t.about}</a>
            <a href="#features">{t.features}</a>
            <a href="#courses">{t.courses}</a>
            <a href="#community">{t.community}</a>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} LearM</span>

          <a href="#about" className={styles.footerCredit}>
            {madeBefore.trim() && <span>{madeBefore.trim()}</span>}
            <CommunityMark />
            {madeAfter.trim() && <span>{madeAfter.trim()}</span>}
          </a>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}
