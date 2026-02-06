import { getOptionsForVote, getRandomMonster } from '@/utils/getRandomMonster';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';


export default function Home() {

  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.getMonsterById.useQuery({id: first})
  const secondPokemon = trpc.getMonsterById.useQuery({id: second})

  // console.log(firstPokemon.data)

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Monster is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="w-64 h-64 flex flex-col">
          <img
            src={firstPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img 
            src={secondPokemon.data?.sprites.front_default}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">{secondPokemon.data?.name}</div>
        </div>

      </div>
    </div>
  );
}
