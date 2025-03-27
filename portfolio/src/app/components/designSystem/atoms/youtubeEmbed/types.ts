import type { ComponentType } from '@/types/components';

type YoutubeEmbedProps = {
  videoId: string;
};

type YoutubeEmbedType = ComponentType<YoutubeEmbedProps>;

export type { YoutubeEmbedType };
