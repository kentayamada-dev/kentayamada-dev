import { SunIcon } from '@heroicons/react/24/outline';
import { NavItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  args: {
    active: true,
    icon: SunIcon,
    title: 'Light'
  },
  component: NavItem,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-52'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Layouts/RootLayout/Header/SidePanel/NavItem'
} satisfies Meta<typeof NavItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
