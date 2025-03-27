'use client';

import { useRef } from 'react';
import { TableOfContents } from '../tableOfContents';
import type { DesktopTableOfContentsType } from './types';

const DesktopTableOfContents: DesktopTableOfContentsType = (props) => {
  const tocContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='bg-primary w-80 rounded-lg p-5'>
      <div className='text-primary mb-2 text-lg font-semibold'>{props.title}</div>
      <div className='max-h-[calc(100vh-12rem)] overflow-auto p-1' ref={tocContainerRef}>
        <TableOfContents articleClassName={props.articleClassName} tocContainerRef={tocContainerRef} />
      </div>
    </div>
  );
};

export { DesktopTableOfContents };
