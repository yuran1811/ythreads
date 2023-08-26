'use client';

import { Calendar, Rocket, Settings, SmilePlus, User2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

import { getKeyEventActions } from '@/utils/base';

const CommandBar = () => {
  const [searchString, setSearchString] = useState('');
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const down = getKeyEventActions([
      {
        key: 'k',
        control: true,
        action: () => {
          setOpen((open) => !open);
        },
      },
      {
        key: 'arrowleft',
        control: true,
        callbacks: [router.back],
      },
      {
        key: 'arrowright',
        control: true,
        callbacks: [router.forward],
      },
      {
        key: 'r',
        control: true,
        callbacks: [router.refresh],
      },
      {
        key: 'f',
        control: true,
        shift: true,
        action() {
          router.push('/search');
        },
      },
      {
        key: 'n',
        control: true,
        shift: true,
        action() {
          router.push('/create-thread');
        },
      },
    ]);

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className='text-sm px-4 py-2'>
        Press{' '}
        <kbd className='pointer-events-none inline-flex h-6 items-center gap-1 rounded border px-1.5 font-mono font-medium opacity-100'>
          <span className='mr-1'>⌘|Ctrl</span> K
        </kbd>
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          onChangeCapture={(e) => setSearchString(e.currentTarget.value || '')}
        />

        <CommandList>
          <CommandEmpty>
            <p>No results found.</p>
            <Link href={'https://www.google.com/search?q=' + searchString} target='_blank'>
              <Button className='mt-2' variant='link'>
                Search with GG
              </Button>
            </Link>
          </CommandEmpty>

          <CommandGroup heading='Suggestions'>
            <CommandItem>
              <Calendar className='mr-2 h-4 w-4' />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <SmilePlus className='mr-2 h-4 w-4' />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Rocket className='mr-2 h-4 w-4' />
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>
              <User2 className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandBar;
