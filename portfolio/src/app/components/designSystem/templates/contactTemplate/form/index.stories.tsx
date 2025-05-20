import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Form } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    locale: defaultLocale
  },
  component: Form
} satisfies Meta<typeof Form>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
