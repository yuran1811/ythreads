'use client';

import { PropsWithChildren } from 'react';

import { useStore } from '@/store';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export const BodyContextMenu = ({ children }: PropsWithChildren) => {
  const appTheme = useStore((s) => s.appTheme);
  const setAppTheme = useStore((s) => s.setAppTheme);

  return (
    <ContextMenu>
      <ContextMenuTrigger className='h-screen w-screen'>{children}</ContextMenuTrigger>

      <ContextMenuContent className='w-64 bg-dark-4'>
        <ContextMenuItem inset onClick={() => {}}>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-48'>
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuCheckboxItem>
          Show Bookmarks Bar
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>
          Show Profile Icon
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>

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
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};
