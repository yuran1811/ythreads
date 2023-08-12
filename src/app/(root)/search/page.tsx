import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import UserCard from '@/components/cards/UserCard';
import Pagination from '@/components/shared/Pagination';
import Searchbar from '@/components/shared/Searchbar';

import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';

interface Props {
  searchParams: Record<string, string | undefined>;
}

async function Page({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { users, isNext } = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <Searchbar routeType='search' />

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
