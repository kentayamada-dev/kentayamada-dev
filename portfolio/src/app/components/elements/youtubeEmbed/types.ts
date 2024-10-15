import type { ReadonlyComponentType } from '@/types/components';

type YoutubeEmbedProps = {
  videoId: string;
};

type YoutubeEmbedType = ReadonlyComponentType<YoutubeEmbedProps>;

export type { YoutubeEmbedType };
