import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { mapObjectByKeyValue } from '@/utils';
import { NavItems } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    currentPathname: {
      control: {
        labels: mapObjectByKeyValue(navigationItems, 'href', 'title'),
        type: 'select'
      },
      options: Object.values(navigationItems).map((item) => {
        return item.href;
      })
    },
    lang: { control: 'select', options: arrayOfLocales }
  },
  args: {
    currentPathname: navigationItems.home.href,
    items: navigationItems,
    lang: defaultLocale
  },
  component: NavItems
} satisfies Meta<typeof NavItems>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
