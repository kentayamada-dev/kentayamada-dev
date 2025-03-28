import type { ComponentType } from '@/types/components';

type YoutubeEmbedProps = {
  title: string;
  videoId: string;
};

type YoutubeEmbedType = ComponentType<YoutubeEmbedProps>;

export type { YoutubeEmbedType };
