import Link from 'next/link';
import { NotFoundAnimation } from '@/components/designSystem/atoms';
import type { NotFoundType } from './types';

const NotFound: NotFoundType = (props) => {
  return (
    <main className='flex flex-col items-center px-5'>
      <span className='w-52 sm:w-96'>
        <NotFoundAnimation />
      </span>
      <h1 className='text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-slate-200'>{props.message.main}</h1>
      <h2 className='mt-6 text-sm text-slate-700 dark:text-slate-400'>{props.message.sub}</h2>
      <Link
        className='mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-blue-500 px-6 font-semibold text-white sm:w-auto'
        href={props.homeHref}
      >
        {props.label}
      </Link>
    </main>
  );
};

export { NotFound };
