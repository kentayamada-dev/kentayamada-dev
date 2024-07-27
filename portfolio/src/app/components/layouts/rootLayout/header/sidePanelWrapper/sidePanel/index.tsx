import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { CrossIcon, ThreeBarsIcon } from '@/components/icons';
import { NavItem } from './navItem';
import type { SidePanelType } from './types';

const SidePanel: SidePanelType = (props) => {
  return (
    <>
      <button className='btn-icon mr-4 w-6 sm:hidden' onClick={props.handleToggle} type='button'>
        <ThreeBarsIcon />
      </button>
      <Dialog onClose={props.handleToggle} open={props.open}>
        <DialogBackdrop
          className='fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 data-[closed]:opacity-0 dark:bg-slate-900/80'
          transition
        />
        <DialogPanel
          className='fixed inset-y-0 flex h-full w-80 flex-col rounded-r-xl bg-white p-5 shadow-xl duration-500 data-[closed]:-translate-x-full dark:bg-slate-800'
          transition
        >
          <button className='btn-icon ml-auto w-6' data-autofocus onClick={props.handleToggle} type='button'>
            <CrossIcon />
          </button>
          <nav>
            <ul>
              {props.items.map((item) => {
                return (
                  <li key={`/${props.lang}/${item.href}`}>
                    <Link href={`/${props.lang}/${item.href}`} legacyBehavior passHref prefetch>
                      <NavItem
                        active={props.currentPathname === item.href}
                        icon={item.icon}
                        onClick={props.handleToggle}
                        title={item.title}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export { SidePanel };
