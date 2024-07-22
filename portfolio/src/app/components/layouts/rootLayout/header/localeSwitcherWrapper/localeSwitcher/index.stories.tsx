import { fn } from '@storybook/test';
import { locales } from '@/constants/locales';
import { getKeysFromObject } from '@/utils';
import { LocaleSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { currentLocaleKey: { control: 'select', options: getKeysFromObject(locales) } },
  args: {
    currentLocaleKey: 'en',
    handleLocale: fn(),
    items: locales
  },
  component: LocaleSwitcher,
  title: 'Layouts/Root Layout/Header/Locale Switcher'
} satisfies Meta<typeof LocaleSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
