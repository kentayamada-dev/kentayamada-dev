import { articlesListStory } from '@/components/designSystem/molecules';
import { ArticlesTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: { ...articlesListStory.argTypes },
  args: { ...articlesListStory.args, title: 'Articles' },
  component: ArticlesTemplate
} satisfies Meta<typeof ArticlesTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
