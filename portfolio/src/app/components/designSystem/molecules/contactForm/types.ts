import type { RefObject } from 'react';
// @ts-expect-error type not found
// eslint-disable-next-line import/no-named-as-default
import type ReCAPTCHA from 'react-google-recaptcha';
import type { z } from 'zod';
import type { StatefulButtonProps } from '@/components/designSystem/atoms/statefulButton/types';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { ComponentType, ConditionalPickType } from '@/types/components';
import type { contactSchema } from './schema';

type ContactFormSchemaType = z.infer<typeof contactSchema>;

type ContactFormSchemaErrorType = z.core.$ZodFlattenedError<ContactFormSchemaType>;

type ContactFormStateType = Partial<{
  data: ContactFormSchemaType;
  error: ContactFormSchemaErrorType;
}>;

type ContactFormProps = ConditionalPickType<StatefulButtonProps, 'status'> & {
  isRcError: boolean;
  locale: LocaleKeyType;
  onAction: (payload: FormData) => void;
  onChangeRc: (value: string) => void;
  recaptchaRef: RefObject<ReCAPTCHA>;
  state: ContactFormStateType;
};

type ContactFormType = ComponentType<ContactFormProps>;

export type { ContactFormSchemaType, ContactFormStateType, ContactFormType };
