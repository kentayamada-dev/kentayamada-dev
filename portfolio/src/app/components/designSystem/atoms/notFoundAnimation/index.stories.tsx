import { NotFoundAnimation } from '.';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: NotFoundAnimation,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-96'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof NotFoundAnimation>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
