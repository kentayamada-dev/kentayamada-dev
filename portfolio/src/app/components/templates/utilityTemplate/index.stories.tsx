import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilityTemplate } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales }, publishedAt: { control: 'date' } },
  args: {
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
    lang: defaultLocale,
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
  ],
  title: 'Templates/Utility Template'
} satisfies Meta<typeof UtilityTemplate>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
