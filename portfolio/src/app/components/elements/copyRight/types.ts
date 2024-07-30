import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type CopyRightProps = {
  lang: LocaleKeyType;
};

type CopyRightType = ReadonlyComponentType<CopyRightProps>;

export type { CopyRightType };
