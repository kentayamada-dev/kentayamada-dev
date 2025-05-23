import { YoutubeEmbed } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    title: 'Youtube',
    videoId: '3KtWfp0UopM'
  },
  component: YoutubeEmbed
} satisfies Meta<typeof YoutubeEmbed>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
