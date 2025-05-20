import type { z } from 'zod';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { contactSchema } from './schema';

type ContactSchemaType = z.infer<typeof contactSchema>;

type ContactSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;

type FormProps = {
  locale: LocaleKeyType;
};

type FormStateType = Partial<{
  data: ContactSchemaType;
  errors: ContactSchemaErrorType;
}>;

type FormType = ComponentType<FormProps>;

export type { ContactSchemaType, FormStateType, FormType };
