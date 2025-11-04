import { getApi } from '@/lib/api';
import { CalendarPage } from '@/components/pages/calendar';
import { Capsule } from '@/types/capsule';

export default async function Calendar() {
  const res = await getApi().capsule.all();
  const resData = await res.json();
  const capsules: Capsule[] = resData.data;

  return <CalendarPage data={capsules} />
}