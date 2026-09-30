import type { NextConfig } from 'next';
// The browser calls the backend through this same-origin path, so the app
// works on any host or port regardless of the backend's CORS allow-list.
const API_PROXY_PATH = '/backend';
const backend = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');
const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  turbopack: { root: process.cwd() },
  // Backend routes differ on trailing slashes (`/chats/` vs `/courses`);
  // forward them exactly as the client sends them.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    if (!backend) return [];
    return [
      {
        source: API_PROXY_PATH + '/:path*/',
        destination: backend + '/:path*/',
      },
      { source: API_PROXY_PATH + '/:path*', destination: backend + '/:path*' },
    ];
  },
};
export default config;
