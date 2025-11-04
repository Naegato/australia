import { CapsuleDatePage } from '@/components/pages/capsule-date';
import { Capsule } from '@/types/capsule';
import { randomUUID } from 'node:crypto';
import { getApi } from '@/lib/api';

export default async function Date({
  params
}: {
  params: Promise<{
    date: string;
  }>
}) {
  const { date } = await params;

  const res = await getApi().capsule.findByDay(date);
  const resData = await res.json();
  const capsules: Capsule[] = resData.data;

  return <CapsuleDatePage data={capsules} />;
}