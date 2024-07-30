import { MoonIcon, SunIcon } from '@/components/icons';
import { arrayOfLocales } from '@/constants/i18n';
import { NavItems } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    items: [
      { href: '/dashboard', icon: MoonIcon, title: 'Dashboard' },
      { href: '/', icon: SunIcon, title: 'Home' }
    ],
    lang: 'en'
  },
  component: NavItems,
  title: 'Layouts/Root Layout/Header/Nav Items'
} satisfies Meta<typeof NavItems>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
