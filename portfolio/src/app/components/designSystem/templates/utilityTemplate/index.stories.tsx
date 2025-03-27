import calculatorStory from './calculator/index.stories';
import { UtilityTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { ...calculatorStory.argTypes, publishedAt: { control: 'date' } },
  args: {
    faqLabel: 'FAQ',
    faqs: [
      {
        answer: <p>Answer 1</p>,
        question: 'question 1'
      },
      {
        answer: <p>Answer 2</p>,
        question: 'question 2'
      }
    ],
    ...calculatorStory.args,
    publishedAt: new Date(),
    title: 'Title'
  },
  component: UtilityTemplate,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof UtilityTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
