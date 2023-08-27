'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center gap-10'>
      <Button onClick={() => router.back()}>Back</Button>

      <Link href='./call/audio'>
        <Button>Audio call</Button>
      </Link>
      <Link href='./call/video'>
        <Button>Video call</Button>
      </Link>
    </div>
  );
}
