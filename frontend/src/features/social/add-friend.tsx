'use client';
import { useDeferredValue, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth/auth-provider';
import { useI18n } from '@/providers/i18n-provider';
import { friendshipMessages } from '@/i18n/friendship';
import { SearchInput } from '@/components/ui/field';
import { LinkButton } from '@/components/ui/link-button';
import { Card } from '@/components/ui/surface';
import { usersOptions } from './queries';
import { UserCard } from './user-card';
import { SocialSkeleton } from './social-state';
import styles from './social.module.scss';
/** Telegram-style people search: your @username on top, search by username below. */
export function AddFriend() {
  const { user } = useAuth();
  const { locale } = useI18n();
  const t = friendshipMessages[locale];
  const [value, setValue] = useState('');
  const search = useDeferredValue(value.trim().replace(/^@+/, ''));
  const query = useQuery({
    ...usersOptions(search),
    enabled: search.length > 0,
  });
  const people = (query.data ?? []).filter((person) => person.id !== user?.id);
  return (
    <Card className={styles.addFriend}>
      <h2>{t.title}</h2>
      <p>{t.hint}</p>
      {user && (
        <div className={styles.myUsername}>
          <span>{t.myId}</span>
          <strong>@{user.username}</strong>
          <LinkButton href="/profile" variant="ghost">
            {t.change}
          </LinkButton>
        </div>
      )}
      <SearchInput
        label={t.receiver}
        placeholder="@username"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      {search &&
        (query.isPending ? (
          <SocialSkeleton />
        ) : query.isError ? (
          <p role="alert" className={styles.error}>
            {t.network}
          </p>
        ) : people.length ? (
          <div className={styles.grid}>
            {people.slice(0, 6).map((person) => (
              <UserCard key={person.id} user={person} />
            ))}
          </div>
        ) : (
          <p role="status" className={styles.muted}>
            {t.noMatch}
          </p>
        ))}
    </Card>
  );
}
