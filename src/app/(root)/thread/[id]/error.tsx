'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ErrorPageProps } from '@/shared/types';

import { Button } from '@/components/ui/button';

export default function NotFound({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  });

  return (
    <div className='main-container gap-4'>
      <h2 className='head-text'>An error has occured</h2>
      <div className='flex gap-5'>
        <Button className='!bg-primary-700 !text-white' onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
