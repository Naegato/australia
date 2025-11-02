import { ReactNode } from 'react';

export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="bg-linear-180 from-pink-light to-pink-meddium min-h-dvh relative">
    {children}
  </main>;
}