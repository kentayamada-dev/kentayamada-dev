'use client';

import { Transition, TransitionChild } from '@headlessui/react';
import { useRef, useState } from 'react';
import { CrossIcon, TableOfContentsIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { screenOptions } from '@/constants/screens';
import { useMediaQuery } from '@/hooks';
import { TableOfContents } from '../tableOfContents';
import type { MobileTableOfContentsType } from './types';

const MobileTableOfContents: MobileTableOfContentsType = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const dict = dictionaries[props.lang];

  const closeDrawer: VoidFunction = () => {
    setIsOpen(false);
  };

  const openDrawer: VoidFunction = () => {
    setIsOpen(true);
  };

  useMediaQuery({
    callback: () => {
      setIsOpen(false);
    },
    query: `(min-width: ${screenOptions.md}px)`
  });

  return (
    <>
      <button
        className='fixed bottom-5 right-5 z-10 inline-flex size-14 rounded-full bg-sky-500 p-2.5 text-white dark:bg-sky-800 sm:right-16 md:hidden'
        onClick={openDrawer}
        type='button'
      >
        <TableOfContentsIcon />
      </button>
      <Transition show={isOpen}>
        <div className='fixed bottom-0 right-5 z-20 sm:right-16'>
          <TransitionChild
            enter='transform transition ease-in-out duration-300 sm:duration-500'
            enterFrom='translate-y-full'
            enterTo='translate-y-0'
            leave='transform transition ease-in-out duration-300 sm:duration-500'
            leaveFrom='translate-y-0'
            leaveTo='translate-y-full'
          >
            <div className='w-72 rounded-t-xl bg-white p-5 shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-slate-300/10'>
              <div className='flex items-center justify-between pb-3'>
                <div className='text-lg font-semibold text-slate-900 dark:text-white'>{dict.articles.toc}</div>
                <button className='btn-icon ml-auto w-6' onClick={closeDrawer} type='button'>
                  <CrossIcon />
                </button>
              </div>
              <div className='max-h-72 overflow-auto' ref={tocContainerRef}>
                <TableOfContents
                  articleClassName={props.articleClassName}
                  lang={props.lang}
                  tocContainerRef={tocContainerRef}
                />
              </div>
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </>
  );
};

export { MobileTableOfContents };
