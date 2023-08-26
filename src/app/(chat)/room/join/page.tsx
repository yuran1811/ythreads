'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const router = useRouter();

  const [roomName, setRoomName] = useState('');

  const joinRoomAction = () => {
    router.push(`/room/${roomName || Math.random().toString(36).slice(2)}`);
  };

  return (
    <div className='container space-y-12'>
      <section className='container space-y-6 p-12'>
        <h1 className='text-heading1-semibold md:text-center'>New way connecting to your friends!</h1>
        <p className='text-heading4-medium md:text-center'>
          Never miss the latest messages from your group of friends
        </p>
      </section>

      <section className='mx-auto w-full max-w-xs'>
        <h2 className='font-semibold'>Type the room code to join!</h2>
        <div className='flex items-center justify-center'>
          <Input onChange={(e) => setRoomName(e.target.value)} value={roomName} />
          <Button onClick={joinRoomAction} type='button'>
            Join
          </Button>
        </div>
      </section>
    </div>
  );
}
