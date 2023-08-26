'use client';

import { useRouter } from 'next/navigation';
import { KeyboardEvent, useState } from 'react';

import useSocket from '@/hooks/useSocket';

import { useStore } from '@/store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  author: string;
  message: string;
};

export default function Page() {
  const router = useRouter();

  const chatUserInfo = useStore((s) => s.chatUserInfo);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    socketInstance: { current: socket },
  } = useSocket({
    newIncomingMessage: (msg: Message) => {
      setMessages((currentMsg) => [...currentMsg, { author: msg.author, message: msg.message }]);
    },
    joinRoom: (status: boolean) => {
      console.log('joinRoom', status);
    },
  });

  const sendMessage = async () => {
    if (!socket || !message.length) {
      return;
    }

    socket.emit('joinRoom', true);
    socket.emit('createdMessage', { author: chatUserInfo.name, message });

    setMessages((currentMsg) => [...currentMsg, { author: chatUserInfo.name, message }]);
    setMessage('');
  };

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      if (message && !!message.length) {
        sendMessage();
      }
    }
  };

  return (
    <div className='container mx-auto flex min-h-screen items-center justify-center py-12'>
      <div className='flex h-full w-full flex-col items-center justify-start gap-4'>
        <div className='container flex max-w-md'>
          <Button onClick={() => router.back()}>Back</Button>

          <Input
            type='text'
            placeholder='New message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleKeypress(e)}
          />
          <Button
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </Button>
        </div>

        <div className='flex h-[20rem] min-w-[33%] flex-col justify-end rounded-md shadow-md '>
          <p className='text-heading3-bold'>Logs</p>
          <div className='h-full overflow-y-scroll last:border-b-0'>
            {messages.map((msg, i) => {
              return (
                <div className='w-full border-b border-gray-200 px-2 py-1' key={i}>
                  {msg.author} : {msg.message}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
