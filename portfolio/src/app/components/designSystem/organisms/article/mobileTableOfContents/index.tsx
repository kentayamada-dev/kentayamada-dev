'use client';

import { Transition, TransitionChild } from '@headlessui/react';
import { useState } from 'react';
import { CrossIcon, TableOfContentsIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { useMediaQuery } from '@/hooks';
import { TableOfContents } from '../tableOfContents';
import type { ComponentPropsWithoutRef } from 'react';
import type { MobileTableOfContentsType } from './types';

const MobileTableOfContents: MobileTableOfContentsType = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const { closeTocLabel, openTocLabel } = dictionaries[props.locale].labels;

  const handleCloseDrawer: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    setIsOpened(false);
  };

  const handleOpenDrawer: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    setIsOpened(true);
  };

  useMediaQuery(() => {
    setIsOpened(false);
  });

  return (
    <>
      <button
        aria-label={openTocLabel}
        className='fixed right-5 bottom-5 z-10 inline-flex size-14 rounded-full bg-blue-500 p-2.5 text-white hover:cursor-pointer sm:right-16 md:hidden'
        onClick={handleOpenDrawer}
        title={openTocLabel}
        type='button'
      >
        <TableOfContentsIcon />
      </button>
      <Transition show={isOpened}>
        <div className='fixed right-5 bottom-0 z-20 sm:right-16'>
          <TransitionChild
            enter='transform transition ease-in-out duration-300 sm:duration-500'
            enterFrom='translate-y-full'
            enterTo='translate-y-0'
            leave='transform transition ease-in-out duration-300 sm:duration-500'
            leaveFrom='translate-y-0'
            leaveTo='translate-y-full'
          >
            <div className='w-72 rounded-t-lg bg-white p-5 shadow-xl ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-slate-300/10'>
              <div className='flex items-center justify-between px-1 pb-3'>
                <div className='text-primary text-lg font-semibold'>{props.title}</div>
                <button
                  aria-label={closeTocLabel}
                  className='btn-icon ml-auto size-8'
                  onClick={handleCloseDrawer}
                  title={closeTocLabel}
                  type='button'
                >
                  <CrossIcon />
                </button>
              </div>
              <div className='max-h-72 overflow-auto'>
                <TableOfContents articleClassName={props.articleClassName} label={props.title} />
              </div>
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </>
  );
};

export { MobileTableOfContents };
