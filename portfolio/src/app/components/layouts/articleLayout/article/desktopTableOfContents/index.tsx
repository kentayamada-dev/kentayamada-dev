'use client';

import { useRef } from 'react';
import { dictionaries } from '@/constants/i18n';
import { TableOfContents } from '../tableOfContents';
import type { DesktopTableOfContentsType } from './types';

const DesktopTableOfContents: DesktopTableOfContentsType = (props) => {
  const dict = dictionaries[props.lang];
  const tocContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='w-80 bg-slate-100 p-5 dark:bg-slate-800'>
      <div className='mb-5 text-lg font-semibold text-slate-900 dark:text-white'>{dict.articles.toc}</div>
      <div className='max-h-[calc(100vh-12rem)] overflow-auto p-1' ref={tocContainerRef}>
        <TableOfContents
          articleClassName={props.articleClassName}
          lang={props.lang}
          tocContainerRef={tocContainerRef}
        />
      </div>
    </div>
  );
};

export { DesktopTableOfContents };
