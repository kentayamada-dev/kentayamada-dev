import { fn } from '@storybook/test';
import { arrayOfThemes, defaultTheme, themeOptions } from '@/constants/themes';
import { ThemeSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { currentThemeKey: { control: 'select', options: arrayOfThemes } },
  args: {
    currentThemeKey: defaultTheme,
    handleTheme: fn(),
    isMounted: true,
    items: themeOptions
  },
  component: ThemeSwitcher,
  title: 'Templates/Root Template/Header/Theme Switcher'
} satisfies Meta<typeof ThemeSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
