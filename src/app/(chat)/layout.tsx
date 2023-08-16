'use client';

import '@/app/globals.css';

import { AnimatePresence, motion } from 'framer-motion';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Chatting Route',
};

export default function ChatLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <AnimatePresence mode='wait'>
            <motion.div key={pathname}>
              {children}

              <motion.div
                className='absolute left-0 top-0 h-screen w-full origin-top bg-sky-600'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className='absolute left-0 top-0 h-screen w-full origin-bottom bg-sky-600'
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
