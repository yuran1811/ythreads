'use client';

import { useEffect } from 'react';

import { ErrorPageProps } from '@/shared/types';

import { Button } from '@/components/ui/button';

export default function NotFound({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.log(error);
  });

  return (
    <div className='main-container'>
      <h2 className='head-text'>An error has occured</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
