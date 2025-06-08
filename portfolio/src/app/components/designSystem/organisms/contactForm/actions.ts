'use server';

import { headers } from 'next/headers';
import { envServer } from '@/constants/env';
import { X_REAL_IP_HEADER } from '@/constants/navigation';
import { siteVerifySchema } from './schema';
import type { ContactFormStateType } from './types';

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPEqCFT6X4oIK8Ol3qlVVIoSMzE6TioJND1umRUNUI5p3-wI3M-513VA5Ty-JqGr-ANw/exec';

const verifyRecaptcha = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch(RECAPTCHA_VERIFY_URL, {
      body: new URLSearchParams({
        remoteip: (await headers()).get(X_REAL_IP_HEADER) ?? '',
        response: token,
        secret: envServer.RECAPTCHA_SECRETKEY
      }),
      method: 'POST'
    });

    if (!res.ok) {
      return false;
    }

    const data = siteVerifySchema.parse(await res.json());

    return data.success;
  } catch {
    return false;
  }
};

const createPost = async (_prevState: ContactFormStateType, formData: FormData): Promise<ContactFormStateType> => {
  await fetch(GOOGLE_SCRIPT_URL, {
    body: formData,
    method: 'POST'
  });

  return {};
};

export { createPost, verifyRecaptcha };
