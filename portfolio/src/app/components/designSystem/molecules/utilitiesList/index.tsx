import Link from 'next/link';
import type { UtilitiesListType } from './types';

const UtilitiesList: UtilitiesListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.utilities.map((utility) => {
        return (
          <Link className='bg-primary hover-primary rounded-lg p-3' href={utility.href} key={utility.href}>
            <article className='flex flex-col gap-y-3'>
              <h2 className='text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>{utility.title}</h2>
              <p className='text-sm'>{utility.subtitle}</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export { UtilitiesList };
