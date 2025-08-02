import { fn } from '@storybook/test';
import { JpFlagIcon } from '@/components/icons/jpFlagIcon';
import { arrayOfLocales, defaultLocale, locales } from '@/constants/i18n';
import { Switcher } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import type { JSXElementType } from '@/types/components';

const meta = {
  argTypes: { value: { control: 'select', options: arrayOfLocales } },
  args: {
    buttonIcon: JpFlagIcon,
    buttonLabel: 'Button Label',
    isMounted: true,
    onChange: fn(),
    options: locales,
    value: defaultLocale
  },
  component: Switcher,
  decorators: [
    (Story): JSXElementType => {
      return (
        <div className='flex w-36 justify-end'>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof Switcher>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
