import { fn } from '@storybook/test';
import { constants } from '@/constants';
import { ThemeSwitch } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ThemeSwitch,
  title: 'Components/Theme Switch'
} satisfies Meta<typeof ThemeSwitch>;

export const Primary = {
  args: {
    onChangeHandler: fn(),
    theme: 'system',
    themes: constants.themes
  }
} as const satisfies StoryObj<typeof meta>;

export default meta;
