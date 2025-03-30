import { ClockHistoryIcon, ClockIcon } from '@/components/icons';
import { getDateString } from '@/utils';
import { DesktopTableOfContents } from './desktopTableOfContents';
import { MobileTableOfContents } from './mobileTableOfContents';
import type { ArticleType } from './types';

const ARTICLE_CLASS_NAME = 'article';

const Article: ArticleType = (props) => {
  const updatedAtISO = props.updatedAt.toISOString();
  const createdAtISO = props.createdAt.toISOString();

  return (
    <>
      <aside>
        <MobileTableOfContents articleClassName={ARTICLE_CLASS_NAME} title={props.tocTitle} />
      </aside>
      <article>
        <h1 className='text-primary text-center text-3xl font-semibold sm:text-5xl'>{props.articleTitle}</h1>
        <div className='text-secondary mt-10 flex justify-center space-x-5 text-sm'>
          {updatedAtISO !== createdAtISO && (
            <div className='flex items-center space-x-1'>
              <span className='size-4'>
                <ClockHistoryIcon />
              </span>
              <time dateTime={updatedAtISO} itemProp='dateModified'>
                {getDateString(props.updatedAt, props.locale)}
              </time>
            </div>
          )}
          <div className='flex items-center space-x-1'>
            <span className='size-4'>
              <ClockIcon />
            </span>
            <time dateTime={createdAtISO} itemProp='datePublished'>
              {getDateString(props.createdAt, props.locale)}
            </time>
          </div>
        </div>
        <div className='mt-20 grid [grid-template-areas:"left_right"] md:gap-x-8'>
          <section
            className={`${ARTICLE_CLASS_NAME} bg-primary prose dark:prose-invert prose-figcaption:max-w-fit prose-figcaption:rounded-t-lg prose-figcaption:bg-slate-800 prose-figcaption:p-2 prose-figcaption:text-slate-300 prose-pre:rounded-lg prose-pre:rounded-tl-none prose-pre:bg-slate-800 prose-figcaption:dark:bg-slate-900 prose-figcaption:dark:text-slate-400 prose-pre:dark:bg-slate-900 max-w-none overflow-auto rounded-lg p-5 sm:p-10`}
          >
            {props.content}
          </section>
          <aside className='sticky top-20 hidden self-start md:block'>
            <DesktopTableOfContents articleClassName={ARTICLE_CLASS_NAME} title={props.tocTitle} />
          </aside>
        </div>
      </article>
    </>
  );
};

export { Article };
