'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <section className='flex flex-col items-center justify-center gap-8'>
      <h1 className='head-text'>Audio call</h1>
      <Button onClick={() => router.back()}>Back</Button>
    </section>
  );
}
