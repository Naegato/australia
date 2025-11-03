'use client'

import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';
import { Logo } from '@/components/svg/logo';

export default function Layout ({ children }: { children: ReactNode }) {
  return <>
    <Logo className="text-pink-dark mx-auto h-20 w-fit" />
    {children}
    <Navbar/>
    <span className="h-20 mt-8 block" />
  </>;
}