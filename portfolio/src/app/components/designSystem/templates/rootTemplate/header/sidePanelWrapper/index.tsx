'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navigationItems } from '@/constants/navigation';
import { useMediaQuery } from '@/hooks';
import { getFirstPathSegmentAfterLocale } from '@/utils';
import { SidePanel } from './sidePanel';
import type { SidePanelProps } from './sidePanel/types';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();
  const pathnameWithoutLocale = getFirstPathSegmentAfterLocale(pathname);

  const handleToggle: SidePanelProps['handleToggle'] = () => {
    setIsOpened((prev) => {
      return !prev;
    });
  };

  useMediaQuery(() => {
    setIsOpened(false);
  });

  return (
    <SidePanel
      author={props.author}
      copyrightYear={props.copyrightYear}
      currentPathname={pathnameWithoutLocale}
      handleToggle={handleToggle}
      homepageUrl={props.homepageUrl}
      isOpened={isOpened}
      items={navigationItems(props.locale)}
      locale={props.locale}
    />
  );
};

export { SidePanelWrapper };
