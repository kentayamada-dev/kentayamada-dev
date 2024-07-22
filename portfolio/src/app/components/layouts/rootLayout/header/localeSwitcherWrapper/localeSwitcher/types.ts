import type { LocaleType } from '@/constants/locales/types';
import type { ReadonlyComponentType, StateSetterType } from '@/types/components';

type LocaleSwitcherProps = {
  currentLocaleKey: string | undefined;
  handleLocale: StateSetterType<string>;
  items: LocaleType;
};

type LocaleSwitcherType = ReadonlyComponentType<LocaleSwitcherProps>;

export type { LocaleSwitcherType };
