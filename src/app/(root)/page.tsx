import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div>Not logged in</div>;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { posts, isNext } = await fetchPosts();

  return (
    <main className=''>
      <p className='head-text'>Hi, {user?.username}</p>

      <section className='mt-9 flex flex-col gap-10'>
        {!posts.length && <p className='no-result'>No threads found!</p>}

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
    </main>
  );
}
