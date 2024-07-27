'use client';

import { usePathname } from 'next/navigation';
import { arrayOfLocales } from '@/constants/locales';
import { navigationItems } from '@/constants/navigation';
import { screenOptions } from '@/constants/screens';
import { useBoolean, useMediaQuery } from '@/hooks';
import { getPathnameWithoutLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const { setValue, toggle, value } = useBoolean({ defaultValue: false });
  const pathname = usePathname();
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname, arrayOfLocales);

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
      lang={props.lang}
      open={value}
    />
  );
};

export { SidePanelWrapper };
