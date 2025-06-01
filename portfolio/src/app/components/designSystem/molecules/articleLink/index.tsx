import Link from 'next/link';
import { getDateString } from '@/utils';
import type { ArticleLinkType } from './types';

const ArticleLink: ArticleLinkType = (props) => {
  return (
    <Link className='bg-primary hover-primary block h-full w-full rounded-lg p-3' href={props.href}>
      <article className='flex flex-col gap-y-3'>
        <div className='flex items-center gap-x-2'>
          <div className='h-3 w-0.5 rounded-full bg-blue-500' />
          <time className='text-secondary text-xs' dateTime={props.createdAt.toISOString()} itemProp='datePublished'>
            {getDateString(props.createdAt, props.locale)}
          </time>
        </div>
        <h2 className='text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>{props.title}</h2>
        <p className='text-secondary line-clamp-[7] text-sm'>{props.description}</p>
      </article>
    </Link>
  );
};

export { ArticleLink };
