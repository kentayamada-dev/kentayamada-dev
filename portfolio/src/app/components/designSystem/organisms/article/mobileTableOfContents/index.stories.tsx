import { arrayOfLocales, defaultLocale } from '@/constants/i18n';
import { viewportKeys } from '@/lib/storybook';
import desktopTableOfContentsStory from '../desktopTableOfContents/index.stories';
import { MobileTableOfContents } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales }
  },
  args: { ...desktopTableOfContentsStory.args, locale: defaultLocale },
  component: MobileTableOfContents,
  decorators: desktopTableOfContentsStory.decorators,
  parameters: {
    viewport: { defaultViewport: viewportKeys.iPhone14ProMax }
  }
} satisfies Meta<typeof MobileTableOfContents>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
