import Link from 'next/link';
import { dictionaries } from '@/constants/i18n';
import { NotFoundAnimation } from '../notFoundAnimation';
import type { NotFoundType } from './types';

const NotFound: NotFoundType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='flex flex-col items-center px-5'>
      <span className='w-52 sm:w-96'>
        <NotFoundAnimation />
      </span>
      <h1 className='text-2xl font-extrabold text-slate-900 dark:text-slate-200 sm:text-3xl'>{props.mainMessage}</h1>
      <h2 className='mt-6 text-sm text-slate-700 dark:text-slate-400'>{props.subMessage}</h2>
      <Link
        className='mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-sky-500 px-6 font-semibold text-white hover:bg-sky-400 sm:w-auto'
        href={`/${props.lang}`}
      >
        {dict.nav.backToHome}
      </Link>
    </div>
  );
};

export { NotFound };
