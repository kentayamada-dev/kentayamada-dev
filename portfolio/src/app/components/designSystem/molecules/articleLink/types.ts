import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ArticleLinkProps = {
  createdAt: Date;
  description: string;
  href: string;
  likeCount: number;
  locale: LocaleKeyType;
  title: string;
  topics: string[];
  viewCount: number;
};

type ArticleLinkType = ComponentType<ArticleLinkProps>;

export type { ArticleLinkType };
