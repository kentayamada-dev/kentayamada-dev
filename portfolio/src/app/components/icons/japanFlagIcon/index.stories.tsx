import { JapanFlagIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: JapanFlagIcon,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-20 text-black dark:text-white'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Icons/Japan Flag'
} satisfies Meta<typeof JapanFlagIcon>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
