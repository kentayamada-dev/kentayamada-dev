import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type UtilitiesListProps = {
  locale: LocaleKeyType;
  utilities: {
    href: string;
    subtitle: string;
    title: string;
  }[];
};

type UtilitiesListType = ComponentType<UtilitiesListProps>;

export type { UtilitiesListType };
