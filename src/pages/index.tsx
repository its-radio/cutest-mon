import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { trpc } from '@/utils/trpc';

export default function Home() {
  const {data, isLoading, error} = trpc.hello.useQuery({ text: "radio" })

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (data) return <div>{data.greeting}</div>


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Monster is cuter?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="w-16 h-16 bg-red-200" />
          <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-200" />
      </div>
    </div>
  );
}
