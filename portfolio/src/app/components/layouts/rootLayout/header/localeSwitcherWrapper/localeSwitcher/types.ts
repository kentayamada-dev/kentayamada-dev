import type { LocaleType } from '@/constants/i18n/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type LocaleSwitcherProps = {
  currentLocaleKey: string | undefined;
  handleLocale: StateSetterType<string>;
  items: LocaleType;
};

type LocaleSwitcherType = ReadonlyComponentType<LocaleSwitcherProps>;

export type { LocaleSwitcherType };
