import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type HeaderProps = {
  lang: LocaleKeyType;
};

type HeaderType = ReadonlyComponentType<HeaderProps>;

export type { HeaderType };
