'use client';

import { Capsule } from '@/types/capsule';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export function CapsuleDetails({
  data,
}: {
  data: Capsule;
}) {
  const [open, setOpen] = useState(true);

  return <div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md bg-pink-light border-none"
      >
        <DialogTitle className="w-fit mx-auto uppercase text-pink-dark">
          La capsule est prête !
        </DialogTitle>
        {data?.openingMessage && <div className="text-center">
          {data?.openingMessage}
        </div>}
      </DialogContent>
    </Dialog>
    <div className="m-5" dangerouslySetInnerHTML={{ __html: data.content }} />
  </div>
}