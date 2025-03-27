import { CopyRight } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    authorName: 'John Doe',
    year: 2024
  },
  component: CopyRight
} satisfies Meta<typeof CopyRight>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
