'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export const BodyContextMenu = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ContextMenu>
      <ContextMenuTrigger className='h-screen w-screen'>{children}</ContextMenuTrigger>

      <ContextMenuContent className='w-64 bg-dark-4'>
        <ContextMenuItem inset disabled={pathname === '/' || false} onClick={() => router.back()}>
          Back
          <ContextMenuShortcut>⌘←</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => router.forward()}>
          Forward
          <ContextMenuShortcut>⌘→</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => router.refresh()}>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>

          <ContextMenuSubContent className='w-48'>
            <ContextMenuLabel>No more tools exist.</ContextMenuLabel>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuCheckboxItem checked>Show Command Input</ContextMenuCheckboxItem>

        <ContextMenuSeparator />

        <ContextMenuItem inset onClick={() => router.push('/search')}>
          Goto Search
          <ContextMenuShortcut>⌘⇧S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => router.push('/create-thread')}>
          Create new Thread
          <ContextMenuShortcut>⌘⇧N</ContextMenuShortcut>
        </ContextMenuItem>

        {/*
        <ContextMenuSeparator />

        <ContextMenuRadioGroup value={appTheme}>
          <ContextMenuLabel inset>Theme</ContextMenuLabel>

          <ContextMenuSeparator />

          <ContextMenuRadioItem value='dark' onClick={() => setAppTheme('dark')}>
            Dark
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value='light' onClick={() => setAppTheme('light')}>
            Light
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup> */}
      </ContextMenuContent>
    </ContextMenu>
  );
};
