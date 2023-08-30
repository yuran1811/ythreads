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
        window.scrollTo(0, 0);
      }}
    >
      <motion.div
        key={pathname}
        className='bg-blue-900 fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#33ccff] to-[#ff99cc]'
        initial={{ x: -270, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
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
