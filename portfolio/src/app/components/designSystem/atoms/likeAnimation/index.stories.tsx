import { LikeAnimation } from '.';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: LikeAnimation,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-40'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof LikeAnimation>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
