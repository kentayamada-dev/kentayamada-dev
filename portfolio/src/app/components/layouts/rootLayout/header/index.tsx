import Link from 'next/link';
import { Logo } from '@/components/elements';
import { GithubIcon, StorybookIcon } from '@/components/icons';
import { LocaleSwitcherWrapper } from './localeSwitcherWrapper';
import { NavItemsWrapper } from './navItemsWrapper';
import { SidePanelWrapper } from './sidePanelWrapper';
import { ThemeSwitcherWrapper } from './themeSwitcherWrapper';
import type { HeaderType } from './types';

const Header: HeaderType = (props) => {
  return (
    <header className='sticky top-0 flex justify-between border-b border-slate-900/10 bg-white/75 p-4 backdrop-blur dark:border-slate-300/10 dark:bg-slate-900/75 sm:px-8'>
      <span className='flex items-center'>
        <SidePanelWrapper lang={props.lang} />
        <Link className='w-36 text-slate-900 dark:fill-white dark:text-white' href={`/${props.lang}`} prefetch>
          <Logo />
        </Link>
      </span>
      <span className='flex space-x-4'>
        <NavItemsWrapper lang={props.lang} />
        <span className='hidden border-l border-slate-200 dark:border-slate-800 sm:block' />
        <LocaleSwitcherWrapper lang={props.lang} />
        <ThemeSwitcherWrapper />
        <a className='w-5' href='/storybook/index.html' rel='noopener noreferrer' target='_blank'>
          <StorybookIcon />
        </a>
        <a
          className='w-6 text-black dark:text-white'
          href='https://github.com/kentayamada-dev/kentayamada-dev/tree/main/portfolio'
          rel='noopener noreferrer'
          target='_blank'
        >
          <GithubIcon />
        </a>
      </span>
    </header>
  );
};

export { Header };
