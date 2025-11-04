'use client';

import { Capsule } from '@/types/capsule';
import { CapsuleCard } from '@/components/capsule';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';

export function HomePage({
  data,
}: {
  data: Capsule[];
}) {
  const { user } = useAuthStore();

  return <div className="w-full flex flex-col justify-center items-center gap-8 mt-8">
    <h1 className="text-6xl text-pink-dark font-script">Hey {user?.firstname} !</h1>

    <h2 className="text-2xl font-bold mt-5">Les dernières capsules</h2>

    <div className="gap-x-5 gap-y-4 flex flex-wrap justify-center px-4">
      {data?.map((item) => {
        return <CapsuleCard className="flex-1" data={item} key={item.id} />
      })}
    </div>

    <Button asChild className="text-accent bg-white uppercase text-pink-dark" variant="secondary">
      <Link href="/capsules">
        voir les capsules du mois
      </Link>
    </Button>
  </div>
}