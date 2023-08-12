'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <section className='main-container'>
          <h2 className='head-text'>Something went wrong!</h2>
          <Button onClick={() => reset()}>Try again</Button>
        </section>
      </body>
    </html>
  );
}
