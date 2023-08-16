'use client';

// import { AnimatePresence, motion } from 'framer-motion';
import { Metadata } from 'next';
// import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Call Feature',
};

export default function Layout({ children }: PropsWithChildren) {
  // const pathname = usePathname();

  return (
    <>
      {/* <AnimatePresence mode='wait'>
      <motion.div key={pathname} className='relative h-screen w-screen'> */}
      <section className='main-container'>{children}</section>

      {/* <motion.div
          className='absolute left-0 top-0 z-[-1] origin-left bg-sky-600'
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 0.55] }}
        />
        <motion.div
          className='absolute left-0 top-0 z-[-1] origin-right bg-sky-600'
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 0.55] }}
        />
      </motion.div> */}
      {/* </AnimatePresence> */}
    </>
  );
}
