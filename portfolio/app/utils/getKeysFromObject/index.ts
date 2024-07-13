import type { GetKeysFromObjectType } from './types';

const getKeysFromObject: GetKeysFromObjectType = (obj) => {
  return Object.keys(obj) as (keyof typeof obj)[];
};

export { getKeysFromObject };
