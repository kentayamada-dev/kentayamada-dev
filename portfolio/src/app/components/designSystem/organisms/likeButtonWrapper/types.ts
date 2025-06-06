import type { LikeButtonProps } from '@/components/designSystem/molecules';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type LikeButtonWrapperProps = ConditionalPickType<LikeButtonProps, 'likeCount' | 'locale'> & {
  likeKey: string;
};

type LikeButtonWrapperType = ComponentType<LikeButtonWrapperProps>;

export type { LikeButtonWrapperType };
