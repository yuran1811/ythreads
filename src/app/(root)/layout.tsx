import '@/app/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { PropsWithChildren, Suspense } from 'react';

import { BottomBar, LeftSideBar, RightSideBar, ThemeProvider, TopBar } from '@/components/shared';
import Loading from './loading';

const BodyContextMenu = dynamic(() => import('@/components/shared/ContextMenus'), {
  loading: () => <span>...</span>,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads application',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
        <body className={inter.className}>
          <BodyContextMenu>
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
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
            </ThemeProvider>
          </BodyContextMenu>
        </body>
      </html>
    </ClerkProvider>
  );
}
