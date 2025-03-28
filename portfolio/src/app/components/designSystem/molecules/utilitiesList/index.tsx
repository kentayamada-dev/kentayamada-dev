import Link from 'next/link';
import { CustomImage } from '@/components/designSystem/atoms';
import type { UtilitiesListType } from './types';

const UtilitiesList: UtilitiesListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.utilities.map((utility) => {
        const { coverImage, slug, subtitle, title } = utility;

        return (
          <Link className='bg-primary group hover-primary h-80 rounded-lg p-5' href={`${props.utilitiesHref}/${slug}`} key={slug}>
            <div className='mb-2 h-32 overflow-hidden rounded-lg'>
              <CustomImage
                alt={coverImage.title}
                sizes='400px'
                src={coverImage.url}
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>
            <h2 className='line-clamp-2 text-lg font-semibold text-slate-900 dark:text-slate-200'>{title}</h2>
            <p className='mt-2 line-clamp-4 text-sm text-slate-600 dark:text-slate-400'>{subtitle}</p>
          </Link>
        );
      })}
    </div>
  );
};

export { UtilitiesList };
