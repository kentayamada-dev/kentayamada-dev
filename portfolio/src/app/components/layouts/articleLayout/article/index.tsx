import { getDateString } from '@/utils';
import { DesktopTableOfContents } from './desktopTableOfContents';
import { MobileTableOfContents } from './mobileTableOfContents';
import type { ArticleType } from './types';

const Article: ArticleType = (props) => {
  const articleClassName = 'article';

  return (
    <>
      <aside>
        <MobileTableOfContents articleClassName={articleClassName} lang={props.lang} />
      </aside>
      <article>
        <h1 className='text-primary text-center text-3xl font-semibold sm:text-5xl'>{props.title}</h1>
        <time className='text-secondary mt-10 block text-center' dateTime={props.publishedAt.toISOString()}>
          {getDateString(props.publishedAt, props.lang)}
        </time>
        <div className='mt-20 grid [grid-template-areas:"left_right"] md:gap-x-8'>
          <section
            className={`${articleClassName} bg-primary prose max-w-none overflow-auto rounded-lg p-5 dark:prose-invert prose-figcaption:max-w-fit prose-figcaption:rounded-t-lg prose-figcaption:bg-slate-800 prose-figcaption:p-2 prose-figcaption:text-slate-300 prose-pre:rounded-lg prose-pre:rounded-tl-none prose-pre:bg-slate-800 prose-figcaption:dark:bg-slate-900 prose-figcaption:dark:text-slate-400 prose-pre:dark:bg-slate-900 sm:p-10`}
          >
            {props.content}
          </section>
          <aside className='sticky top-20 hidden self-start md:block'>
            <DesktopTableOfContents articleClassName={articleClassName} lang={props.lang} />
          </aside>
        </div>
      </article>
    </>
  );
};

export { Article };
