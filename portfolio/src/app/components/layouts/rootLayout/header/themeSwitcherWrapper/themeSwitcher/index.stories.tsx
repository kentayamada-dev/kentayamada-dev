import { fn } from '@storybook/test';
import { arrayOfLocales } from '@/constants/locales';
import { themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { currentThemeKey: { control: 'select', options: arrayOfLocales } },
  args: {
    currentThemeKey: 'dark',
    handleTheme: fn(),
    isMounted: true,
    items: themeOptions
  },
  component: ThemeSwitcher,
  title: 'Layouts/Root Layout/Header/Theme Switcher'
} satisfies Meta<typeof ThemeSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
