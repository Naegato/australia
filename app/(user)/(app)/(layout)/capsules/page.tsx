import { getApi } from '@/lib/api';
import { CapsuleCard } from '@/components/capsule';
import { Capsule } from '@/types/capsule';

export default async function Capsules() {
  const res = await getApi().capsule.findByCurrentMonth();
  const resData = await res.json();
  const capsules: Capsule[] = resData.data;

  return <div>
    <h1 className="font-bold text-2xl mx-auto w-fit mt-5 mb-12">les capsules du mois</h1>

    <div className="gap-x-5 gap-y-4 flex flex-wrap justify-center px-4">
      {capsules.map((capsule) => {
        return <CapsuleCard className="flex-1 max-w-1/2 sm:flex-0 sm:max-w-none" key={capsule.id} data={capsule} />
      })}
    </div>

  </div>;
}