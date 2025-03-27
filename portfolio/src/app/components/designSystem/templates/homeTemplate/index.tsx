import { CustomImage } from '@/components/designSystem/atoms';
import { CareerList } from '@/components/designSystem/molecules';
import { dictionaries } from '@/constants/i18n';
import type { HomeTemplateType } from './types';

const HomeTemplate: HomeTemplateType = (props) => {
  const aboutDict = dictionaries[props.locale].about;

  return (
    <div className='m-5 grid max-w-6xl gap-4 self-center md:grid-cols-5'>
      <div className='order-2 md:order-1 md:col-span-3 md:row-span-2'>
        <h1 className='text-primary text-5xl font-bold tracking-tight'>{props.title.main}</h1>
        <p className='text-secondary mt-10 text-lg'>{props.title.sub}</p>
      </div>
      <div className='order-1 md:order-2 md:col-span-2'>
        <div className='mb-2 h-96'>
          <CustomImage
            alt={props.coverImage.title}
            priority
            sizes='400px'
            src={props.coverImage.url}
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <CareerList
        careerListTitle={props.careerListTitle}
        careers={props.careers}
        labels={{
          organization: aboutDict.organization,
          period: aboutDict.period,
          present: aboutDict.present,
          role: aboutDict.role
        }}
      />
    </div>
  );
};

export { HomeTemplate };
