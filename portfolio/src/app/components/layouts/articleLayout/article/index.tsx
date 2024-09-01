import { tocbotOptions } from '@/lib/tocbot';
import { getDateString } from '@/utils';
import { TableOfContents } from './tableOfContents';
import type { ArticleType } from './types';

const Article: ArticleType = (props) => {
  return (
    <article>
      <h1 className='text-center text-3xl font-semibold text-slate-900 dark:text-white sm:text-5xl'>{props.title}</h1>
      <time
        className='mt-10 block text-center text-slate-600 dark:text-slate-400'
        dateTime={props.publishedAt.toISOString()}
      >
        {getDateString(props.publishedAt, props.lang)}
      </time>
      <div className='mt-20 grid [grid-template-areas:"left_right"] md:gap-x-8'>
        <section
          className={`${tocbotOptions.contentSelectorName} prose max-w-none overflow-auto bg-slate-100 p-5 dark:prose-invert dark:bg-slate-800 sm:p-10`}
        >
          {props.content}
        </section>
        <aside className='sticky top-20 hidden max-h-[calc(100vh-8rem)] w-80 self-start overflow-auto bg-slate-100 dark:bg-slate-800 md:block'>
          <TableOfContents lang={props.lang} />
        </aside>
      </div>
    </article>
  );
};

export { Article };
