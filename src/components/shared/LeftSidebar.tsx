'use client';

import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { sidebarLinks } from '@/shared/constants';

import { cn } from '@/lib/utils';

export const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'leftsidebar_link',
                'transition-colors',
                'text-light-1 hover:bg-primary-700',
                isActive && 'bg-primary-700',
              )}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />

              <p className='font-semibold text-current max-lg:hidden'>{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer gap-4 rounded-lg p-4 transition-colors hover:bg-light-4/60'>
              <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />

              <p className='font-semibold text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
