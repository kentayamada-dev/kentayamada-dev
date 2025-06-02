import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticleLinkProps = {
  createdAt: Date;
  description: string;
  href: string;
  locale: LocaleKeyType;
  title: string;
  topics: string[];
  views: number;
};

type ArticleLinkType = ComponentType<ArticleLinkProps>;

export type { ArticleLinkType };
