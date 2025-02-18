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
    <header className='border-primary sticky top-0 z-10 flex justify-between border-b bg-white/75 p-4 backdrop-blur dark:bg-slate-900/75 sm:px-8'>
      <span className='flex items-center'>
        <SidePanelWrapper authorName={props.authorName} lang={props.lang} year={props.year} />
        <Link className='text-slate-900 dark:fill-white dark:text-white' href={`/${props.lang}`}>
          <Logo isJapanese={props.lang === 'ja'} />
        </Link>
      </span>
      <span className='flex space-x-4'>
        <span className='hidden md:block'>
          <NavItemsWrapper lang={props.lang} />
        </span>
        <span className='border-primary hidden border-l md:block' />
        <LocaleSwitcherWrapper lang={props.lang} />
        <ThemeSwitcherWrapper />
        <Link className='hidden w-6 md:block' href='/storybook' target='_blank'>
          <StorybookIcon />
        </Link>
        <Link
          className='hidden w-6 text-black dark:text-white md:block'
          href='https://github.com/kentayamada-dev/kentayamada-dev/tree/main/portfolio'
          target='_blank'
        >
          <GithubIcon />
        </Link>
      </span>
    </header>
  );
};

export { Header };
