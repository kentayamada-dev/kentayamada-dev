import Link from 'next/link';
import { getDateString } from '@/utils';
import { CustomImage } from '..';
import type { ArticlesListType } from './types';

const ArticlesList: ArticlesListType = (props) => {
  return (
    <section>
      <h2 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h2>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {props.articles.map((article) => {
          const { publishedAt } = article.sys;

          return (
            <Link className='group overflow-hidden rounded-lg' href={`/${props.lang}${props.articlesHref}/${article.slug}`} key={article.slug}>
              <article className='relative flex flex-col justify-end pt-[100%]'>
                <div className='absolute inset-0 -z-10 duration-300 group-hover:scale-110'>
                  <CustomImage
                    alt={article.coverImage.title}
                    sizes='300px'
                    src={article.coverImage.url}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className='absolute inset-0 -z-10 bg-gradient-to-t from-slate-800 via-slate-800/40' />
                <div className='absolute bottom-0 m-3 flex flex-col space-y-3'>
                  <time className='text-xs text-slate-300' dateTime={publishedAt}>
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
