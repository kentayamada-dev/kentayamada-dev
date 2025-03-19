import type { LocaleKeyType, LocaleType } from '@/constants/i18n/types';
import type { ComponentType, StateSetterType } from '@/types/components';

type LocaleSwitcherProps = {
  handleLocale: StateSetterType<string>;
  items: LocaleType;
  lang: LocaleKeyType;
};

type LocaleSwitcherType = ComponentType<LocaleSwitcherProps>;

export type { LocaleSwitcherType };
