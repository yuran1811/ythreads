import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { ParamsProps } from '@/shared/types';

import ThreadCard from '@/components/cards/ThreadCard';
import Comment from '@/components/forms/Comment';

import { fetchThreadById, fetchUser } from '@/lib/actions';

import { converObjectIdToString } from '@/utils/base';

export default async function Page({ params: { id } }: ParamsProps<{ id: string }>) {
  if (!id) return null;

  const user = await currentUser();
  if (!user || !user?.id) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(id);

  return (
    <section className='relative'>
      <div>
        <ThreadCard
          key={thread._id}
          id={thread.id}
          parentId={thread.parentId}
          currentUserId={user.id}
          author={thread.author}
          community={thread.community}
          content={thread.text}
          comments={thread.children}
          createdAt={thread.createdAt}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={id}
          currentUserId={converObjectIdToString(userInfo?._id)}
          currentUserImg={userInfo?.image}
        />
      </div>

      <div className='mt-8'>
        {thread.children.map((child: any) => (
          <ThreadCard
            key={child._id}
            id={child.id}
            parentId={child.parentId}
            currentUserId={user.id}
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
