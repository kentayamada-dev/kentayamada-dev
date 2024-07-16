import { StorybookIcon } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  component: StorybookIcon,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='w-20'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Layouts/RootLayout/Header/Icons/Storybook'
} satisfies Meta<typeof StorybookIcon>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
