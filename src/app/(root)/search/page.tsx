import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { SearchParamsProps } from '@/shared/types';

import UserCard from '@/components/cards/UserCard';
import { Pagination, Searchbar } from '@/components/shared';

import { fetchUser, fetchUsers } from '@/lib/actions';

async function Page({ searchParams }: SearchParamsProps<{ page: string; q: string }>) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { users, isNext } = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 15,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      {(users.length > 0 || searchParams.q.length > 0) && <Searchbar routeType='search' />}

      <div className='mt-10 flex flex-col gap-8'>
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              imgUrl={user.image}
              personType='User'
            />
          ))
        ) : (
          <>
            <p className='no-result'>No users found</p>
          </>
        )}
      </div>

      <Pagination path='search' pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={isNext} />
    </section>
  );
}

export default Page;
