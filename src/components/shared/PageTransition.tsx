'use client';

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export const PageTransition = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <LazyMotion strict features={domAnimation}>
      <AnimatePresence mode='wait' initial={false}>
        <m.div key={pathname}>
          {children}

          {/* {['bg-red-500', 'bg-red-600'].map((_, idx) => (
            <m.div
              key={`${1}_slide-in-${idx}`}
              className={cn('page-transition origin-left', _)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0, transition: { duration: 0.4, delay: 0.15 * idx, ease: 'circOut' } }}
              exit={{ scaleX: 1, transition: { duration: 0.4, delay: 0.15 * idx, ease: 'circIn' } }}
            />
          ))}
          
          {['bg-red-700'].map((_, idx) => (
            <m.div
              key={`${1}_slide-out-${idx}`}
              className={cn('page-transition origin-right', _)}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0, transition: { duration: 0.3, delay: 0.15 * idx, ease: 'circOut' } }}
              exit={{ scaleX: 0, transition: { duration: 0.3, delay: 0.15 * idx, ease: 'circIn' } }}
            />
          ))} */}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};
