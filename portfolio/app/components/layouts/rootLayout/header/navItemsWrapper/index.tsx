'use client';

import { navigationItems } from '@/constants/navigation';
import { NavItems } from './navItems';
import type { JSXElementType } from '@/types/components';

const NavItemsWrapper = (): JSXElementType => {
  const sortedNavigationItems = [...navigationItems].sort((firstItem, secondItem) => {
    return firstItem.href.localeCompare(secondItem.href);
  });

  return <NavItems items={sortedNavigationItems} />;
};

export { NavItemsWrapper };
