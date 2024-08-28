import Image from 'next/image';
import Link from 'next/link';
import { navigationItems } from '@/constants/navigation';
import { getDateString } from '@/utils';
import type { ArticlesType } from './types';

const Articles: ArticlesType = (props) => {
  return (
    <div className='my-10 grid w-full max-w-xl grid-cols-1 gap-7 self-center px-5 sm:my-20 sm:max-w-6xl sm:grid-cols-2'>
      {props.articles.map((article) => {
        const { firstPublishedAt } = article.sys;
        const dateString = getDateString(firstPublishedAt, props.lang);

        return (
          <Link
            className='overflow-hidden rounded-2xl'
            href={`/${props.lang}${navigationItems.articles.href}/${article.slug}`}
            key={article.slug}
          >
            <article className='relative flex h-60 flex-col justify-end p-4'>
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
              <time className='text-xs text-gray-300' dateTime={firstPublishedAt}>
                {dateString}
              </time>
              <h1 className='text-xl font-semibold text-white'>{article.title}</h1>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export { Articles };
