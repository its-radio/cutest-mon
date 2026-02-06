import { getOptionsForVote, getRandomMonster } from '@/utils/getRandomMonster';
import { trpc } from '@/utils/trpc';

export default function Home() {

  const [first, second] = getOptionsForVote();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Monster is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="w-16 h-16 bg-red-400">{first}</div>
          <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-400">{second}</div>
      </div>
    </div>
  );
}
