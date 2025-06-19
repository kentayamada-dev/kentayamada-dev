import { EmailTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    countryCode: 'AD',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    message: 'Hello world!',
    phoneNumber: '12'
  },
  component: EmailTemplate
} satisfies Meta<typeof EmailTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
