'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigationItems } from '@/constants/navigation';
import { screenOptions } from '@/constants/screens';
import { useMediaQuery } from '@/hooks';
import { getFirstPathSegmentAfterLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathnameWithoutLocale = getFirstPathSegmentAfterLocale(pathname);
  const handleToggle: VoidFunction = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  useMediaQuery({
    callback: () => {
      setIsOpen(false);
    },
    query: `(min-width: ${screenOptions.md}px)`
  });

  return (
    <SidePanel
      authorName={props.authorName}
      currentPathname={pathnameWithoutLocale}
      handleToggle={handleToggle}
      items={navigationItems}
      lang={props.lang}
      open={isOpen}
      year={props.year}
    />
  );
};

export { SidePanelWrapper };
