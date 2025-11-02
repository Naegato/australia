'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/store/auth';
import { redirect } from 'next/navigation';

export const LoggedLayout = ({
  children,
  roles
}: {
  children: ReactNode,
  roles?: string[]
}) => {
  const {user} = useAuthStore();

  console.log('LoggedLayout user', user);

  if (!user) {
    redirect('/login');
  }

  if (roles && !roles.some(role => user.roles.includes(role))) {
    redirect('/login');
  }

  return <>
    {children}
  </>;
}