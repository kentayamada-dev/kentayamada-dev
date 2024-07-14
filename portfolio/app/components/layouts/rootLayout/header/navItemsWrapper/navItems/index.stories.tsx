import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { NavItems } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  args: {
    items: [
      { href: '/dashboard', icon: MoonIcon, title: 'Dashboard' },
      { href: '/', icon: SunIcon, title: 'Home' }
    ]
  },
  component: NavItems
} satisfies Meta<typeof NavItems>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
