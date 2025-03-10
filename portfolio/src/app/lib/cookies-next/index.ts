import { setCookie } from 'cookies-next';
import { env } from '@/constants/env';
import { localeCookieName } from '@/constants/i18n';
import type { SetLocaleCookieType } from './types';

const setLocaleCookie: SetLocaleCookieType = async (value, options) => {
  await setCookie(localeCookieName, value, {
    maxAge: 2592000,
    path: '/',
    priority: 'high',
    sameSite: 'strict',
    secure: env.IS_VERCEL_ENV,
    ...options
  });
};

export { setLocaleCookie };
