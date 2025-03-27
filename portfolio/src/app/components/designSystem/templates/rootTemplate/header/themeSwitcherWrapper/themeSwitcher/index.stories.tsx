import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { arrayOfThemes, defaultTheme, themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { currentThemeKey: { control: 'select', options: arrayOfThemes }, locale: { control: 'select', options: arrayOfLocales } },
  args: {
    currentThemeKey: defaultTheme,
    handleTheme: fn(),
    isMounted: true,
    locale: defaultLocale,
    themes: themeOptions
  },
  component: ThemeSwitcher
} satisfies Meta<typeof ThemeSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
