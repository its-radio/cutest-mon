import { getOptionsForVote, getRandomMonster } from '@/utils/getRandomMonster';
import { trpc } from '@/utils/trpc';
import { inferProcedureOutput } from '@trpc/server';
import { useState} from 'react';
import type React from 'react';
import { inferQueryResponse } from './api/trpc/[trpc]';

const btn = "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";


export default function Home() {

  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.getMonsterById.useQuery({id: first})
  const secondPokemon = trpc.getMonsterById.useQuery({id: second})

  // console.log(firstPokemon.data)

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForCutest = (selected: number) => {
    //todo: fire mutation to persist changes
    updateIds(getOptionsForVote)
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Monster is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <MonsterListing
                monster={firstPokemon.data}
                vote={() => voteForCutest(first)}
              />
              <div className="p-8">Vs</div>
              <MonsterListing
                monster={secondPokemon.data}
                vote={() => voteForCutest(second)}
              />
            </>
          )
        }
        <div className="p-2" />
      </div>
    </div>
  );
}


type monsterFromServer = inferQueryResponse<"getMonsterById">;

const MonsterListing: React.FC<{ monster: monsterFromServer, vote: () => void }> = props => {

  return <div className="w-64 h-64 flex flex-col items-center">
          <img
            src={props.monster.sprites.front_default ?? undefined}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {props.monster.name}
          </div>
          <button className={btn} onClick={()=> props.vote()}>Cuter</button>
        </div>
};