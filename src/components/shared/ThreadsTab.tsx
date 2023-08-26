import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'), {
  loading: () => <span>...</span>,
});

import { fetchCommunityPosts, fetchUserPosts } from '@/lib/actions';

interface Result {
  name: string;
  image: string;
  id: string;
  bio: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
      bio: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: 'User' | 'Community';
}

export async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === 'Community') result = await fetchCommunityPosts(accountId);
  else if (accountType === 'User') result = await fetchUserPosts(accountId);
  else {
    redirect('/');
  }

  if (!result) redirect('/');

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User'
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === 'Community'
              ? { name: result.name, id: result.id, image: result.image, bio: result.bio }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}

      {result.threads.length === 0 && <p className='no-result'>No threads found</p>}
    </section>
  );
}
