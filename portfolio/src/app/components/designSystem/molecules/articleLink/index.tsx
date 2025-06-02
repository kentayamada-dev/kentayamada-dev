import Link from 'next/link';
import { EyeIcon } from '@/components/icons';
import { getDateString } from '@/utils';
import type { ArticleLinkType } from './types';

const ArticleLink: ArticleLinkType = (props) => {
  return (
    <Link className='bg-primary hover-primary block h-full w-full rounded-lg p-3' href={props.href}>
      <article className='flex h-full flex-col gap-y-4'>
        <h2 className='text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>{props.title}</h2>
        <p className='text-secondary text-sm/6'>{props.description}</p>
        <div className='mt-auto flex flex-col gap-y-2'>
          <div className='flex flex-wrap gap-x-2 gap-y-1'>
            {props.topics.map((topic) => {
              return <span className='text-sm text-blue-500' key={topic}>{`#${topic}`}</span>;
            })}
          </div>
          <div className='text-secondary flex justify-between text-sm'>
            <time className='text-secondary' dateTime={props.createdAt.toISOString()} itemProp='datePublished'>
              {getDateString(props.createdAt, props.locale)}
            </time>
            <div className='flex items-center gap-x-2'>
              <div className='size-5'>
                <EyeIcon />
              </div>
              <span>{props.views}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export { ArticleLink };
