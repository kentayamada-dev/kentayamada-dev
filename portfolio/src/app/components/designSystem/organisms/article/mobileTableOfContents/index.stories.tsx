import { viewportKeys } from '@/lib/storybook';
import desktopTableOfContentsStory from '../desktopTableOfContents/index.stories';
import { MobileTableOfContents } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: { ...desktopTableOfContentsStory.args },
  component: MobileTableOfContents,
  decorators: desktopTableOfContentsStory.decorators,
  parameters: {
    viewport: { defaultViewport: viewportKeys.iPhone14ProMax }
  }
} satisfies Meta<typeof MobileTableOfContents>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
