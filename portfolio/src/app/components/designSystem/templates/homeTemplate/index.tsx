import { CustomImage } from '@/components/designSystem/atoms';
import { Intro } from './intro';
import type { HomeTemplateType } from './types';

const HomeTemplate: HomeTemplateType = (props) => {
  return (
    <main className='grid max-w-7xl gap-4 self-center px-5 sm:mt-20 sm:px-10 md:grid-cols-5'>
      <div className='order-2 md:order-1 md:col-span-3 md:row-span-2 md:pr-20'>
        <Intro paragraph={props.paragraph} subtitle={props.subtitle} title={props.title} />
      </div>
      <div className='order-1 md:order-2 md:col-span-2'>
        <div className='mb-2 h-40 sm:h-56'>
          <CustomImage
            alt={props.coverImage.title}
            priority
            sizes='300px'
            src={props.coverImage.url}
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
    </main>
  );
};

export { HomeTemplate };
