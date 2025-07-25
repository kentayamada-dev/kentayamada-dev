import { fn } from '@storybook/test';
import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Calculator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    likeCount: 100,
    locale: defaultLocale,
    onCountLike: fn(),
    title: 'Share',
    url: '#'
  },
  component: Calculator
} satisfies Meta<typeof Calculator>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
