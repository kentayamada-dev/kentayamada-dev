import type { LocaleKeyType } from '@/constants/i18n/types';

const getRedisKey = (namespace: 'article' | 'utility', id: string, locale?: LocaleKeyType): string => {
  return locale ? `${namespace}:${id}:${locale}` : `${namespace}:${id}`;
};

export { getRedisKey };
