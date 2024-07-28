import { NotFound } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    lang: 'en'
  },
  component: NotFound,
  title: 'Elements/Not Found'
} satisfies Meta<typeof NotFound>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
