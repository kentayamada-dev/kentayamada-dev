import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Calculator } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale
  },
  component: Calculator,
  title: 'Layouts/Utility Layout/Calculator'
} satisfies Meta<typeof Calculator>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
