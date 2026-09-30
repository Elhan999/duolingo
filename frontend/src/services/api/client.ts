import { sessionStore } from '@/features/auth/session';
import { createApiClients } from './create-client';
// Same-origin path proxied to NEXT_PUBLIC_API_URL (see next.config.ts).
export const { api, publicApi, refresh } = createApiClients(
  '/backend',
  sessionStore,
);
