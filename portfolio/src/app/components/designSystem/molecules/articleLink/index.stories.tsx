import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { ArticleLink } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { createdAt: { control: 'date' }, locale: { control: 'select', options: arrayOfLocales } },
  args: {
    createdAt: new Date('2025-08-26T21:50:14.930Z'),
    description: 'Description',
    href: '#',
    likeCount: 20,
    locale: defaultLocale,
    title: 'Title',
    topics: ['React', 'JavaScript', 'TypeScript'],
    viewCount: 10
  },
  component: ArticleLink,
  render: (args): JSXElementType => {
    const { createdAt, ...rest } = args;

    return <ArticleLink createdAt={new Date(args.createdAt)} {...rest} />;
  }
} satisfies Meta<typeof ArticleLink>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
