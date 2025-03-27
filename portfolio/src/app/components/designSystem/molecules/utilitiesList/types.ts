import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type UtilitiesListProps = {
  locale: LocaleKeyType;
  utilities: {
    coverImage: {
      title: string;
      url: string;
    };
    slug: string;
    subtitle: string;
    title: string;
  }[];
  utilitiesHref: string;
};

type UtilitiesListType = ComponentType<UtilitiesListProps>;

export type { UtilitiesListProps, UtilitiesListType };
