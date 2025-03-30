'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigationItems } from '@/constants/navigation';
import { useMediaQuery } from '@/hooks';
import { getFirstPathSegmentAfterLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();
  const pathnameWithoutLocale = getFirstPathSegmentAfterLocale(pathname);

  const handleToggle: VoidFunction = () => {
    setIsOpened((prev) => {
      return !prev;
    });
  };

  useMediaQuery(() => {
    setIsOpened(false);
  });

  return (
    <SidePanel
      authorName={props.authorName}
      currentPathname={pathnameWithoutLocale}
      handleToggle={handleToggle}
      href={props.href}
      isOpened={isOpened}
      items={navigationItems}
      locale={props.locale}
      year={props.year}
    />
  );
};

export { SidePanelWrapper };
