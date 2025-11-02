'use client'

import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

export default function Layout ({ children }: { children: ReactNode }) {
  return <>
    {children}
    <Navbar/>
  </>;
}