import type { NextRequest } from 'next/server';
import { env } from '@/lib/env';
// Same-origin proxy to the backend. Done server-side (not via next.config
// rewrites) because Vercel turns rewrites to plain-HTTP origins into
// redirects, which browsers then block as mixed content.
const API_PROXY_PATH = '/backend';
const backend = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
const HOP_BY_HOP = [
  'connection',
  'content-encoding',
  'content-length',
  'host',
  'keep-alive',
  'transfer-encoding',
];
async function proxy(request: NextRequest): Promise<Response> {
  const { pathname, search } = request.nextUrl;
  const target = backend + pathname.slice(API_PROXY_PATH.length) + search;
  const headers = new Headers(request.headers);
  for (const name of HOP_BY_HOP) headers.delete(name);
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
    cache: 'no-store',
  });
  const responseHeaders = new Headers(upstream.headers);
  for (const name of HOP_BY_HOP) responseHeaders.delete(name);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
export const dynamic = 'force-dynamic';
export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
  proxy as HEAD,
  proxy as OPTIONS,
};
