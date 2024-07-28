import type { LocaleKeyType } from '@/constants/locales/types';
import type { ReadonlyComponentType } from '@/types/components';

type NotFoundProps = {
  lang: LocaleKeyType;
};

type NotFoundType = ReadonlyComponentType<NotFoundProps>;

export type { NotFoundType };
