import { fn } from '@storybook/test';
import { LikeButton } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    likeCount: 100,
    locale: 'en',
    onLike: fn()
  },
  component: LikeButton,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-96'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof LikeButton>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
