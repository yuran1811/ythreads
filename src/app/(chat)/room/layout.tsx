import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Threads | Chat',
  description: 'Chatting Room with id',
};

export default function Layout({ children }: PropsWithChildren) {
  return <section className='main-container'>{children}</section>;
}
