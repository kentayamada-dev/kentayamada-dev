import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';

type ContactFormWrapperProps = {
  locale: LocaleKeyType;
};

type ContactFormWrapperType = ComponentType<ContactFormWrapperProps>;

export type { ContactFormWrapperType };
