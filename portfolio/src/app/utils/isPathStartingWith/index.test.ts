import { describe, expect, it } from 'vitest';
import { isPathStartingWith } from '.';

describe('isPathStartingWith', () => {
  it('should return true when path starts with basePath', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/base/path/to/file', 'base')).toBeTruthy();
  });

  it('should return true when path is exactly basePath', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/base', 'base')).toBeTruthy();
  });

  it('should return true when path starts with basePath and ends with a slash', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/base/', 'base')).toBeTruthy();
  });

  it('should return false when path does not start with basePath', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/notbase/path/to/file', 'base')).toBeFalsy();
  });

  it('should return false when path only partially matches basePath', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/basepath/to/file', 'base')).toBeFalsy();
  });

  it('should return false when basePath is not at the start of path', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/path/base/to/file', 'base')).toBeFalsy();
  });

  it('should handle empty path', () => {
    expect.assertions(1);

    expect(isPathStartingWith('', 'base')).toBeFalsy();
  });

  it('should handle empty basePath', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/some/path', '')).toBeFalsy();
  });

  it('should handle root path', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/', 'base')).toBeFalsy();
  });

  it('should be case-sensitive', () => {
    expect.assertions(1);

    expect(isPathStartingWith('/Base/path', 'base')).toBeFalsy();
  });
});
