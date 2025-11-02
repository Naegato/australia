import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Dayjs } from 'dayjs';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

export const CapsuleCard: FC<{
  date: Dayjs;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  date,
  className,
  ...props
}) => {
  return <div className={cn("h-46 w-46 bg-pink-light rounded-2xl flex items-center justify-center", className)} {...props}>
    <div className="bg-white w-full flex py-3 px-4 gap-3 justify-center">
      <Lock />
      <span>{date.format('DD/MM/YYYY')}</span>
    </div>
  </div>
}