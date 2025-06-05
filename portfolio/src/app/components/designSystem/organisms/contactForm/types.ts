import type { z } from 'zod';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { contactSchema } from './schema';

type ContactFormSchemaType = z.infer<typeof contactSchema>;

type ContactFormSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;

type ContactFormProps = {
  locale: LocaleKeyType;
};

type ContactFormStateType = Partial<{
  data: ContactFormSchemaType;
  errors: ContactFormSchemaErrorType;
}>;

type ContactFormType = ComponentType<ContactFormProps>;

export type { ContactFormSchemaType, ContactFormStateType, ContactFormType };
