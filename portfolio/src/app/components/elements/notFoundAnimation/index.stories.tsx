import { NotFoundAnimation } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: NotFoundAnimation,
  title: 'Elements/Not Found Animation'
} satisfies Meta<typeof NotFoundAnimation>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
