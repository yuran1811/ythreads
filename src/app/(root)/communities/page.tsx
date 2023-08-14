import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { SearchParamsProps } from '@/shared/types';

import CommunityCard from '@/components/cards/CommunityCard';
import { Pagination, Searchbar } from '@/components/shared';

import { fetchCommunities, fetchUser } from '@/lib/actions';

export default async function Page({ searchParams }: SearchParamsProps<{ page: string; q: string }>) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { communities, isNext } = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 15,
  });

  return (
    <section className=''>
      <h1 className='head-text mb-10'>Communities</h1>

      {(communities.length > 0 || searchParams.q.length > 0) && (
        <div className='mt-5'>
          <Searchbar routeType='communities' />
        </div>
      )}

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

      <Pagination
        path='communities'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
}
