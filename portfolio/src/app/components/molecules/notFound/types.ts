import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type NotFoundProps = {
  lang: LocaleKeyType;
  mainMessage: string;
  subMessage: string;
};

type NotFoundType = ReadonlyComponentType<NotFoundProps>;

export type { NotFoundType };
