import type { LocaleKeyType } from '@/constants/i18n/types';
import type { NavigationType } from '@/constants/navigation/types';
import type { ReadonlyComponentType } from '@/types/components';

type NavItemsProps = {
  currentPathname: string;
  items: NavigationType;
  lang: LocaleKeyType;
};

type NavItemsType = ReadonlyComponentType<NavItemsProps>;

export type { NavItemsType };
