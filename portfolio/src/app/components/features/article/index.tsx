import { tocbotOptions } from '@/lib/tocbot';
import { getDateString } from '@/utils';
import { TableOfContents } from './tableOfContents';
import type { ArticleType } from './types';

const Article: ArticleType = (props) => {
  return (
    <article className='flex flex-col items-center'>
      <h1 className='mt-24 text-4xl font-semibold text-slate-900 dark:text-white'>{props.title}</h1>
      <time className='mt-10 block text-slate-600 dark:text-slate-400' dateTime={props.publishedAt.toISOString()}>
        {getDateString(props.publishedAt, props.lang)}
      </time>
      <div className='mx-10 my-20 grid max-w-6xl [grid-template-areas:"left_right"] sm:gap-x-8'>
        <section
          className={`${tocbotOptions.contentSelectorName} prose max-w-none overflow-auto bg-slate-100 p-10 dark:prose-invert dark:bg-slate-800`}
        >
          {props.content}
        </section>
        <aside className='sticky top-20 hidden max-h-[calc(100vh-8rem)] w-80 self-start overflow-auto bg-slate-100 dark:bg-slate-800 sm:block'>
          <TableOfContents lang={props.lang} />
        </aside>
      </div>
    </article>
  );
};

export { Article };
