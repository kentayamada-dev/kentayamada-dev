import { getDateString } from '@/utils';
import type { ArticleType } from './types';

const Article: ArticleType = (props) => {
  return (
    <article className='flex flex-col gap-y-3'>
      <div className='flex items-center gap-x-2'>
        <div className='h-3 w-0.5 rounded-full bg-blue-500' />
        <time className='text-secondary text-xs' dateTime={props.createdAt.toISOString()} itemProp='datePublished'>
          {getDateString(props.createdAt, props.locale)}
        </time>
      </div>
      <h2 className='text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100'>{props.title}</h2>
      <p className='text-sm'>{props.description}</p>
      <div className='flex items-center text-sm text-blue-500'>{props.readArticle}</div>
    </article>
  );
};

export { Article };
