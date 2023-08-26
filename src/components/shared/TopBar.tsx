import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const CommandBar = dynamic(() => import('./CommandBar'), {
  loading: () => <span>...</span>,
});

export const TopBar = () => (
  <nav className='topbar'>
    <Link href='/' className='flex items-center gap-4'>
      <svg className='w-auto' aria-label='Vercel logomark' height='24' role='img' viewBox='0 0 74 64'>
        <path d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z' fill='white'></path>
      </svg>

      <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
    </Link>

    <div className='m-auto'>
      <CommandBar />
    </div>

    <div className='flex items-center gap-1'>
      <div className='block md:hidden'>
        <SignedIn>
          <SignOutButton>
            <div className='flex cursor-pointer'>
              <Image src='/assets/logout.svg' alt='logout' width={24} height={24} />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>

      <OrganizationSwitcher
        appearance={{
          baseTheme: dark,
          elements: { organizationSwitcherTrigger: 'py-2 px-4 mr-6' },
        }}
      />

      <UserButton afterSignOutUrl='/' />
    </div>
  </nav>
);
