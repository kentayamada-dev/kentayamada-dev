import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { UtilitiesResponseType } from '@/types/contentful';

type UtilitiesListProps = {
  lang: LocaleKeyType;
  title: string;
  utilities: UtilitiesResponseType['utilityCollection']['items'];
  utilitiesHref: string;
};

type UtilitiesListType = ComponentType<UtilitiesListProps>;

export type { UtilitiesListProps, UtilitiesListType };
