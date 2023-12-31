'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useStore } from '@/store';

import { ParamsProps } from '@/shared/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { generateVCardToDownload } from '@/utils/base';

export default function Page({ params }: ParamsProps<{ id: string }>) {
  const pathname = usePathname();

  const chatUserInfo = useStore((s) => s.chatUserInfo);
  const setChatUserInfo = useStore((s) => s.setChatUserInfo);

  const [username, setUsername] = useState(chatUserInfo.name || '');
  const [chosenUsername, setChosenUsername] = useState(chatUserInfo.name || '');

  return (
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

      <Button onClick={() => generateVCardToDownload({ name: username, phone: '', email: '' })}>
        Share your contact in .vcf file
      </Button>

      <div className='flex h-full w-full flex-col items-center justify-start gap-4'>
        <Link href={`${pathname}/call`}>
          <Button variant='outline'>Make a call</Button>
        </Link>
        <Link href={`${pathname}/messages`}>
          <Button variant='outline'>Send messages</Button>
        </Link>
      </div>
    </div>
  );
}
