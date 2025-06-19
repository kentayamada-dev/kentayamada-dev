import { fn } from '@storybook/test';
import { ContactForm } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    action: fn(),
    handleRc: fn(),
    isPending: false,
    isRcError: false,
    locale: 'en',
    recaptchaRef: {
      current: null
    },
    state: {
      data: {
        countryCode: 'AD',
        email: 'email@gmail.com',
        firstName: 'First',
        lastName: 'Last',
        message: 'message',
        phoneNumber: '2013123123'
      }
    }
  },
  component: ContactForm
} satisfies Meta<typeof ContactForm>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
