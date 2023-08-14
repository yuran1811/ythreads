import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { fetchUser, getActivity } from '@/lib/actions';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const activity = await getActivity(userInfo._id);

  return (
    <section className=''>
      <h1 className='head-text mb-10'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((_) => (
              <>
                <Link key={_.id} href={`/thread/${_.parentId}`}>
                  <article className='activity-card'>
                    <Image
                      className='rounded-full object-cover'
                      src={_.author.image}
                      alt={_.author.name}
                      width={42}
                      height={42}
                    />

                    <div className='body-text ml-4 flex w-full max-w-2xl flex-col text-light-1'>
                      <p>
                        <span className='text-primary-500'>{_.author.name}</span> has replied to your thread
                      </p>
                      <p className='line-clamp-1 w-full'>{_.text}</p>
                    </div>
                  </article>
                </Link>
              </>
            ))}
          </>
        ) : (
          <>
            <p className='text-base-regular text-light-3'>You have no activity yet.</p>
          </>
        )}
      </section>
    </section>
  );
}

export default Page;
