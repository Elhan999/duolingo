'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/auth-provider';
import { useI18n } from '@/providers/i18n-provider';
import { PageHeader } from '@/components/ui/surface';
import { LinkButton } from '@/components/ui/link-button';
import { LivingScene } from '@/components/ui/living-scene';
import { EmptyState } from '@/components/ui/states';
import { BookIllustration } from '@/components/ui/illustrations';
import { CourseCard } from '@/features/courses/course-card';
import {
  Stats,
  WeeklyActivity,
  RecentActivity,
} from '@/features/progress/progress-widgets';
import { DailyPlan } from './daily-plan';
import { ContinueLearning } from './continue-learning';
import { coursesOptions, languagesOptions, useProgress } from './queries';
import { LearningShell } from './learning-shell';
import { LearningSkeleton, LearningError } from './data-state';
import { FirstSteps } from './first-steps';
import styles from './learning.module.scss';
export function DashboardPage() {
  const { user } = useAuth();
  const {
    messages: { learning: t },
  } = useI18n();
  const courses = useQuery(coursesOptions());
  const languages = useQuery(languagesOptions());
  const progress = useProgress();
  return (
    <LearningShell active="dashboard">
      <div className={styles.welcomeBanner} aria-hidden="true">
        <LivingScene mood="sky" />
      </div>
      <PageHeader
        eyebrow={t.eyebrow}
        title={
          t.welcome +
          // Usernames may be e-mails; greet by the readable part only.
          (user ? ', ' + (user.username || user.email).split('@')[0] : '') +
          '!'
        }
        description={t.dashboardHint}
      />
      <div className={styles.dashboardLayout}>
        <div className={styles.dashboardMain}>
          <ContinueLearning />
          {user && <DailyPlan key={user.id} userId={user.id} />}
          <Stats />
        </div>
        <aside className={styles.dashboardAside}>
          <FirstSteps />
          {progress.data ? (
            <>
              <WeeklyActivity records={progress.data} />
              <RecentActivity records={progress.data} />
            </>
          ) : progress.isError ? (
            <LearningError onRetry={() => void progress.refetch()} />
          ) : (
            <LearningSkeleton />
          )}
        </aside>
      </div>
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2>{t.suggested}</h2>
          <LinkButton variant="ghost" href="/courses">
            {t.catalog}
          </LinkButton>
        </div>
        {courses.isPending ? (
          <LearningSkeleton />
        ) : courses.isError ? (
          <LearningError onRetry={() => void courses.refetch()} />
        ) : courses.data.length ? (
          <div className={styles.courseGrid}>
            {[...courses.data]
              .sort((a, b) => a.order - b.order)
              .slice(0, 3)
              .map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  language={
                    languages.data?.find(
                      (language) => language.id === course.language_id,
                    )?.name
                  }
                  progress={progress.data}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            illustration={<BookIllustration />}
            title={t.noCourses}
            description={t.noCoursesHint}
          />
        )}
      </section>
    </LearningShell>
  );
}
