import { defaultLocale } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { mapObjectByKeyValue } from '@/utils';
import { NavItems } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const navigation = navigationItems(defaultLocale);

const meta = {
  argTypes: {
    currentPathname: {
      control: {
        labels: mapObjectByKeyValue(navigation, 'href', 'title'),
        type: 'select'
      },
      options: Object.values(navigation).map((item) => {
        return item.href;
      })
    }
  },
  args: {
    currentPathname: navigation.home.href,
    items: navigation,
    locale: defaultLocale
  },
  component: NavItems
} satisfies Meta<typeof NavItems>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
