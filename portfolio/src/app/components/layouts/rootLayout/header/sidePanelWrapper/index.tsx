'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { screenOptions } from '@/constants/screens';
import { useBoolean, useMediaQuery } from '@/hooks';
import { getPathnameWithoutLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { JSXElementType } from '@/types/components';

const SidePanelWrapper = (): JSXElementType => {
  const { setValue, toggle, value } = useBoolean({ defaultValue: false });
  const pathname = usePathname();
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);

  const sortedNavigationItems = [...navigationItems].sort((firstItem, secondItem) => {
    return firstItem.href.localeCompare(secondItem.href);
  });

  useMediaQuery({
    callback: () => {
      setValue(false);
    },
    query: `(min-width: ${screenOptions.sm}px)`
  });

  return (
    <SidePanel
      currentPathname={pathnameWithoutLocale}
      handleToggle={toggle}
      items={sortedNavigationItems}
      open={value}
    />
  );
};

export { SidePanelWrapper };
