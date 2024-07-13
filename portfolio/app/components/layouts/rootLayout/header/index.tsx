import Link from 'next/link';
import { GithubIcon } from './icons/github';
import { StorybookIcon } from './icons/storybook';
import { Logo } from './logo';
import { SidePanelWrapper } from './sidePanelWrapper';
import { ThemeSwitchWrapper } from './themeSwitchWrapper';
import type { HeaderType } from './types';

const Header: HeaderType = () => {
  return (
    <header className='sticky top-0 flex justify-between border-b border-slate-900/10 bg-white/75 p-4 backdrop-blur dark:border-slate-300/10 dark:bg-slate-900/75 sm:px-8'>
      <span className='flex items-center'>
        <SidePanelWrapper />
        <Link className='w-36 text-slate-900 dark:fill-white dark:text-white' href='/' prefetch>
          <Logo />
        </Link>
      </span>
      <span className='flex space-x-4'>
        <ThemeSwitchWrapper />
        <a
          aria-label='View storybook'
          className='w-5'
          href='/storybook/index.html'
          rel='noopener noreferrer'
          target='_blank'
        >
          <StorybookIcon />
        </a>
        <a
          aria-label='View source code on GitHub'
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
