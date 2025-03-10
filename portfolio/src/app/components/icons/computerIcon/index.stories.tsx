import { ComputerIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: ComputerIcon,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-20 text-black dark:text-white'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Icons/Computer'
} satisfies Meta<typeof ComputerIcon>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
