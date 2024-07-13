import { SunIcon } from '@heroicons/react/24/outline';
import { NavItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  args: {
    active: true,
    icon: SunIcon,
    title: 'Light'
  },
  component: NavItem
} satisfies Meta<typeof NavItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
