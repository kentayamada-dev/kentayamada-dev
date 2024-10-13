import Image from 'next/image';
import Link from 'next/link';
import { getDateString } from '@/utils';
import type { ArticlesListType } from './types';

const ArticlesList: ArticlesListType = (props) => {
  return (
    <section>
      <h2 className='mb-8 text-2xl font-extrabold text-slate-900 dark:text-slate-200 sm:text-4xl'>{props.title}</h2>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {props.articles.map((article) => {
          const { publishedAt } = article.sys;

          return (
            <Link
              className='group overflow-hidden rounded-2xl'
              href={`/${props.lang}${props.articlesHref}/${article.slug}`}
              key={article.slug}
            >
              <article className='relative flex flex-col justify-end pt-[100%]'>
                <Image
                  alt={article.coverImage.title}
                  blurDataURL='data:image/gif;base64,R0lGODlhAQABAPAAAPDz9////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                  className='inset-0 -z-10 duration-300 group-hover:scale-110'
                  fill
                  placeholder='blur'
                  quality={100}
                  sizes='300px'
                  src={article.coverImage.url}
                  style={{
                    objectFit: 'cover'
                  }}
                />
                <div className='absolute inset-0 -z-10 bg-gradient-to-t from-gray-800 via-gray-800/40' />
                <div className='absolute m-3 flex flex-col space-y-3'>
                  <time className='text-xs text-gray-300' dateTime={publishedAt}>
                    {getDateString(new Date(publishedAt), props.lang)}
                  </time>
                  <h1 className='line-clamp-3 text-sm font-semibold text-white sm:text-lg'>{article.title}</h1>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export { ArticlesList };
