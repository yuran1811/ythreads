'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';

import { ErrorPageProps } from '@/shared/types';

const inter = Inter({ subsets: ['latin'] });

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.log(error);
  });

  return (
    <html lang='en'>
      <body className={inter.className}>
        <section className='main-container'>
          <h2 className='head-text'>An error has occured!</h2>
          <button onClick={() => reset()}>Try again</button>
        </section>
      </body>
    </html>
  );
}
