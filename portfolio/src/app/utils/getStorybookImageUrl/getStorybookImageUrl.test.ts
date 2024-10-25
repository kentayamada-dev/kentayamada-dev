import { describe, expect, it } from 'vitest';
import { getStorybookImageUrl } from './getStorybookImageUrl';

describe('getStorybookImageUrl', () => {
  it('should return the correct URL in development environment', () => {
    expect.assertions(1);

    const result = getStorybookImageUrl('development', 'image.png');

    expect(result).toBe('/image.png');
  });

  it('should return the correct URL in production environment', () => {
    expect.assertions(1);

    const result = getStorybookImageUrl('production', 'image.png');

    expect(result).toBe('/storybook/image.png');
  });
});
