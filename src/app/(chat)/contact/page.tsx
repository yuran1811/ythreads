'use client';

import Link from 'next/link';
import { KeyboardEvent, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { useStore } from '@/store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  author: string;
  message: string;
};

let socket: Socket;

export default function Page() {
  const chatUserInfo = useStore((s) => s.chatUserInfo);
  const setChatUserInfo = useStore((s) => s.setChatUserInfo);

  const [username, setUsername] = useState(chatUserInfo.name || '');
  const [chosenUsername, setChosenUsername] = useState(chatUserInfo.name || '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const socketInitializer = async () => {
    await fetch('/api/socket');

    socket = io('/api/socket_io', { path: '/api/socket_io' });

    socket.on('connect', () => {
      console.log('isConnected', socket.connected);
      console.log('connected id:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('isDisconnected', socket.connected);
    });

    socket.on('joinRoom', () => {
      console.log('joinRoom');
    });

    socket.on('newIncomingMessage', (msg) => {
      console.log('new msg', messages);
      setMessages((currentMsg) => [...currentMsg, { author: msg.author, message: msg.message }]);
    });
  };

  const sendMessage = async () => {
    if (!socket || !message.length) {
      return;
    }

    socket.emit('createdMessage', { author: chosenUsername, message });

    setMessages((currentMsg) => [...currentMsg, { author: chosenUsername, message }]);
    setMessage('');
  };

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      if (message) {
        sendMessage();
      }
    }
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <>
      <section className='flex items-center justify-center gap-10'>
        <Link href='/call/audio'>
          <Button>Audio call</Button>
        </Link>
        <Link href='/call/video'>
          <Button>Video call</Button>
        </Link>
      </section>

      <div className='container mx-auto flex min-h-screen items-center justify-center'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
          <div className='container flex max-w-lg items-center justify-center'>
            <Input
              className='w-[12em] rounded-md p-3 outline-none'
              type='text'
              placeholder='Type your name here'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              onClick={() => {
                setChosenUsername(username);
                setChatUserInfo({ ...chatUserInfo, name: username });
              }}
            >
              Change
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

            <div className='flex w-full'>
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
          </div>
        </div>
      </div>
    </>
  );
}
