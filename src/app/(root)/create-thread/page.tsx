import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import PostThread from '@/components/forms/PostThread';

import { fetchUser } from '@/lib/actions';

import { converObjectIdToString } from '@/utils/base';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className='head-text'>Create thread</h1>

      <PostThread userId={converObjectIdToString(userInfo?._id)} />
    </>
  );
}

export default Page;
