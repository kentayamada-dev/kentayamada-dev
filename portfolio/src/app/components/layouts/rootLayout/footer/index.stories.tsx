import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Footer } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    authorName: 'John Doe',
    lang: defaultLocale,
    year: 2024
  },
  component: Footer,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ],
  title: 'Layouts/Root Layout/Footer'
} satisfies Meta<typeof Footer>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
