import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { TableOfContents } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: defaultLocale
  },
  component: TableOfContents,
  title: 'Features/Article/Table Of Contents'
} satisfies Meta<typeof TableOfContents>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
