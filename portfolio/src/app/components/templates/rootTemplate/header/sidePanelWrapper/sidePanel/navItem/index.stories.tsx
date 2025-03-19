import { SunIcon } from '@/components/icons';
import { NavItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

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
  ]
} satisfies Meta<typeof NavItem>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
