import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { Article } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { createdAt: { control: 'date' }, locale: { control: 'select', options: arrayOfLocales } },
  args: {
    createdAt: new Date('2025-08-26T21:50:14.930Z'),
    description: 'Description',
    locale: defaultLocale,
    readArticle: 'Read article',
    title: 'Title'
  },
  component: Article,
  render: (args): JSXElementType => {
    const { createdAt, ...rest } = args;

    return <Article createdAt={new Date(args.createdAt)} {...rest} />;
  }
} satisfies Meta<typeof Article>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
