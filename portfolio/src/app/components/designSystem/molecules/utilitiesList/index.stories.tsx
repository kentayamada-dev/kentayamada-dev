import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { UtilitiesList } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: {
    locale: defaultLocale,
    utilities: [
      {
        href: '/utilities/calculator',
        likeCount: 150,
        subtitle: 'Perform basic and advanced mathematical calculations.',
        title: 'Calculator',
        viewCount: 1200
      },
      {
        href: '/utilities/unit-converter',
        likeCount: 0,
        subtitle: 'Convert between different units of measurement.',
        title: 'Unit Converter',
        viewCount: 950
      },
      {
        href: '/utilities/loan-calculator',
        likeCount: 75,
        subtitle: 'Calculate loan payments and interest rates.',
        title: 'Loan Calculator',
        viewCount: 0
      },
      {
        href: '/utilities/age-calculator',
        likeCount: 0,
        subtitle: 'Find out your exact age in years, months, and days.',
        title: 'Age Calculator',
        viewCount: 0
      }
    ]
  },
  component: UtilitiesList
} satisfies Meta<typeof UtilitiesList>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
