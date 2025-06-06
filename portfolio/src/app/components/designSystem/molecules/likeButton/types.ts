import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type LikeButtonProps = {
  likeCount: number;
  locale: LocaleKeyType;
  onLike: VoidFunction;
};

type LikeButtonType = ComponentType<LikeButtonProps>;

export type { LikeButtonProps, LikeButtonType };
