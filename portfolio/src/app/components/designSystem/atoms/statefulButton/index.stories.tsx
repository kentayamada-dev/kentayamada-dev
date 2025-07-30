import { STATEFUL_BUTTON_STATUS, StatefulButton } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    status: { control: 'select', options: STATEFUL_BUTTON_STATUS }
  },
  args: {
    status: 'idle',
    title: 'Title'
  },
  component: StatefulButton
} satisfies Meta<typeof StatefulButton>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
