import { CircleAlert, Inbox } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './button';
import styles from './states.module.scss';
/** Page-level states (404, error pages) render their title as the page h1. */
type HeadingLevel = 1 | 2 | 3;
export function EmptyState({
  title,
  description,
  action,
  icon,
  illustration,
  headingLevel = 3,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  /** Replaces the small icon tile, e.g. with the mascot. */
  illustration?: ReactNode;
  headingLevel?: HeadingLevel;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className={styles.state}>
      {illustration ?? (
        <span className={styles.icon}>{icon ?? <Inbox size={24} />}</span>
      )}
      <Heading>{title}</Heading>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
  illustration,
  headingLevel = 3,
}: {
  title: string;
  description: string;
  retryLabel: string;
  onRetry: () => void;
  illustration?: ReactNode;
  headingLevel?: HeadingLevel;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <div role="alert" className={styles.state}>
      {illustration ?? (
        <span className={styles.error}>
          <CircleAlert size={24} />
        </span>
      )}
      <Heading>{title}</Heading>
      <p>{description}</p>
      <Button variant="secondary" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  );
}
