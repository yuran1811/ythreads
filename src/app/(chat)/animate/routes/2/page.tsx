'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className='fixed inset-0 bg-slate-800'>
      <h1 className='text-heading1-semibold'>Page 2</h1>

      <Button onClick={() => router.back()}>Back</Button>
    </div>
  );
}
