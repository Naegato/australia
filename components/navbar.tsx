'use client';

import Link from 'next/link';
import { Calendar, House, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar ()  {
  const links = [
    { href: '/home', icon: House },
    { href: '/capsules', icon: LayoutGrid },
    { href: '/calendar', icon: Calendar },
  ]

  const pathname = usePathname();

  return <div className="fixed bottom-0 left-0 right-0 bg-pink-light/80 backdrop-blur-sm text-white rounded-t-xl shadow-[0_0_9px_rgba(187,20,98,0.3)] flex justify-around items-center h-20 z-50">
    {links.map(({ href, icon: Icon }) => (
      <Link
        key={href}
        href={href}
      >
        <Icon
          size={45}
          className={cn(
            pathname === href ? 'text-pink-dark' : 'text-white/70 hover:text-white',
            'transition-colors'
          )}
        />
      </Link>
    ))}
  </div>
}