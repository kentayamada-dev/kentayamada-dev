'use client';

import { usePathname } from 'next/navigation';
import { navigationItems } from '@/constants/navigation';
import { screenOptions } from '@/constants/screens';
import { useBoolean, useMediaQuery } from '@/hooks';
import { getFirstPathSegmentAfterLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const { setValue, toggle, value } = useBoolean({ defaultValue: false });
  const pathname = usePathname();
  const pathnameWithoutLocale = getFirstPathSegmentAfterLocale(pathname);

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
      items={navigationItems}
      lang={props.lang}
      open={value}
    />
  );
};

export { SidePanelWrapper };
