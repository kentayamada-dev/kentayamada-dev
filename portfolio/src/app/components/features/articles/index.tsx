import Image from 'next/image';
import Link from 'next/link';
import { navigationItems } from '@/constants/navigation';
import { getDateString } from '@/utils';
import type { ArticlesType } from './types';

const Articles: ArticlesType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.articles.map((article) => {
        const { publishedAt } = article.sys;

        return (
          <Link
            className='overflow-hidden rounded-2xl'
            href={`/${props.lang}${navigationItems.articles.href}/${article.slug}`}
            key={article.slug}
          >
            <article className='relative flex flex-col justify-end pt-[100%]'>
              <Image
                alt={article.coverImage.title}
                blurDataURL='data:image/gif;base64,R0lGODlhAQABAPAAAPDz9////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                className='inset-0 -z-10'
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
  );
};

export { Articles };
