'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';
import { ParamsProps } from '@/shared/types';

export default function Page({ params }: ParamsProps<{ id: string }>) {
  const { socketInstance } = useSocket({});

  const router = useRouter();

  const socketRef = socketInstance.current;
  const userVideoRef = useRef(null);
  const peerVideoRef = useRef(null);
  const rtcConnectionRef = useRef(null);
  const userStreamRef = useRef();
  const hostRef = useRef(false);

  return (
    <section className='flex flex-col items-center justify-center gap-8'>
      <h1 className='head-text'>Video call</h1>
      <Button onClick={() => router.back()}>Back</Button>

      <div>
        <div>
          <video autoPlay ref={userVideoRef} />
          <video autoPlay ref={peerVideoRef} />
        </div>
      </div>
    </section>
  );
}
