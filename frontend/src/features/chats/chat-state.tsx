'use client';
import { useI18n } from '@/providers/i18n-provider';
import { ErrorState } from '@/components/ui/states';
import { Skeleton } from '@/components/ui/surface';
import styles from './chat.module.scss';
export function ChatLoading() {
  const {
    messages: { messaging: t },
  } = useI18n();
  return (
    <div className={styles.loading} role="status" aria-label={t.loading}>
      {[0, 1, 2, 3].map((id) => (
        <div key={id} className={styles.loadingRow}>
          <Skeleton className={styles.loadingAvatar} />
          <span>
            <Skeleton />
            <Skeleton />
          </span>
        </div>
      ))}
    </div>
  );
}
export function ChatError({ retry }: { retry: () => void }) {
  const {
    messages: { messaging: t, ui },
  } = useI18n();
  return (
    <ErrorState
      title={t.errorTitle}
      description={t.errorBody}
      onRetry={retry}
      retryLabel={ui.retry}
    />
  );
}
