import { currentUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const AccountProfile = dynamic(() => import('@/components/forms/AccountProfile'), {
  loading: () => <span>...</span>,
});

import { fetchUser } from '@/lib/actions';

import { converObjectIdToString } from '@/utils/base';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const userData = {
    id: user.id,
    objectId: converObjectIdToString(userInfo?._id),
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? '',
    bio: userInfo ? userInfo?.bio : '',
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </>
  );
}

export default Page;
