import { CustomLink } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    active: true,
    title: 'Home'
  },
  component: CustomLink,
  title: 'Atoms/Custom Link'
} satisfies Meta<typeof CustomLink>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
