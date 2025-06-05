import type { ComponentType } from '@/types/components';

type LikeButtonProps = {
  likeCount: number;
  onLike: VoidFunction;
};

type LikeButtonType = ComponentType<LikeButtonProps>;

export type { LikeButtonProps, LikeButtonType };
