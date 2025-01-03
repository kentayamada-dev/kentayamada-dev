import { PlusIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  component: PlusIcon,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-20 text-black dark:text-white'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Icons/Plus'
} satisfies Meta<typeof PlusIcon>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
