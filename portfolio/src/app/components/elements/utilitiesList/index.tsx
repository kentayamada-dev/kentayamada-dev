import Link from 'next/link';
import { CustomImage } from '..';
import type { UtilitiesListType } from './types';

const UtilitiesList: UtilitiesListType = (props) => {
  return (
    <section>
      <h2 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h2>
      <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
        {props.utilities.map((utility) => {
          return (
            <Link
              className='bg-primary group rounded-lg p-5 hover:opacity-80'
              href={`/${props.lang}${props.utilitiesHref}/${utility.slug}`}
              key={utility.slug}
            >
              <div className='mb-2 h-32 overflow-hidden rounded-lg'>
                <CustomImage
                  alt={utility.coverImage.title}
                  sizes='400px'
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
