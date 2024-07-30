import { Logo } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { isJapanese: { control: 'boolean' } },
  args: {
    isJapanese: true
  },
  component: Logo,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='text-black dark:text-white'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Elements/Logo'
} satisfies Meta<typeof Logo>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
