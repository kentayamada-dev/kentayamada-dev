import copyRightStory from '@/components/designSystem/atoms/copyRight/index.stories';
import { Footer } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    ...copyRightStory.args
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
