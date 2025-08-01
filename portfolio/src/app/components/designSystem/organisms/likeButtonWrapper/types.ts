import type { LikeButtonProps } from '@/components/designSystem/molecules/likeButton/types';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type LikeButtonWrapperProps = ConditionalPickType<LikeButtonProps, 'likeCount' | 'locale'> & {
  onCountLike: () => Promise<void>;
};

type LikeButtonWrapperType = ComponentType<LikeButtonWrapperProps>;

export type { LikeButtonWrapperProps, LikeButtonWrapperType };
