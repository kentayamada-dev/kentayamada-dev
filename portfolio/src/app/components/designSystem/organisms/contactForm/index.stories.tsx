import { ContactForm } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    locale: 'en'
  },
  component: ContactForm
} satisfies Meta<typeof ContactForm>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
