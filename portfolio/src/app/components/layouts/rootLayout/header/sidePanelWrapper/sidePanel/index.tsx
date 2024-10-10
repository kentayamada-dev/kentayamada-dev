import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { CopyRight } from '@/components/elements';
import { CrossIcon, GithubIcon, StorybookIcon, ThreeBarsIcon } from '@/components/icons';
import { LinkItem } from './linkItem';
import { NavItem } from './navItem';
import type { SidePanelType } from './types';
import type { JSXElementType } from '@/types/components';

const StyledGithubIcon = (): JSXElementType => {
  return (
    <span className='text-black dark:text-white'>
      <GithubIcon />
    </span>
  );
};

// eslint-disable-next-line react/no-multi-comp
const SidePanel: SidePanelType = (props) => {
  return (
    <>
      <button className='btn-icon mr-4 w-6 md:hidden' onClick={props.handleToggle} type='button'>
        <ThreeBarsIcon />
      </button>
      <Dialog onClose={props.handleToggle} open={props.open}>
        <DialogBackdrop
          className='fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-500 data-[closed]:opacity-0 dark:bg-slate-900/80'
          transition
        />
        <DialogPanel
          className='fixed inset-y-0 z-30 flex h-full w-80 flex-col rounded-r-xl bg-white p-5 shadow-xl duration-500 data-[closed]:-translate-x-full dark:bg-slate-800'
          transition
        >
          <button className='btn-icon ml-auto w-6' data-autofocus onClick={props.handleToggle} type='button'>
            <CrossIcon />
          </button>
          <nav>
            <ul>
              {Object.entries(props.items).map(([key, item]) => {
                return (
                  <li key={key}>
                    <Link href={`/${props.lang}${item.href}`} legacyBehavior passHref>
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
          <div className='mt-auto border-t border-gray-900/10 dark:border-white/10'>
            <div className='mt-2' />
            <LinkItem href='/storybook' icon={StorybookIcon} title='Storybook' />
            <LinkItem
              href='https://github.com/kentayamada-dev/kentayamada-dev/tree/main/portfolio'
              icon={StyledGithubIcon}
              title='GitHub'
            />
            <div className='mt-5'>
              <CopyRight lang={props.lang} />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export { SidePanel };
