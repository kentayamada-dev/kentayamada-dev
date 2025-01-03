import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType, ReadonlyComponentType } from '@/types/components';

type UtilityLayoutProps = {
  faqs: {
    answer: JSXElementType;
    question: string;
  }[];
  lang: LocaleKeyType;
  publishedAt: Date;
  title: string;
};

type UtilityLayoutType = ReadonlyComponentType<UtilityLayoutProps>;

export type { UtilityLayoutType };
