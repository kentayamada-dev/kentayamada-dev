import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { arrayOfThemes, defaultTheme, themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { currentThemeKey: { control: 'select', options: arrayOfThemes }, lang: { control: 'select', options: arrayOfLocales } },
  args: {
    currentThemeKey: defaultTheme,
    handleTheme: fn(),
    isMounted: true,
    items: themeOptions,
    lang: defaultLocale
  },
  component: ThemeSwitcher
} satisfies Meta<typeof ThemeSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
