import type { LikeButtonProps } from '@/components/designSystem/molecules';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type ArticleLikeButtonProps = ConditionalPickType<LikeButtonProps, 'likeCount'> & {
  likeKey: string;
};

type ArticleLikeButtonType = ComponentType<ArticleLikeButtonProps>;

export type { ArticleLikeButtonType };
