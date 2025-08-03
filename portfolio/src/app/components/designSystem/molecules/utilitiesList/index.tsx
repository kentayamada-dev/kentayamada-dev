import Link from 'next/link';
import { EyeIcon } from '@/components/icons/eyeIcon';
import { HeartIcon } from '@/components/icons/heartIcon';
import { formatNumber } from '@/utils/formatNumber';
import type { UtilitiesListType } from './types';

const UtilitiesList: UtilitiesListType = (props) => {
  return (
    <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
      {props.utilities.map((utility) => {
        return (
          <Link className='bg-primary hover-primary rounded-lg p-3' href={utility.href} key={utility.href}>
            <article className='flex min-h-52 flex-col sm:min-h-60'>
              <h2 className='text-primary text-xl font-bold tracking-tight sm:text-2xl'>{utility.title}</h2>
              <p className='text-secondary mt-4 text-sm sm:text-base'>{utility.subtitle}</p>
              <div className='text-secondary mt-auto flex items-center justify-end gap-x-3 text-sm sm:text-base'>
                <div className='flex items-center gap-x-2'>
                  <div className='size-5'>
                    <HeartIcon />
                  </div>
                  <span>{formatNumber(utility.likeCount, props.locale)}</span>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='size-5'>
                    <EyeIcon />
                  </div>
                  <span>{formatNumber(utility.viewCount, props.locale)}</span>
                </div>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export { UtilitiesList };
