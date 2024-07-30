import { arrayOfLocales } from '@/constants/i18n';
import { CopyRight } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    lang: 'en'
  },
  component: CopyRight,
  title: 'Elements/Copy Right'
} satisfies Meta<typeof CopyRight>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
