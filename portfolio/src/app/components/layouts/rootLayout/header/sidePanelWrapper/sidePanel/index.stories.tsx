import { fn } from '@storybook/test';
import { navigationItems } from '@/constants/navigation';
import { SidePanel } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    currentPathname: {
      control: 'select',
      options: navigationItems.map((item) => {
        return item.href;
      })
    }
  },
  args: {
    currentPathname: '/',
    handleToggle: fn(),
    items: navigationItems,
    open: true
  },
  component: SidePanel,
  title: 'Layouts/Root Layout/Header/Side Panel'
} satisfies Meta<typeof SidePanel>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
