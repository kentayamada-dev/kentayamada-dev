import { describe, expect, it } from 'vitest';
import { getKeysFromObject } from './getKeysFromObject';

describe('getKeysFromObject', () => {
  it('should return the keys of an object', () => {
    const obj = {
      age: 25,
      isStudent: true,
      name: 'Alice'
    } as const;

    const keys = getKeysFromObject(obj);

    expect(keys).toEqual(['age', 'isStudent', 'name']);
  });

  it('should return an empty array for an empty object', () => {
    const obj = {} as const;
    const keys = getKeysFromObject(obj);

    expect(keys).toEqual([]);
  });
});
