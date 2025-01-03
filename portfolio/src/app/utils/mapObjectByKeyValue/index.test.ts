import { describe, expect, it } from 'vitest';
import { mapObjectByKeyValue } from '.';

describe('mapObjectByKeyValue', () => {
  const navigationItems = {
    about: { href: '/about', id: 2, title: 'About' },
    contact: { href: '/contact', id: 3, title: 'Contact' },
    home: { href: '/home', id: 1, title: 'Home' }
  } as const;

  it('should map href to title', () => {
    expect.assertions(1);

    const result = mapObjectByKeyValue(navigationItems, 'href', 'title');

    expect(result).toStrictEqual({
      '/about': 'About',
      '/contact': 'Contact',
      '/home': 'Home'
    });
  });

  it('should map id to title', () => {
    expect.assertions(1);

    const result = mapObjectByKeyValue(navigationItems, 'id', 'title');

    expect(result).toStrictEqual({
      1: 'Home',
      2: 'About',
      3: 'Contact'
    });
  });

  it('should map title to href', () => {
    expect.assertions(1);

    const result = mapObjectByKeyValue(navigationItems, 'title', 'href');

    expect(result).toStrictEqual({
      About: '/about',
      Contact: '/contact',
      Home: '/home'
    });
  });

  it('should handle an empty object', () => {
    expect.assertions(1);

    const result = mapObjectByKeyValue({}, 'href', 'title');

    expect(result).toStrictEqual({});
  });
});
