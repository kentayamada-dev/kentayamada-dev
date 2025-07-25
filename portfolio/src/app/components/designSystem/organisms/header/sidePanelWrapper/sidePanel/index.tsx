import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import { CopyRight } from '@/components/designSystem/atoms';
import { CrossIcon, GithubIcon, StorybookIcon, ThreeBarsIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { GITHUB_URL, STORYBOOK_URL } from '@/constants/navigation';
import { LinkItem } from './linkItem';
import { NavItem } from './navItem';
import type { JSXElementType } from '@/types/components';
import type { SidePanelType } from './types';

const StyledGithubIcon = (): JSXElementType => {
  return (
    <span className='text-black dark:text-white'>
      <GithubIcon />
    </span>
  );
};

// eslint-disable-next-line react/no-multi-comp
const SidePanel: SidePanelType = (props) => {
  const { closeSidePanelLabel, globalNavLabel, openSidePanelLabel } = dictionaries[props.locale].labels;

  return (
    <>
      <button
        aria-label={openSidePanelLabel}
        className='btn-icon mr-4 size-8 md:hidden'
        onClick={props.onToggle}
        title={openSidePanelLabel}
        type='button'
      >
        <ThreeBarsIcon />
      </button>
      <Dialog onClose={props.onToggle} open={props.isOpened}>
        <DialogBackdrop
          className='fixed inset-0 z-30 bg-black/20 backdrop-blur-xs transition-opacity duration-500 data-[closed]:opacity-0 dark:bg-slate-900/80'
          transition
        />
        <DialogPanel
          className='fixed inset-y-0 z-30 flex h-full w-80 flex-col rounded-r-lg bg-white p-5 text-sm shadow-xl duration-500 data-[closed]:-translate-x-full sm:text-base dark:bg-slate-800'
          transition
        >
          <button
            aria-label={closeSidePanelLabel}
            className='btn-icon ml-auto size-8'
            data-autofocus
            onClick={props.onToggle}
            title={closeSidePanelLabel}
            type='button'
          >
            <CrossIcon />
          </button>
          <nav aria-label={globalNavLabel} className='mt-3'>
            <ul className='space-y-1'>
              {Object.entries(props.items).map(([key, { href, icon, title }]) => {
                return (
                  <li
                    className={`${props.currentPathname === href ? 'text-blue-500' : 'link-primary'} hover-secondary rounded-lg p-2 font-medium hover:cursor-pointer`}
                    key={key}
                  >
                    <Link href={href} legacyBehavior passHref>
                      <NavItem icon={icon} onClick={props.onToggle} title={title} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='border-primary mt-auto border-t'>
            <div className='mt-2' />
            <LinkItem href={STORYBOOK_URL} icon={StorybookIcon} title='Storybook' />
            <LinkItem href={GITHUB_URL} icon={StyledGithubIcon} title='GitHub' />
            <div className='mt-5 text-center'>
              <CopyRight author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export { SidePanel };
