import Link from 'next/link';
import { Share } from '@/components/designSystem/molecules';
import { ClockHistoryIcon, ClockIcon, HashTagIcon } from '@/components/icons';
import { getDateString, isSameDate } from '@/utils';
import { LikeButtonWrapper } from '../likeButtonWrapper';
import { DesktopTableOfContents } from './desktopTableOfContents';
import { MobileTableOfContents } from './mobileTableOfContents';
import type { ArticleType } from './types';

const ARTICLE_CLASS_NAME = 'article';

const Article: ArticleType = (props) => {
  const updatedAtISO = props.updatedAt.toISOString();
  const createdAtISO = props.createdAt.toISOString();
  const isDateSame = isSameDate(props.updatedAt, props.createdAt);

  return (
    <>
      <aside>
        <MobileTableOfContents articleClassName={ARTICLE_CLASS_NAME} locale={props.locale} title={props.tocTitle} />
      </aside>
      <article className='flex flex-col items-center'>
        <h1 className='text-primary text-center text-3xl font-semibold tracking-tight sm:max-w-5xl sm:text-5xl'>{props.articleTitle}</h1>
        <div className='text-secondary mt-10 flex justify-center gap-x-5 text-sm'>
          {!isDateSame && (
            <div className='flex items-center gap-x-1'>
              <span className='size-5'>
                <ClockHistoryIcon />
              </span>
              <time dateTime={updatedAtISO} itemProp='dateModified'>
                {getDateString(props.updatedAt, props.locale)}
              </time>
            </div>
          )}
          <div className='flex items-center gap-x-1'>
            <span className='size-5'>
              <ClockIcon />
            </span>
            <time dateTime={createdAtISO} itemProp='datePublished'>
              {getDateString(props.createdAt, props.locale)}
            </time>
          </div>
        </div>
        <div className='mt-20 grid [grid-template-areas:"left_right"] md:gap-x-8'>
          <div className='max-w-none overflow-auto'>
            <div className='bg-primary rounded-none p-7 sm:rounded-lg sm:p-10'>
              <div className='mb-3 flex gap-3'>
                {props.topics.map((topic) => {
                  return (
                    <Link
                      className='flex items-center gap-1 rounded-full border border-slate-300 p-1.5 hover:bg-slate-200/80 dark:border-slate-600 hover:dark:bg-slate-600/25'
                      href={topic.path}
                      key={topic.path}
                    >
                      <div className='size-5 rounded-full bg-slate-300/50 p-1 text-blue-500 dark:bg-slate-700'>
                        <HashTagIcon isBold />
                      </div>
                      <span className='pr-1 text-sm text-black dark:text-white'>{topic.title}</span>
                    </Link>
                  );
                })}
              </div>
              <section className={`${ARTICLE_CLASS_NAME} prose dark:prose-invert max-w-none`}>{props.content}</section>
            </div>
            <div className='mt-5 flex justify-between px-3 sm:p-0 md:hidden'>
              <LikeButtonWrapper likeCount={props.likeCount} locale={props.locale} onCountLike={props.onCountLike} />
              <Share locale={props.locale} title={props.articleTitle} url={props.url} />
            </div>
          </div>
          <aside className='sticky top-20 hidden self-start md:block'>
            <DesktopTableOfContents articleClassName={ARTICLE_CLASS_NAME} title={props.tocTitle} />
            <div className='mt-16 flex justify-between px-3 sm:p-0'>
              <LikeButtonWrapper likeCount={props.likeCount} locale={props.locale} onCountLike={props.onCountLike} />
              <Share locale={props.locale} title={props.articleTitle} url={props.url} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
};

export { Article };
