import copyRightStory from '@/components/designSystem/atoms/copyRight/index.stories';
import { arrayOfLocales } from '@/constants/i18n';
import { Header } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    locale: 'en',
    ...copyRightStory.args
  },
  component: Header
} satisfies Meta<typeof Header>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
