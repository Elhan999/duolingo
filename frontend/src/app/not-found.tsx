import { getLocale } from '@/i18n/server';
import { messages } from '@/i18n/messages';
import { EmptyState } from '@/components/ui/states';
import { LinkButton } from '@/components/ui/link-button';
import { Card } from '@/components/ui/surface';
import { Mascot } from '@/components/ui/mascot';
import styles from './error.module.scss';
export default async function NotFound() {
  const locale = await getLocale();
  const t = messages[locale].learning;
  const feedback = messages[locale].feedback;
  return (
    <main id="main-content" className={styles.page}>
      <Card>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <EmptyState
          illustration={<Mascot mood="sad" />}
          headingLevel={1}
          title={t.notFound}
          description={t.notFoundHint}
          action={
            // Guests cannot open the catalog, so home is always offered too.
            <div className={styles.actions}>
              <LinkButton href="/courses">{t.backCourses}</LinkButton>
              <LinkButton href="/" variant="secondary">
                {feedback.home}
              </LinkButton>
            </div>
          }
        />
      </Card>
    </main>
  );
}
