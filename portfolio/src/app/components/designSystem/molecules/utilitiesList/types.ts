import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type UtilitiesListProps = {
  locale: LocaleKeyType;
  utilities: {
    href: string;
    likeCount: number;
    subtitle: string;
    title: string;
    viewCount: number;
  }[];
};

type UtilitiesListType = ComponentType<UtilitiesListProps>;

export type { UtilitiesListType };
