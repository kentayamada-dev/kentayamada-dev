import { fn } from '@storybook/test';
import { themeOptions } from '@/constants/themes';
import { getKeysFromObject } from '@/utils/getKeysFromObject';
import { ThemeSwitch } from '.';
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
  component: ThemeSwitch
} satisfies Meta<typeof ThemeSwitch>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
