'use server';

import ThreadCard from '@/components/cards/ThreadCard';
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface Params {
  params: { id: string };
}

export default async function Page({ params: { id } }: Params) {
  if (!id) return null;

  const user = await currentUser();
  if (!user || !user?.id) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(id);

  return (
    <section className='relative'>
      <div>Hello thread {id}</div>

      <div>
        <ThreadCard
          key={thread._id}
          id={thread.id}
          parentId={thread.parentId}
          currentUserId={user?.id}
          author={thread.author}
          community={thread.community}
          content={thread.text}
          comments={thread.children}
          createdAt={thread.createdAt}
        />
      </div>

      <div className='mt-7'>
        <Comment threadId={id} currentUserId={userInfo?._id} currentUserImg={userInfo?.image} />
        <div className='text-heading2-bold'>H2 bold</div>
      </div>

      <div className='mt-8'>
        {thread.children.map((child: any) => (
          <ThreadCard
            key={child._id}
            id={child.id}
            parentId={child.parentId}
            currentUserId={user?.id}
            author={child.author}
            community={child.community}
            content={child.text}
            comments={child.children}
            createdAt={child.createdAt}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
