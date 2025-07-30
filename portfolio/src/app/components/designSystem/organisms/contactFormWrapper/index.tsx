'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { ContactForm, contactSchema } from '@/components/designSystem/molecules';
import { createPost, verifyRecaptcha } from './actions';
import type { ContactFormStateType } from '@/components/designSystem/molecules';
import type { ContactFormWrapperType } from './types';

export const ContactFormWrapper: ContactFormWrapperType = (props) => {
  const recaptchaRef = useRef(null);
  const recaptchaToken = useRef('');
  const [isRcError, setIsRcError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }, [isSuccess]);

  const actionWithRecaptcha = async (_prevState: ContactFormStateType, formData: FormData): Promise<ContactFormStateType> => {
    const rawData = Object.fromEntries(formData);
    const parsed = contactSchema.safeParse(rawData);

    if (!parsed.success) {
      // @ts-expect-error type mismatch
      return { data: rawData, errors: parsed.error.formErrors };
    }

    const isHuman = await verifyRecaptcha(recaptchaToken.current);

    if (!isHuman) {
      setIsRcError(true);

      return {
        // @ts-expect-error type mismatch
        data: Object.fromEntries(formData)
      };
    }

    const result = await createPost(parsed.data);

    // @ts-expect-error type missing
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    recaptchaRef.current.reset();

    setIsRcError(false);
    setIsSuccess(true);

    return result;
  };

  const [state, handleAction, isPending] = useActionState(actionWithRecaptcha, {});

  const handleChangeRc = (value: string): void => {
    recaptchaToken.current = value;
  };

  return (
    <ContactForm
      isRcError={isRcError}
      locale={props.locale}
      onAction={handleAction}
      onChangeRc={handleChangeRc}
      recaptchaRef={recaptchaRef}
      state={state}
      // eslint-disable-next-line no-nested-ternary
      status={isSuccess ? 'success' : isPending ? 'loading' : 'idle'}
    />
  );
};
