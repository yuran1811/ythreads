import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <section className='gap-8'>
      <h1 className='head-text'>Video call</h1>
      <Link href='/call'>
        <Button>Back</Button>
      </Link>
    </section>
  );
}
