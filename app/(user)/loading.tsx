import { Logo } from '@/components/svg/logo';

export default function Loading() {
  return <div className="w-full h-dvh flex justify-center items-center">
    <Logo className="text-pink-dark w-full h-fit animate-pulse" />
  </div>;
}
