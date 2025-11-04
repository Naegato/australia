import { HomePage } from '@/components/pages/home';
import { Capsule } from '@/types/capsule';
import { getApi } from '@/lib/api';
import dayjs from 'dayjs';

export default async function Home() {
  const res = await getApi().capsule.findByCurrentMonth();
  const resData = await res.json();
  const capsules: Capsule[] = resData.data;

  const filteredCapsules: Capsule[] = capsules.filter(capsule => {
    const today = dayjs();

    return !dayjs(capsule.openingDate).isAfter(today);
  }).slice(-2);

  return <HomePage data={filteredCapsules} />;
}