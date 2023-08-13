'use client';

import { useEffect } from 'react';

import { ErrorPageProps } from '@/shared/types';

export default function NotFound({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.log(error);
  });

  return (
    <div className='main-container'>
      <h2 className='head-text'>404 - Not found</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
