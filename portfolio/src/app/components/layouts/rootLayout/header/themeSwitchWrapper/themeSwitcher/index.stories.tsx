import { fn } from '@storybook/test';
import { themeOptions } from '@/constants/themes';
import { getKeysFromObject } from '@/utils/getKeysFromObject';
import { ThemeSwitcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line custom/as-const-satisfies
const meta = {
  argTypes: { currentThemeKey: { control: 'select', options: getKeysFromObject(themeOptions) } },
  args: {
    currentThemeKey: 'dark',
    handleTheme: fn(),
    isMounted: true,
    items: themeOptions
  },
  component: ThemeSwitcher,
  title: 'Layouts/RootLayout/Header/ThemeSwitcher'
} satisfies Meta<typeof ThemeSwitcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
