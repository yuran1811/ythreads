'use client';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence initial={false} mode='wait'>
        <m.div key={pathname}>
          <m.section
            className='main-container fixed inset-0 z-[2]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0,
                duration: 0.45,
              },
            }}
          >
            {children}
          </m.section>

          {['bg-sky-500', 'bg-sky-600'].map((_, idx) => (
            <m.div
              key={`${1}_slide-in-${idx}`}
              className={cn('page-transition origin-left', _)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0, transition: { duration: 0.4, delay: 0.15 * idx, ease: 'circOut' } }}
              exit={{ scaleX: 1, transition: { duration: 0.4, delay: 0.15 * idx, ease: 'circIn' } }}
            />
          ))}

          {['bg-sky-700'].map((_, idx) => (
            <m.div
              key={`${1}_slide-out-${idx}`}
              className={cn('page-transition origin-right', _)}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0, transition: { duration: 0.3, delay: 0.15 * idx, ease: 'circOut' } }}
              exit={{ scaleX: 0, transition: { duration: 0.3, delay: 0.15 * idx, ease: 'circIn' } }}
            />
          ))}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
