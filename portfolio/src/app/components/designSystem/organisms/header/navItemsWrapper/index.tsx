'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { NavItems } from './navItems';
import type { NavItemsWrapperType } from './types';

const NavItemsWrapper: NavItemsWrapperType = (props) => {
  const pathname = usePathname();

  const items = Object.fromEntries(
    Object.entries(navigationItems(props.locale)).filter(([_, value]) => {
      return !value.isHidden;
    })
  );

  return <NavItems currentPathname={pathname.split('/').slice(0, 3).join('/')} items={items} navLabel={props.navLabel} />;
};

export { NavItemsWrapper };
