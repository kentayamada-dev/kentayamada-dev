import Link from 'next/link';
import { EyeIcon, HeartIcon } from '@/components/icons';
import { formatNumber, getDateString } from '@/utils';
import type { ArticleListType } from './types';

const ArticleList: ArticleListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.articles.map((article) => {
        return (
          <Link className='bg-primary hover-primary flex rounded-lg p-5' href={article.href} key={article.href}>
            <article className='flex min-h-60 flex-col'>
              <h2 className='text-primary text-2xl font-bold'>{article.title}</h2>
              <p className='text-secondary mt-2 text-base'>{article.subtitle}</p>
              <div className='mt-auto flex flex-col gap-y-2 pt-5'>
                <div className='flex flex-wrap gap-x-2 gap-y-1'>
                  {article.topics.map((topic) => {
                    return <span className='text-sm text-blue-500' key={topic}>{`#${topic}`}</span>;
                  })}
                </div>
                <div className='text-secondary flex justify-between text-base'>
                  <time dateTime={article.createdAt.toISOString()} itemProp='datePublished'>
                    {getDateString(article.createdAt, props.locale)}
                  </time>
                  <div className='flex items-center gap-x-3'>
                    <div className='flex items-center gap-x-2'>
                      <div className='size-5'>
                        <HeartIcon />
                      </div>
                      <span>{formatNumber(article.likeCount, props.locale)}</span>
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <div className='size-5'>
                        <EyeIcon />
                      </div>
                      <span>{formatNumber(article.viewCount, props.locale)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export { ArticleList };
