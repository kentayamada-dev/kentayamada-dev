import type { GetTypedKeyType } from './types';
import { isOneOf } from '@/typeGuards/isOneOf';
import { isString } from '@/typeGuards/isString';

const getTypedKey: GetTypedKeyType = (optionKey, options, defaultKey) => {
  if (isString(optionKey) && isOneOf(optionKey, options)) {
    return optionKey;
  }

  return defaultKey;
};

export { getTypedKey };
