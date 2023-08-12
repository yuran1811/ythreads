import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchCommunities } from '@/lib/actions/community.actions';
import { fetchUser } from '@/lib/actions/user.actions';

import CommunityCard from '@/components/cards/CommunityCard';
import Pagination from '@/components/shared/Pagination';
import Searchbar from '@/components/shared/Searchbar';

interface Props {
  searchParams: Record<string, string | undefined>;
}

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { communities, isNext } = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className=''>
      <h1 className='head-text mb-10'>Communities</h1>

      <div className='mt-5'>
        <Searchbar routeType='communities' />
      </div>

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
