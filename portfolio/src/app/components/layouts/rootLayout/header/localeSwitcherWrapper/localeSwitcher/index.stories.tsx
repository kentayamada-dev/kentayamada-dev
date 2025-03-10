import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale, locales } from '@/constants/i18n';
import { LocaleSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { defaultLang: { control: 'select', options: arrayOfLocales } },
  args: {
    defaultLang: defaultLocale,
    handleLocale: fn(),
    items: locales,
    lang: ''
  },
  component: LocaleSwitcher,
  title: 'Layouts/Root Layout/Header/Locale Switcher'
} satisfies Meta<typeof LocaleSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
