'use client';

import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { cn } from '@/lib/utils';
import { Lock, LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { redirect } from 'next/navigation';

export const CapsuleCard: FC<{
  date: Dayjs;
  identifier: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  date,
  className,
  identifier,
  ...props
}) => {

  const now = dayjs();
  const isAvailable = !date.isAfter(now);

  if (!isAvailable) {
    return <div className={cn("w-46 aspect-square bg-pink-light rounded-2xl flex items-center justify-center", className)} {...props}>
      <div className="bg-white w-full flex py-3 px-4 gap-3 justify-center">
        <LockKeyhole />
        <span>{date.format('DD/MM/YYYY')}</span>
      </div>
    </div>
  }

  return <div
    tabIndex={0}
    className={cn(
      "w-46 aspect-square bg-pink-light rounded-2xl flex items-center justify-center transition-all",
      "hover:bg-pink-medium focus:bg-pink-medium cursor-pointer",
      className
    )}
    onClick={() => {
      redirect(`/capsules/${identifier}`)
    }}
    {...props}
  >
    <div className="bg-pink-dark w-full flex py-3 px-4 gap-3 justify-center text-white">
      <LockKeyholeOpen />
      <span>{date.format('DD/MM/YYYY')}</span>
    </div>
  </div>
}