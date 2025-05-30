import articlesListStory from './articlesList/index.stories';
import introStory from './intro/index.stories';
import { HomeTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...articlesListStory.argTypes },
  args: {
    ...introStory.args,
    ...articlesListStory.args,
    coverImage: {
      title: 'Cover Image Title',
      url: 'storybook/image1.jpg'
    }
  },
  component: HomeTemplate
} satisfies Meta<typeof HomeTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
