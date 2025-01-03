import { type OptionsType, setCookie } from 'cookies-next';
import { env } from '@/constants/env';
import { localeCookieName } from '@/constants/i18n';

const setLocaleCookie = async (value: string, options?: OptionsType): Promise<void> => {
  await setCookie(localeCookieName, value, {
    // One month limit
    maxAge: 2592000,
    path: '/',
    priority: 'high',
    sameSite: 'strict',
    secure: env.IS_VERCEL_ENV,
    ...options
  });
};

export { setLocaleCookie };
