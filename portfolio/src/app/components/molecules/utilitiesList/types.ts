import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ReadonlyComponentType } from '@/types/components';
import type { UtilitiesResponseType } from '@/types/contentful';

type UtilitiesListProps = {
  lang: LocaleKeyType;
  title: string;
  utilities: UtilitiesResponseType['utilityCollection']['items'];
  utilitiesHref: string;
};

type UtilitiesListType = ReadonlyComponentType<UtilitiesListProps>;

export type { UtilitiesListProps, UtilitiesListType };
