import { YoutubeEmbed } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  args: {
    videoId: '3KtWfp0UopM'
  },
  component: YoutubeEmbed,
  title: 'Atoms/Youtube Embed'
} satisfies Meta<typeof YoutubeEmbed>;

const Primary = {} as const satisfies StoryObj<typeof meta>;

export { Primary };

export default meta;
