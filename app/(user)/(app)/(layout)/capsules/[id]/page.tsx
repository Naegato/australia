import dayjs from 'dayjs';
import { Capsule } from '@/types/capsule';
import { redirect } from 'next/navigation';
import { CapsuleDetails } from '@/components/pages/capsule-details';
import { getApi } from '@/lib/api';

export default async function CapsulePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>
}) {
  const { id } = await params;

  const res = await getApi().capsule.findById(id);
  const resData = await res.json();
  const capsule: Capsule | null = resData.data;

  console.log(resData);

  if (!capsule) {
    redirect('/capsules');
  }

  return <CapsuleDetails
    data={capsule}
  />;
}