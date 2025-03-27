import { careerListStory } from '@/components/designSystem/molecules';
import { arrayOfLocales } from '@/constants/i18n';
import { HomeTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { locale: { control: 'select', options: arrayOfLocales } },
  args: {
    ...careerListStory.args,
    careerListTitle: 'Career List',
    coverImage: {
      title: 'Cover Image Title',
      url: 'storybook/image1.jpg'
    },
    locale: 'en',
    title: {
      main: 'Main Title',
      sub: 'Sub Title'
    }
  },
  component: HomeTemplate
} satisfies Meta<typeof HomeTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
