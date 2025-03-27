'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { getFirstPathSegmentAfterLocale } from '@/utils';
import { NavItems } from './navItems';
import type { NavItemsWrapperType } from './types';

const NavItemsWrapper: NavItemsWrapperType = (props) => {
  const pathname = usePathname();
  const pathnameWithoutLocale = getFirstPathSegmentAfterLocale(pathname);

  return <NavItems currentPathname={pathnameWithoutLocale} items={navigationItems} locale={props.locale} />;
};

export { NavItemsWrapper };
