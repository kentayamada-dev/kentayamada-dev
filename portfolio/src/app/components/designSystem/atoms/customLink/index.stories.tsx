import { CustomLink } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    title: 'Home'
  },
  component: CustomLink
} satisfies Meta<typeof CustomLink>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
