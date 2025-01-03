import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilityLayout } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales }, publishedAt: { control: 'date' } },
  args: {
    faqs: [
      {
        answer: (
          <section>
            <h2 id='wonders-of-nature'>The Wonders of Nature</h2>
            <h2 id='serenity-of-forests'>Exploring the Serenity of Forests</h2>
            <h3 id='rustling-leaves'>The Sound of Rustling Leaves</h3>
            <h4 id='natural-symphony'>A Natural Symphony</h4>
            <p>
              Walking through a forest, one is surrounded by the calming sound of rustling leaves. This natural music
              has a soothing effect, reducing stress and promoting relaxation.
            </p>
          </section>
        ),
        question: 'question 1'
      },
      {
        answer: (
          <section>
            <h2 id='wonders-of-nature'>The Wonders of Nature</h2>
            <h2 id='serenity-of-forests'>Exploring the Serenity of Forests</h2>
            <h3 id='rustling-leaves'>The Sound of Rustling Leaves</h3>
            <h4 id='natural-symphony'>A Natural Symphony</h4>
            <p>
              Walking through a forest, one is surrounded by the calming sound of rustling leaves. This natural music
              has a soothing effect, reducing stress and promoting relaxation.
            </p>
          </section>
        ),
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
