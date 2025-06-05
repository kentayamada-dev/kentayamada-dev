'use server';

import { envServer } from '@/constants/env';
import { contactSchema, siteVerifySchema } from './schema';
import type { ContactFormSchemaType, ContactFormStateType } from './types';

const RECAPTCHA_SCORE_THRESHOLD = 0.5;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPEqCFT6X4oIK8Ol3qlVVIoSMzE6TioJND1umRUNUI5p3-wI3M-513VA5Ty-JqGr-ANw/exec';

const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      body: new URLSearchParams({
        response: token,
        secret: envServer.RECAPTCHA_SECRET_KEY
      }),
      method: 'POST'
    });

    if (!res.ok) {
      return false;
    }

    const data = siteVerifySchema.parse(await res.json());

    return data.success && data.score >= RECAPTCHA_SCORE_THRESHOLD;
  } catch {
    return false;
  }
};

const createPost = async (_prevState: ContactFormStateType, formData: FormData): Promise<ContactFormStateType> => {
  const rawData = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return { data: rawData as ContactFormSchemaType, errors: parsed.error.formErrors };
  }

  await fetch(GOOGLE_SCRIPT_URL, {
    body: new URLSearchParams(parsed.data),
    method: 'POST'
  });

  return {};
};

export { createPost, verifyRecaptcha };
