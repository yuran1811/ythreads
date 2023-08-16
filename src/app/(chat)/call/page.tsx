import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <section className='flex items-center justify-center gap-10'>
      <Link href='/call/audio'>
        <Button>Audio call</Button>
      </Link>
      <Link href='/call/video'>
        <Button>Video call</Button>
      </Link>
    </section>
  );
}
