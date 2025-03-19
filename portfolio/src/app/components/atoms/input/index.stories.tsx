import { Input } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    id: 'label',
    label: 'Label'
  },
  component: Input
} satisfies Meta<typeof Input>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
