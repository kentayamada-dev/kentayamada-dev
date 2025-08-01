'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigationItems } from '@/constants/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SidePanel } from './sidePanel';
import type { SidePanelProps } from './sidePanel/types';
import type { SidePanelWrapperType } from './types';

const SidePanelWrapper: SidePanelWrapperType = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  const handleToggle: SidePanelProps['onToggle'] = () => {
    setIsOpened((prev) => {
      return !prev;
    });
  };

  useMediaQuery(() => {
    setIsOpened(false);
  });

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  const items = Object.fromEntries(
    Object.entries(navigationItems(props.locale)).filter(([_, value]) => {
      return !value.isHidden;
    })
  );

  return (
    <SidePanel
      author={props.author}
      copyrightYear={props.copyrightYear}
      currentPathname={pathname.split('/').slice(0, 3).join('/')}
      homepageUrl={props.homepageUrl}
      isOpened={isOpened}
      items={items}
      locale={props.locale}
      onToggle={handleToggle}
    />
  );
};

export { SidePanelWrapper };
