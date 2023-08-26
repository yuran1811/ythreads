'use client';

import { m, useIsPresent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useStore } from '@/store';

import { ParamsProps } from '@/shared/types';

import { PageTransition } from '@/components/shared/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page({ params }: ParamsProps<{ id: string }>) {
  const pathname = usePathname();

  const isPresent = useIsPresent();

  const chatUserInfo = useStore((s) => s.chatUserInfo);
  const setChatUserInfo = useStore((s) => s.setChatUserInfo);

  const [username, setUsername] = useState(chatUserInfo.name || '');
  const [chosenUsername, setChosenUsername] = useState(chatUserInfo.name || '');

  return (
    <PageTransition>
      <div className='mx-auto flex max-h-screen flex-col items-center justify-center gap-12 py-12'>
        <div className='flex max-w-lg items-center justify-center'>
          <Input
            className='group w-[12em] rounded-md p-3 outline-none'
            type='text'
            placeholder='Type your name here'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                setChosenUsername(username);
                setChatUserInfo({ ...chatUserInfo, name: username });
              }
            }}
          />
          <Button
            disabled={username === chosenUsername}
            onClick={() => {
              setChosenUsername(username);
              setChatUserInfo({ ...chatUserInfo, name: username });
            }}
          >
            Update
          </Button>
        </div>

        <div className='flex h-full w-full flex-col items-center justify-start gap-4'>
          <Link href={`${pathname}/call`}>Make a call</Link>
          <Link href={`${pathname}/messages`}>Send messages</Link>
        </div>
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
