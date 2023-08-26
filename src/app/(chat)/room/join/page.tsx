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
        <h1 className='text-heading1-semibold md:text-center'>New way to connect your friends!</h1>
        <p className='text-heading4-medium md:text-center'>
          Never miss the latest messages from your group of friends
        </p>
      </section>

      <section className='mx-auto w-full max-w-sm'>
        <h2 className='font-semibold'>Type the room code to join!</h2>
        <div className='flex items-center justify-center'>
          <Input onChange={(e) => setRoomName(e.target.value)} value={roomName} />
          <Button onClick={joinRoomAction} type='button'>
            Join
          </Button>
        </div>
      </section>

      <Button
        onClick={() => {
          const contactInfo = {
            name: 'yuran1811',
            phone: '0999999999',
            email: 'yuran1811@gmail.com',
          };

          const vCard = `
          BEGIN:VCARD
            VERSION:4.0
            FN:Yuran Legends
            N:yuran;Simon;;;ing. jr,M.Sc.
            BDAY:--0203
            GENDER:M
            EMAIL;TYPE=work:simon.perreault@viagenie.ca
          END:VCARD`.replace(/\s/gm, '');
          const vcard =
            'BEGIN:VCARD\nVERSION:4.0\nFN:' +
            contactInfo.name +
            '\nTEL;TYPE=work,voice:' +
            contactInfo.phone +
            '\nEMAIL:' +
            contactInfo.email +
            '\nEND:VCARD';
          const blob = new Blob([vcard], { type: 'text/vcard' });
          const url = URL.createObjectURL(blob);

          const newLink = document.createElement('a');
          newLink.download = contactInfo.name + '.vcf';
          newLink.textContent = contactInfo.name;
          newLink.href = url;

          newLink.click();
        }}
      >
        Share your contact in .vcf file
      </Button>
    </div>
  );
}
