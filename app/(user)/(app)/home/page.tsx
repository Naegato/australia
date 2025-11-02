'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { Logo } from '@/components/svg/logo';
import { CapsuleCard } from '@/components/capsule';
import dayjs from 'dayjs';

export default function HomePage() {
  const {user} = useAuthStore();

  console.log('user in home page', user);

  return <div className="w-full h-dvh flex flex-col justify-center items-center">
    <Logo />
    <h1 className="text-4xl font-bold text-accent">Hey {user?.firstname} !</h1>

    <h2>Les dernières capsules</h2>

    <div className="space-x-4 flex">
      <CapsuleCard date={dayjs()} />
      <CapsuleCard date={dayjs()} />
    </div>

    <Button asChild className="text-accent bg-white uppercase" variant="secondary">
      <Link href="/list">
          voir les capsules du mois
      </Link>
    </Button>
  </div>;
}