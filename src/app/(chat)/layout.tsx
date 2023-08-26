import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Chatting Routes',
};

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
