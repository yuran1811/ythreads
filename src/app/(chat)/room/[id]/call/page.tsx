'use client';

import { m, useIsPresent } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PageTransition } from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  const isPresent = useIsPresent();
  console.log('call page isPresent: ', isPresent);

  return (
    <PageTransition>
      <div className='flex items-center justify-center gap-10'>
        <Button onClick={() => router.back()}>Back</Button>

        <Link href='./call/audio'>
          <Button>Audio call</Button>
        </Link>
        <Link href='./call/video'>
          <Button>Video call</Button>
        </Link>
      </div>

      <m.div
        className='fixed inset-0 z-10 bg-sky-500'
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.45, ease: 'circOut' } }}
        exit={{ scaleX: 1, transition: { duration: 0.45, ease: 'circIn' } }}
        style={{ transformOrigin: isPresent ? 'left' : 'right' }}
      />
    </PageTransition>
  );
}
