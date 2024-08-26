import { describe, expect, it } from 'vitest';
import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  it('should return true for an empty array', () => {
    expect.assertions(1);

    expect(isEmpty([])).toBeTruthy();
  });

  it('should return false for a non-empty array', () => {
    expect.assertions(1);

    expect(isEmpty([1, 2, 3])).toBeFalsy();
  });

  it('should return true for an empty object', () => {
    expect.assertions(1);

    expect(isEmpty({})).toBeTruthy();
  });

  it('should return false for a non-empty object', () => {
    expect.assertions(1);

    expect(isEmpty({ key: 'value' })).toBeFalsy();
  });

  it('should return true for an empty string', () => {
    expect.assertions(1);

    expect(isEmpty('')).toBeTruthy();
  });

  it('should return false for a non-empty string', () => {
    expect.assertions(1);

    expect(isEmpty('hello')).toBeFalsy();
  });
});
