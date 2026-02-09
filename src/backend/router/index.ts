import { initTRPC } from '@trpc/server';
import { z } from 'zod/v4';
import superjson from 'superjson'; 
import { PokemonClient } from 'pokenode-ts';

const t = initTRPC.create({
  transformer: superjson
});

export const appRouter = t.router({

  getMonsterById: t.procedure
    .input(z.object({id: z.number()}))
    .query(async({ input }) => {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return {name: pokemon.name, sprites: pokemon.sprites};
    }),
});


// export type definition of API
export type AppRouter = typeof appRouter;

