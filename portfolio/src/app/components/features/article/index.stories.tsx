import { Article } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  args: {
    content: '<h1>Hi</h1>',
    lang: 'en',
    publishedAt: '2024-08-20T00:12:51.520Z',
    title: 'Title'
  },
  component: Article,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Features/Article'
} satisfies Meta<typeof Article>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
