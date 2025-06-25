import Link from 'next/link';
import { GithubIcon, KyIcon, StorybookIcon } from '@/components/icons';
import { dictionaries } from '@/constants/i18n';
import { GITHUB_URL, STORYBOOK_URL } from '@/constants/navigation';
import { LocaleSwitcherWrapper } from './localeSwitcherWrapper';
import { NavItemsWrapper } from './navItemsWrapper';
import { SidePanelWrapper } from './sidePanelWrapper';
import { ThemeSwitcherWrapper } from './themeSwitcherWrapper';
import type { HeaderType } from './types';

const Header: HeaderType = (props) => {
  const { githubLinkLabel, globalNavLabel, homeLinkLabel, storybookLinkLabel } = dictionaries[props.locale].labels;

  return (
    <header className='border-primary sticky top-0 z-10 flex items-center justify-between border-b bg-white/75 px-5 py-2 backdrop-blur-sm sm:px-10 dark:bg-slate-900/75'>
      <span className='flex items-center'>
        <SidePanelWrapper author={props.author} copyrightYear={props.copyrightYear} homepageUrl={props.homepageUrl} locale={props.locale} />
        <Link
          aria-label={homeLinkLabel}
          className='w-10 text-slate-900 dark:fill-white dark:text-white'
          href={`/${props.locale}`}
          title={homeLinkLabel}
        >
          <KyIcon />
        </Link>
      </span>
      <span className='gap-x-reverse flex items-center gap-x-2'>
        <span className='hidden md:block'>
          <NavItemsWrapper locale={props.locale} navLabel={globalNavLabel} />
        </span>
        <span className='border-primary mx-2.5 hidden h-7 border-l md:block' />
        <LocaleSwitcherWrapper locale={props.locale} />
        <ThemeSwitcherWrapper locale={props.locale} />
        <Link
          aria-label={storybookLinkLabel}
          className='hover-secondary hidden size-10 items-center justify-center overflow-hidden rounded-lg p-2 md:flex'
          href={STORYBOOK_URL}
          target='_blank'
          title={storybookLinkLabel}
        >
          <StorybookIcon />
        </Link>
        <Link
          aria-label={githubLinkLabel}
          className='hover-secondary hidden size-10 items-center justify-center overflow-hidden rounded-lg p-2 text-black md:flex dark:text-white'
          href={GITHUB_URL}
          target='_blank'
          title={githubLinkLabel}
        >
          <GithubIcon />
        </Link>
      </span>
    </header>
  );
};

export { Header };
