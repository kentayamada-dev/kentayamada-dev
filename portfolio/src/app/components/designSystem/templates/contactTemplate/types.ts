import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ContactTemplateProps = {
  locale: LocaleKeyType;
  subtitle: string;
  title: string;
};

type ContactTemplateType = ComponentType<ContactTemplateProps>;

export type { ContactTemplateType };
