import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/pages/api/trpc/[trpc]';

import { ssrPrepass } from '@trpc/next/ssrPrepass';
import superjson from 'superjson';


function getBaseUrl() {
    if (process.browser) return ""; // browser should use current path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // ssr should use vercel url
    return `https://localhost:${process.env.PORT ?? 3000}`; //dev ssr should use localhost

}



export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  transformer: superjson,
  config(config) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
            transformer: superjson,
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          // The server needs to know your app's full url
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          headers() {
            if (!config.ctx?.req?.headers) {
              return {};
            }
            // To use SSR properly, you need to forward client headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            return {
              cookie: config.ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
});