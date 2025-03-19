import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, JSXElementType } from '@/types/components';

type UtilityTemplateProps = {
  faqs: {
    answer: JSXElementType;
    question: string;
  }[];
  lang: LocaleKeyType;
  publishedAt: Date;
  title: string;
};

type UtilityTemplateType = ComponentType<UtilityTemplateProps>;

export type { UtilityTemplateType };
