import { throwColoredError } from '../throwColoredError';

const getRedisKey = (namespace: 'article' | 'utility', type: 'like' | 'view', id: string): string => {
  if (!id) {
    throwColoredError('The <id> parameter cannot be an empty string.', 'red');
  }

  return `${namespace}:${type}:${id}`;
};

export { getRedisKey };
