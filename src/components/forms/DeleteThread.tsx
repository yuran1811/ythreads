'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteThread } from '@/lib/actions';

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({ threadId, currentUserId, authorId, parentId, isComment }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  if (currentUserId !== authorId || pathname === '/') return null;

  return (
    <Image
      src='/assets/delete.svg'
      alt='delte'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={async () => {
        if (!pathname) return;

        await deleteThread(threadId, pathname);

        if (!parentId || !isComment) {
          // not redirect to home if delete in profile page
          if (pathname.match('profile')) {
            return;
          }

          // delete root thread (not comment)
          router.push('/');
        }
      }}
    />
  );
}

export default DeleteThread;
