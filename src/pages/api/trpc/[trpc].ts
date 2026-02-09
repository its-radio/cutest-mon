import { appRouter, AppRouter } from '@/backend/router';
import { inferProcedureOutput, inferRouterOutputs } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})

export type { AppRouter } from '@/backend/router'; // re-export AppRouter type because tRPC docs say so.
                                                   // keeps type export co-located with API endpoint

type RouterOutput = inferRouterOutputs<AppRouter>;
export type inferQueryResponse<TRouteKey extends keyof RouterOutput> = RouterOutput[TRouteKey];