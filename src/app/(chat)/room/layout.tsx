'use client';

import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <section className='main-container'>{children}</section>;
}
