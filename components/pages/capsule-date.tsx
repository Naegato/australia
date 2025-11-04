'use client';

import { CapsuleCard } from '@/components/capsule';
import { Capsule } from '@/types/capsule';

export function CapsuleDatePage({
  data,
}: {
  data: Capsule[];
}) {
  return <div>
    <h1 className="font-bold text-2xl mx-auto w-fit mt-5 mb-12">les capsules du jour</h1>

    <div className="gap-x-5 gap-y-4 flex flex-wrap justify-center px-4">
      {data.map(capsule => {
        return <CapsuleCard className="flex-1 md:flex-0" key={capsule.id} data={capsule} />
      })}
    </div>

  </div>
}