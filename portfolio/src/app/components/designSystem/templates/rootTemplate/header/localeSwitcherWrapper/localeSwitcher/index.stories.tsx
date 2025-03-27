import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale, locales } from '@/constants/i18n';
import { LocaleSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    handleLocale: fn(),
    locale: defaultLocale,
    locales
  },
  component: LocaleSwitcher
} satisfies Meta<typeof LocaleSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
