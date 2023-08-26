'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();

  return (
    <div className='bg-blue-900 fixed inset-0'>
      <section className='flex items-center justify-center gap-12'>
        <Link href={`${pathname}/1`}>Page 1</Link>
        <Link href={`${pathname}/2`}>Page 2</Link>
      </section>
    </div>
  );
}
