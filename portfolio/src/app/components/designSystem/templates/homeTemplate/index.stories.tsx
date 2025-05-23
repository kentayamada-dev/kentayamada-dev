import { arrayOfLocales } from '@/constants/i18n';
import introStory from './intro/index.stories';
import { HomeTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    ...introStory.args,
    coverImage: {
      title: 'Cover Image Title',
      url: 'storybook/image1.jpg'
    },
    locale: 'en'
  },
  component: HomeTemplate
} satisfies Meta<typeof HomeTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
