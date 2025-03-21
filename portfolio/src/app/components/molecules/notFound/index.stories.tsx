import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { NotFound } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale,
    mainMessage: 'Main Message',
    subMessage: 'Sub Message'
  },
  component: NotFound
} satisfies Meta<typeof NotFound>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
