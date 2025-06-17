'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { NavItems } from './navItems';
import type { NavItemsWrapperType } from './types';

const NavItemsWrapper: NavItemsWrapperType = (props) => {
  const pathname = usePathname();

  return <NavItems currentPathname={pathname.split('/').slice(0, 3).join('/')} items={navigationItems(props.locale)} navLabel={props.navLabel} />;
};

export { NavItemsWrapper };
