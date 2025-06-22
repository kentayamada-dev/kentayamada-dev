import { EmailTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    data: [
      { label: 'Country Code', value: 'AD' },
      { label: 'Phone Number', value: '123456789' },
      { label: 'Email', value: 'test@gmail.com' },
      { label: 'First Name', value: 'John' },
      { label: 'Last Name', value: 'Doe' },
      { label: 'Message', value: 'Hello World!' }
    ]
  },
  component: EmailTemplate
} satisfies Meta<typeof EmailTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
