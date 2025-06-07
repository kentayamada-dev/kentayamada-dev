import { Calculator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    locale: 'en'
  },
  component: Calculator
} satisfies Meta<typeof Calculator>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
