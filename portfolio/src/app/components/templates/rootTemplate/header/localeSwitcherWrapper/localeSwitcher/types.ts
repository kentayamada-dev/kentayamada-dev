import type { LocaleKeyType, LocaleType } from '@/constants/i18n/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type LocaleSwitcherProps = {
  defaultLang: LocaleKeyType;
  handleLocale: StateSetterType<string>;
  items: LocaleType;
  lang: string | undefined;
};

type LocaleSwitcherType = ReadonlyComponentType<LocaleSwitcherProps>;

export type { LocaleSwitcherType };
