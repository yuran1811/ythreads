import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className='containter'>
      <h1 className='text-heading1-semibold'>Yo, you seem not to join any room.</h1>

      <Link href={'/room/join'} className='mt-5 block text-center'>
        <Button>Join room now!</Button>
      </Link>
    </div>
  );
}
