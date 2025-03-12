import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { CopyRight } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    authorName: 'John Doe',
    lang: defaultLocale,
    year: 2024
  },
  component: CopyRight,
  title: 'Atoms/Copy Right'
} satisfies Meta<typeof CopyRight>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
