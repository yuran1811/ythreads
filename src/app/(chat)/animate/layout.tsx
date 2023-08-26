'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      onExitComplete={() => {
        console.log('exit from', pathname);
        window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={pathname}
        className='main-containter'
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
