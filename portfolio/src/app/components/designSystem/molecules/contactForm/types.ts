import type { RefObject } from 'react';
// @ts-expect-error type not found
// eslint-disable-next-line import/no-named-as-default
import type ReCAPTCHA from 'react-google-recaptcha';
import type { z } from 'zod';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType } from '@/types/components';
import type { contactSchema } from './schema';

type ContactFormSchemaType = z.infer<typeof contactSchema>;

type ContactFormSchemaErrorType = z.inferFlattenedErrors<typeof contactSchema>;

type ContactFormStateType = Partial<{
  data: ContactFormSchemaType;
  errors: ContactFormSchemaErrorType;
}>;

type ContactFormProps = {
  action: (payload: FormData) => void;
  handleRc: (value: string) => void;
  isPending: boolean;
  isRcError: boolean;
  locale: LocaleKeyType;
  recaptchaRef: RefObject<ReCAPTCHA>;
  state: ContactFormStateType;
};

type ContactFormType = ComponentType<ContactFormProps>;

export type { ContactFormSchemaType, ContactFormStateType, ContactFormType };
