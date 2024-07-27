'use client';

import { navigationItems } from '@/constants/navigation';
import { NavItems } from './navItems';
import type { NavItemsWrapperType } from './types';

const NavItemsWrapper: NavItemsWrapperType = (props) => {
  const sortedNavigationItems = [...navigationItems].sort((firstItem, secondItem) => {
    return firstItem.href.localeCompare(secondItem.href);
  });

  return <NavItems items={sortedNavigationItems} lang={props.lang} />;
};

export { NavItemsWrapper };
