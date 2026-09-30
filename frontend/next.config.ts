import type { NextConfig } from 'next';
// The browser calls the backend through the same-origin `/backend` path
// (src/app/backend/[...path]/route.ts), so the app works on any host or port
// regardless of the backend's CORS allow-list.
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  turbopack: { root: process.cwd() },
  // Backend routes differ on trailing slashes (`/chats/` vs `/courses`);
  // forward them exactly as the client sends them.
  skipTrailingSlashRedirect: true,
};
export default config;
