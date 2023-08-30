'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div className='fixed inset-0 bg-slate-800'>
      <section className='flex h-screen w-screen flex-col items-center justify-center'>
        <motion.h1
          className='mb-8 text-heading1-semibold'
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Page 2
        </motion.h1>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button onClick={() => router.back()}>Back</Button>
        </motion.div>
      </section>
    </div>
  );
}
