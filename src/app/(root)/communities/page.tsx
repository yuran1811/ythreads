import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import CommunityCard from '@/components/cards/CommunityCard';

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { communities } = await fetchCommunities({});

  return (
    <section className=''>
      <h1 className='head-text mb-10'>Communities</h1>

      <div className='mt-10 flex flex-col gap-8'>
        {communities.length > 0 ? (
          communities.map((community) => (
            <CommunityCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              bio={community.bio}
              members={community.members}
            />
          ))
        ) : (
          <>
            <p className='no-result'>No communities found</p>
          </>
        )}
      </div>
    </section>
  );
}
