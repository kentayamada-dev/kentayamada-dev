import { describe, expect, it } from 'vitest';
import { isPathStartingWith } from './isPathStartingWith';

describe('isPathStartingWith', () => {
  it('should return true when path starts with basePath', () => {
    expect(isPathStartingWith('/base/path/to/file', 'base')).toBe(true);
  });

  it('should return true when path is exactly basePath', () => {
    expect(isPathStartingWith('/base', 'base')).toBe(true);
  });

  it('should return true when path starts with basePath and ends with a slash', () => {
    expect(isPathStartingWith('/base/', 'base')).toBe(true);
  });

  it('should return false when path does not start with basePath', () => {
    expect(isPathStartingWith('/notbase/path/to/file', 'base')).toBe(false);
  });

  it('should return false when path only partially matches basePath', () => {
    expect(isPathStartingWith('/basepath/to/file', 'base')).toBe(false);
  });

  it('should return false when basePath is not at the start of path', () => {
    expect(isPathStartingWith('/path/base/to/file', 'base')).toBe(false);
  });

  it('should handle empty path', () => {
    expect(isPathStartingWith('', 'base')).toBe(false);
  });

  it('should handle empty basePath', () => {
    expect(isPathStartingWith('/some/path', '')).toBe(false);
  });

  it('should handle root path', () => {
    expect(isPathStartingWith('/', 'base')).toBe(false);
  });

  it('should be case-sensitive', () => {
    expect(isPathStartingWith('/Base/path', 'base')).toBe(false);
  });
});
