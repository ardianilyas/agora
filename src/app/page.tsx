"use client"

import { trpc } from "@/utils/trpc";

export default function Home() {
  const { data: user } = trpc.user.me.useQuery();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {user ? <h1 className="text-2xl font-medium text-neutral-800">Hi, {user.name}</h1> : <h1 className="text-2xl font-semibold text-neutral-800">Sign in first</h1>}
    </div>
  );
}
