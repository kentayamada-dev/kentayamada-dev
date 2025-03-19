import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type CopyRightProps = {
  authorName: string;
  lang: LocaleKeyType;
  year: number;
};

type CopyRightType = ComponentType<CopyRightProps>;

export type { CopyRightProps, CopyRightType };
