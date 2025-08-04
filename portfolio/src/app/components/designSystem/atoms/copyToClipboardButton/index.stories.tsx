import { CopyToClipboardButton } from '.';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  args: {
    label: 'Copy to Clipboard',
    url: '#'
  },
  component: CopyToClipboardButton
} satisfies Meta<typeof CopyToClipboardButton>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
