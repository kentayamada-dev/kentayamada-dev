import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale, locales } from '@/constants/i18n';
import { LocaleSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    handleLocale: fn(),
    items: locales,
    lang: defaultLocale
  },
  component: LocaleSwitcher
} satisfies Meta<typeof LocaleSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
