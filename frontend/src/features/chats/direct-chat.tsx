'use client';
import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-provider';
import { userOptions } from '@/features/social/queries';
import { useI18n } from '@/providers/i18n-provider';
import { ErrorState } from '@/components/ui/states';
import { queryKeys } from '@/constants/query-keys';
import { openDirectChat } from './api';
import styles from './chat.module.scss';
/** Telegram-style "Message" button target: opens or creates the private chat. */
export function DirectChat({ target }: { target: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const client = useQueryClient();
  const {
    messages: { messaging: t, ui },
  } = useI18n();
  const person = useQuery(userOptions(target));
  const started = useRef(false);
  const mutation = useMutation({
    retry: false,
    mutationFn: () =>
      openDirectChat(user!.id, {
        id: target,
        username: person.data!.username,
      }),
    onSuccess: (chat) => {
      client.setQueryData(queryKeys.chat(chat.id), chat);
      void client.invalidateQueries({ queryKey: queryKeys.chats });
      router.replace('/chats/' + chat.id);
    },
  });
  const { mutate } = mutation;
  useEffect(() => {
    if (started.current || !user || !person.data) return;
    started.current = true;
    mutate();
  }, [user, person.data, mutate]);
  if (person.isError || mutation.isError)
    return (
      <section className={styles.welcome}>
        <ErrorState
          title={t.errorTitle}
          description={t.directError}
          retryLabel={ui.retry}
          onRetry={() => {
            if (person.isError) void person.refetch();
            else mutate();
          }}
        />
      </section>
    );
  return (
    <section className={styles.welcome} role="status">
      <p>{t.openingDirect}</p>
    </section>
  );
}
