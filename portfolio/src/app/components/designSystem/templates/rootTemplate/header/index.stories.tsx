import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    authorName: 'John Doe',
    locale: defaultLocale,
    year: 2024
  },
  component: Header
} satisfies Meta<typeof Header>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
