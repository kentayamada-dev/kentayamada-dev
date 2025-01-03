import { describe, expect, it } from 'vitest';
import { getYouTubeVideoId } from '.';

describe('extractYouTubeID', () => {
  it('should extract video ID from a standard YouTube URL', () => {
    expect.assertions(1);

    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    expect(getYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from a youtu.be URL', () => {
    expect.assertions(1);

    const url = 'https://youtu.be/dQw4w9WgXcQ';

    expect(getYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('should extract video ID from an embed YouTube URL', () => {
    expect.assertions(1);

    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    expect(getYouTubeVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('should return empty string for invalid YouTube URL', () => {
    expect.assertions(1);

    const url = 'https://www.example.com/watch?v=dQw4w9WgXcQ';

    expect(getYouTubeVideoId(url)).toBe('');
  });

  it('should return null for a completely invalid URL', () => {
    expect.assertions(1);

    const url = 'not-a-url';

    expect(getYouTubeVideoId(url)).toBe('');
  });
});
