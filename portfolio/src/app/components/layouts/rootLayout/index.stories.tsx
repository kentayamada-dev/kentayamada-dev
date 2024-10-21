import { arrayOfLocales } from '@/constants/i18n';
import { RootLayout } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { lang: { control: 'select', options: arrayOfLocales } },
  args: {
    authorName: 'John Doe',
    children: <div />,
    lang: 'en',
    year: 2024
  },
  component: RootLayout,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex min-h-screen flex-col'>
          <Story />
        </div>
      );
    }
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/en'
      }
    }
  },
  title: 'Layouts/Root Layout'
} satisfies Meta<typeof RootLayout>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };
// eslint-disable-next-line custom/consolidate-exports
export default meta;
