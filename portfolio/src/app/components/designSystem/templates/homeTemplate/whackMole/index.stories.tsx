import { WhackMole } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: WhackMole,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof WhackMole>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
