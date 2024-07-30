import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';

type LocaleSwitcherWrapperProps = {
  lang: LocaleKeyType;
};

type LocaleSwitcherWrapperType = ReadonlyComponentType<LocaleSwitcherWrapperProps>;

export type { LocaleSwitcherWrapperType };
