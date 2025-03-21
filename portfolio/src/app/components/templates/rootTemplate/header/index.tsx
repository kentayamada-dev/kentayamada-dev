import Link from 'next/link';
import { Logo } from '@/components/atoms';
import { GithubIcon, StorybookIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { LocaleSwitcherWrapper } from './localeSwitcherWrapper';
import { NavItemsWrapper } from './navItemsWrapper';
import { SidePanelWrapper } from './sidePanelWrapper';
import { ThemeSwitcherWrapper } from './themeSwitcherWrapper';
import type { HeaderType } from './types';

const Header: HeaderType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <header className='border-primary sticky top-0 z-10 flex justify-between border-b bg-white/75 px-4 py-4 backdrop-blur-sm md:px-8 dark:bg-slate-900/75'>
      <span className='flex items-center'>
        <SidePanelWrapper authorName={props.authorName} lang={props.lang} year={props.year} />
        <Link aria-label={dict.myName} className='text-slate-900 dark:fill-white dark:text-white' href={`/${props.lang}`}>
          <Logo isJapanese={props.lang === 'ja'} />
        </Link>
      </span>
      <span className='flex space-x-4 space-x-reverse md:space-x-4'>
        <span className='hidden md:block'>
          <NavItemsWrapper lang={props.lang} />
        </span>
        <span className='border-primary hidden border-l md:block' />
        <LocaleSwitcherWrapper lang={props.lang} />
        <ThemeSwitcherWrapper lang={props.lang} />
        <Link aria-label={dict.labels.storybookLinkLabel} className='hidden w-6 md:block' href='/storybook' target='_blank'>
          <StorybookIcon />
        </Link>
        <Link
          aria-label={dict.labels.githubLinkLabel}
          className='hidden w-6 text-black md:block dark:text-white'
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
