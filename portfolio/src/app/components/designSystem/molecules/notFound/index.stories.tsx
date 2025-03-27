import { NotFound } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    homeHref: '/',
    label: 'Go back to home',
    message: {
      main: 'Main Message',
      sub: 'Sub Message'
    }
  },
  component: NotFound
} satisfies Meta<typeof NotFound>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
