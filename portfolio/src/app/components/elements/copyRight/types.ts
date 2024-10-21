import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type CopyRightProps = {
  authorName: string;
  lang: LocaleKeyType;
  year: number;
};

type CopyRightType = ReadonlyComponentType<CopyRightProps>;

export type { CopyRightProps, CopyRightType };
