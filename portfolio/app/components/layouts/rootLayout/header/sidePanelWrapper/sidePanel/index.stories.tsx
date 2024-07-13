import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { fn } from '@storybook/test';
import { SidePanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  argTypes: { currentPathname: { control: 'select', options: ['/', '/dashboard'] } },
  args: {
    currentPathname: '/',
    handleToggle: fn(),
    items: [
      { href: '/dashboard', icon: MoonIcon, title: 'Dashboard' },
      { href: '/', icon: SunIcon, title: 'Home' }
    ],
    open: true
  },
  component: SidePanel
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
