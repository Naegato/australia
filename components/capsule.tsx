'use client';

import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';
import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Capsule } from '@/types/capsule';

export const CapsuleCard: FC<{
  data: Capsule
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  className,
  data,
  ...props
}) => {
  const now = dayjs();
  const capsuleDate = dayjs(data.openingDate);
  const isAvailable = !capsuleDate.isAfter(now);

  if (!isAvailable) {
    return <div className={cn("w-46 aspect-square bg-pink-light rounded-2xl flex items-center justify-center", className)} {...props}>
      <div className="bg-white w-full flex py-3 px-4 gap-3 justify-center">
        <LockKeyhole />
        <span>{capsuleDate.format('DD/MM/YYYY')}</span>
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
      redirect(`/capsules/${data.id}`)
    }}
    {...props}
  >
    <div className="bg-pink-dark w-full flex py-3 px-4 gap-3 justify-center text-white">
      <LockKeyholeOpen />
      <span>{capsuleDate.format('DD/MM/YYYY')}</span>
    </div>
  </div>
}