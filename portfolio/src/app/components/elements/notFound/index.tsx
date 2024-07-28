import Link from 'next/link';
import { NotFoundAnimation } from '../notFoundAnimation';
import type { NotFoundType } from './types';

const NotFound: NotFoundType = (props) => {
  return (
    <div className='flex flex-col items-center'>
      <p className='mt-11 text-2xl text-slate-700 dark:text-slate-400'>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <span className='h-96'>
        <NotFoundAnimation />
      </span>
      <Link
        className='flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto'
        href={`/${props.lang}`}
      >
        Go back home
      </Link>
    </div>
  );
};

export { NotFound };
