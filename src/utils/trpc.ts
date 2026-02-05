import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/backend/router';

export const trpc = createTRPCNext<AppRouter>({
    config(ctx) {
        return {
            links: [
                httpBatchLink({
                    url: `/api/trpc`,
                    async headers() {
                        return {
                            // authorization: getAuthCookie()
                        };
                    },
                }),
            ],
        };
    },
  ssr: false,
});