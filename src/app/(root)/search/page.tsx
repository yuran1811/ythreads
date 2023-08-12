import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import UserCard from '@/components/cards/UserCard';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const { users } = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section className=''>
      <h1 className='head-text mb-10'>Search</h1>

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
    </section>
  );
}

export default Page;
