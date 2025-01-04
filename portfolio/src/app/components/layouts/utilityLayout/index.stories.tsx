import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilityLayout } from '.';
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
  component: UtilityLayout,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Layouts/Utility Layout'
} satisfies Meta<typeof UtilityLayout>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
