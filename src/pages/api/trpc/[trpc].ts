import { appRouter } from '@/backend/router';
import * as trpcNext from '@trpc/server/adapters/next';
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

export type { AppRouter } from '@/backend/router'; // re-export AppRouter type because tRPC docs say so.
                                                   // keeps type export co-located with API endpoint
