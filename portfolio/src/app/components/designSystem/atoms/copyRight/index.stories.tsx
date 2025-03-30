import { CopyRight } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    author: 'John Doe',
    copyrightYear: 2024,
    homepageUrl: 'http://www.example.com'
  },
  component: CopyRight
} satisfies Meta<typeof CopyRight>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
