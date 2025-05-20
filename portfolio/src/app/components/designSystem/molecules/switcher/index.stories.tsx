import { fn } from '@storybook/test';
import { JapanFlagIcon } from '@/components/icons';
import { arrayOfLocales, defaultLocale, locales } from '@/constants/i18n';
import { Switcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { value: { control: 'select', options: arrayOfLocales } },
  args: {
    buttonIcon: JapanFlagIcon,
    buttonLabel: 'Button Label',
    isMounted: true,
    onChange: fn(),
    options: locales,
    value: defaultLocale
  },
  component: Switcher
} satisfies Meta<typeof Switcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
