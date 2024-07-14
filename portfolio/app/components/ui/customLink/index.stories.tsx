import { CustomLink } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  args: {
    title: 'Home'
  },
  component: CustomLink
} satisfies Meta<typeof CustomLink>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
