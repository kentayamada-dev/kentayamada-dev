import type { LikeButtonProps } from '@/components/designSystem/molecules';
import type { ComponentType, ConditionalPickType } from '@/types/components';

type LikeButtonWrapperProps = ConditionalPickType<LikeButtonProps, 'likeCount' | 'locale'> & {
  incrementCountHandler: () => Promise<void>;
};

type LikeButtonWrapperType = ComponentType<LikeButtonWrapperProps>;

export type { LikeButtonWrapperProps, LikeButtonWrapperType };
