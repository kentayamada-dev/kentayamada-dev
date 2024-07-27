import type { LocaleKeyType } from '@/constants/locales/types';
import type { ReadonlyComponentType } from '@/types/components';

type NavItemsWrapperProps = {
  lang: LocaleKeyType;
};

type NavItemsWrapperType = ReadonlyComponentType<NavItemsWrapperProps>;

export type { NavItemsWrapperType };
