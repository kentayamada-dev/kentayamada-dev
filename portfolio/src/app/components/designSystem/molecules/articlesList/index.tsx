import Link from 'next/link';
import { CustomImage } from '@/components/designSystem/atoms';
import { getDateString } from '@/utils';
import type { ArticlesListType } from './types';

const ArticlesList: ArticlesListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.articles.map((article) => {
        const { coverImage, createdAt, slug, title } = article;

        return (
          <Link className='group overflow-hidden rounded-lg' href={`${props.articlesHref}/${article.slug}`} key={slug}>
            <article className='relative flex flex-col justify-end pt-[100%]'>
              <div className='absolute inset-0 -z-10 duration-300 group-hover:scale-110'>
                <CustomImage
                  alt={coverImage.title}
                  sizes='300px'
                  src={coverImage.url}
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div className='absolute inset-0 -z-10 bg-gradient-to-t from-slate-800 via-slate-800/40' />
              <div className='absolute bottom-0 m-3 flex flex-col space-y-3'>
                <time className='text-xs text-slate-300' dateTime={createdAt.toISOString()} itemProp='datePublished'>
                  {getDateString(createdAt, props.locale)}
                </time>
                <h2 className='line-clamp-3 text-sm font-semibold text-white sm:text-lg'>{title}</h2>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export { ArticlesList };
