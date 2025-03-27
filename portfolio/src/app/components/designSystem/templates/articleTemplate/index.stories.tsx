import { articlesListStory } from '@/components/designSystem/molecules';
import articleStory from './article/index.stories';
import { ArticleTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { ...articleStory.argTypes, ...articlesListStory.argTypes },
  args: {
    ...articleStory.args,
    ...articlesListStory.args,
    articlesListTitle: 'Recommend'
  },
  component: ArticleTemplate,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof ArticleTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
