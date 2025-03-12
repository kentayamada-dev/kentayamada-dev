import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType, ReadonlyComponentType } from '@/types/components';

type UtilityTemplateProps = {
  faqs: {
    answer: JSXElementType;
    question: string;
  }[];
  lang: LocaleKeyType;
  publishedAt: Date;
  title: string;
};

type UtilityTemplateType = ReadonlyComponentType<UtilityTemplateProps>;

export type { UtilityTemplateType };
