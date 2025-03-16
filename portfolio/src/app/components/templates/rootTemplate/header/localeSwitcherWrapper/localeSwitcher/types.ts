import type { LocaleKeyType, LocaleType } from '@/constants/i18n/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type LocaleSwitcherProps = {
  handleLocale: StateSetterType<string>;
  items: LocaleType;
  lang: LocaleKeyType;
};

type LocaleSwitcherType = ReadonlyComponentType<LocaleSwitcherProps>;

export type { LocaleSwitcherType };
