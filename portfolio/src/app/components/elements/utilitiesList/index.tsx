import Image from 'next/image';
import Link from 'next/link';
import type { UtilitiesListType } from './types';

const UtilitiesList: UtilitiesListType = (props) => {
  return (
    <section>
      <h2 className='mb-8 text-2xl font-extrabold text-slate-900 dark:text-slate-200 sm:text-4xl'>{props.title}</h2>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {props.utilities.map((utility) => {
          return (
            <Link
              className='group rounded-2xl bg-slate-100 p-5 hover:opacity-80 dark:bg-slate-800'
              href={`/${props.lang}${props.utilitiesHref}/${utility.slug}`}
              key={utility.slug}
            >
              <div className='relative mb-2 h-32'>
                <Image
                  alt={utility.coverImage.title}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
                  fill
                  placeholder='blur'
                  quality={100}
                  sizes='200px'
                  src={utility.coverImage.url}
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-200'>{utility.title}</h3>
              <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>{utility.subtitle}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export { UtilitiesList };
