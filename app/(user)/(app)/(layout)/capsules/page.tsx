'use client';

import dayjs from 'dayjs';
import { CapsuleCard } from '@/components/capsule';

const capsules = (new Array(30)).fill(1).map((_, i) => ({
  date: dayjs().add(i, 'd'),
  identifier: (i + 1).toString()
}))

export default function Capsules() {
  return <div>
    <h1 className="font-bold text-2xl mx-auto w-fit mt-5 mb-12">les capsules du mois</h1>

    <div className="gap-x-5 gap-y-4 flex flex-wrap justify-center px-4">
      {capsules.map(capsule => {
        return <CapsuleCard className="flex-1 md:flex-0" key={capsule.identifier} {...capsule} />
        // return <div key={capsule.identifier}>t {capsule.identifier}</div>
      })}
    </div>

  </div>;
}