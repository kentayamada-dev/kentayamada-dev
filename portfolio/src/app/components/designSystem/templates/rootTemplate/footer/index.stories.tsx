import { Footer } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    authorName: 'John Doe',
    year: 2024
  },
  component: Footer,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof Footer>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
