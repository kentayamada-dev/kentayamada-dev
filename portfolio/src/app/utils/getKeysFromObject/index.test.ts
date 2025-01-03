import { describe, expect, it } from 'vitest';
import { getKeysFromObject } from '.';

describe('getKeysFromObject', () => {
  it('should return the keys of an object', () => {
    expect.assertions(1);

    const obj = {
      age: 25,
      isStudent: true,
      name: 'Alice'
    } as const;

    const keys = getKeysFromObject(obj);

    expect(keys).toStrictEqual(['age', 'isStudent', 'name']);
  });

  it('should return an empty array for an empty object', () => {
    expect.assertions(1);

    const obj = {} as const;
    const keys = getKeysFromObject(obj);

    expect(keys).toStrictEqual([]);
  });
});
