import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    authorName: 'John Doe',
    lang: defaultLocale,
    year: 2024
  },
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  title: 'Layouts/Root Layout/Header'
} satisfies Meta<typeof Header>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
