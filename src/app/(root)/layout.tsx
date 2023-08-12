import '@/app/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import { BottomBar, LeftSideBar, RightSideBar, TopBar } from '@/components/shared';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en'>
        <body className={inter.className}>
          <TopBar />

          <main className='flex flex-row'>
            <LeftSideBar />

            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </div>
            </section>

            <RightSideBar />
          </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
