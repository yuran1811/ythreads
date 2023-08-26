import { currentUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { SearchParamsProps } from '@/shared/types';

const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'), {
  loading: () => <span>...</span>,
});
const Pagination = dynamic(() => import('@/components/shared/Pagination'), {
  loading: () => <span>...</span>,
});

import { fetchPosts, fetchUser } from '@/lib/actions';

export default async function Home({ searchParams }: SearchParamsProps<{ page: string }>) {
  const user = await currentUser();
  if (!user) return <div>Not logged in</div>;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { posts, isNext } = await fetchPosts(searchParams?.page ? +searchParams.page : 1, 5);

  return (
    <section>
      <h1 className='head-text mb-10'>Hi, {user?.username}</h1>

      <section className='mt-10 flex flex-col gap-10'>
        {!posts.length && <p className='no-result'>No threads found</p>}

        {posts.map(({ _id, id, text, author, parentId, community, createdAt, children }) => (
          <ThreadCard
            key={_id}
            id={id}
            parentId={parentId}
            currentUserId={user?.id}
            author={author}
            community={community}
            content={text}
            comments={children}
            createdAt={createdAt}
          />
        ))}
      </section>

      <Pagination path='/' pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} />
    </section>
  );
}
