import Link from 'next/link';
import { Logo } from '@/components/designSystem/atoms';
import { GithubIcon, StorybookIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { LocaleSwitcherWrapper } from './localeSwitcherWrapper';
import { NavItemsWrapper } from './navItemsWrapper';
import { SidePanelWrapper } from './sidePanelWrapper';
import { ThemeSwitcherWrapper } from './themeSwitcherWrapper';
import type { HeaderType } from './types';

const Header: HeaderType = (props) => {
  const { githubLinkLabel, homeLinkLabel, storybookLinkLabel } = dictionaries[props.locale].labels;

  return (
    <header className='border-primary sticky top-0 z-10 flex justify-between border-b bg-white/75 px-4 py-4 backdrop-blur-sm md:px-8 dark:bg-slate-900/75'>
      <span className='flex items-center'>
        <SidePanelWrapper authorName={props.authorName} locale={props.locale} year={props.year} />
        <Link aria-label={homeLinkLabel} className='text-slate-900 dark:fill-white dark:text-white' href={`/${props.locale}`}>
          <Logo isJapanese={props.locale === 'ja'} />
        </Link>
      </span>
      <span className='flex space-x-4 space-x-reverse md:space-x-4'>
        <span className='hidden md:block'>
          <NavItemsWrapper locale={props.locale} />
        </span>
        <span className='border-primary hidden border-l md:block' />
        <LocaleSwitcherWrapper locale={props.locale} />
        <ThemeSwitcherWrapper locale={props.locale} />
        <Link aria-label={storybookLinkLabel} className='hidden w-6 md:block' href='/storybook' target='_blank'>
          <StorybookIcon />
        </Link>
        <Link
          aria-label={githubLinkLabel}
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
