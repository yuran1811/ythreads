'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Page() {
  const pathname = usePathname();

  return (
    <section className='flex w-full max-w-sm flex-wrap items-center justify-center gap-12'>
      <Link href={`${pathname}/1`}>
        <Button>Page 1</Button>
      </Link>
      <Link href={`${pathname}/2`}>
        <Button>Page 2</Button>
      </Link>
    </section>
  );
}
