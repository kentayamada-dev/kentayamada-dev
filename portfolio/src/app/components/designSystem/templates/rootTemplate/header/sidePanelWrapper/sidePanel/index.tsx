import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { CopyRight } from '@/components/designSystem/atoms';
import { CrossIcon, GithubIcon, StorybookIcon, ThreeBarsIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
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
  const { closeSidePanelLabel, openSidePanelLabel } = dictionaries[props.locale].labels;

  return (
    <>
      <button aria-label={openSidePanelLabel} className='btn-icon mr-4 w-6 md:hidden' onClick={props.handleToggle} type='button'>
        <ThreeBarsIcon />
      </button>
      <Dialog onClose={props.handleToggle} open={props.isOpened}>
        <DialogBackdrop
          className='fixed inset-0 z-30 bg-black/20 backdrop-blur-xs transition-opacity duration-500 data-[closed]:opacity-0 dark:bg-slate-900/80'
          transition
        />
        <DialogPanel
          className='fixed inset-y-0 z-30 flex h-full w-80 flex-col rounded-r-lg bg-white p-5 shadow-xl duration-500 data-[closed]:-translate-x-full dark:bg-slate-800'
          transition
        >
          <button aria-label={closeSidePanelLabel} className='btn-icon ml-auto w-6' data-autofocus onClick={props.handleToggle} type='button'>
            <CrossIcon />
          </button>
          <nav className='mt-3'>
            <ul className='space-y-1'>
              {Object.entries(props.items).map(([key, { href, icon, title }]) => {
                return (
                  <li key={key}>
                    <Link href={`/${props.locale}${href}`} legacyBehavior passHref>
                      <NavItem icon={icon} isActive={props.currentPathname === href} onClick={props.handleToggle} title={title} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='border-primary mt-auto border-t'>
            <div className='mt-2' />
            <LinkItem href='/storybook' icon={StorybookIcon} title='Storybook' />
            <LinkItem href='https://github.com/kentayamada-dev/kentayamada-dev/tree/main/portfolio' icon={StyledGithubIcon} title='GitHub' />
            <div className='mt-5'>
              <CopyRight author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export { SidePanel };
