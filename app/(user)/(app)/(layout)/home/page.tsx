'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { Logo } from '@/components/svg/logo';
import { CapsuleCard } from '@/components/capsule';
import dayjs from 'dayjs';

export default function HomePage() {
  const { user } = useAuthStore();

  console.log('user in home page', user);

  return <div className="w-full flex flex-col justify-center items-center">
    <h1 className="text-6xl text-pink-dark font-script">Hey {user?.firstname} !</h1>

    <h2 className="text-2xl font-bold mt-5">Les dernières capsules</h2>

    <div className="space-x-4 flex mt-8">
      <CapsuleCard date={dayjs()} identifier="1" />
      <CapsuleCard date={dayjs().add(1, 'd')} identifier="2" />
    </div>

    <Button asChild className="text-accent bg-white uppercase" variant="secondary">
      <Link href="/(user)/(app)/(layout)/capsules">
          voir les capsules du mois
      </Link>
    </Button>
  </div>;
}