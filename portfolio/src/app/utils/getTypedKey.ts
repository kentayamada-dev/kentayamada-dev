import { isOneOf, isString } from '@/typeGuards';

const getTypedKey = <T extends string>(
  optionKey: string | undefined,
  options: Record<T, unknown>,
  defaultKey: T
): T => {
  if (isString(optionKey) && isOneOf(optionKey, options)) {
    return optionKey;
  }

  return defaultKey;
};

export { getTypedKey };
