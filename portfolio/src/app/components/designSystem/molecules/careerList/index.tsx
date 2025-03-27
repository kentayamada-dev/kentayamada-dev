import { CustomImage } from '@/components/designSystem/atoms';
import { getPeriod } from '@/utils';
import type { CareerListType } from './types';

const CareerList: CareerListType = (props) => {
  return (
    <section className='bg-primary order-3 rounded-lg p-5 md:col-span-2'>
      <h2 className='text-primary mb-4 text-2xl font-semibold'>{props.careerListTitle}</h2>
      <ol className='flex flex-col space-y-4'>
        {props.careers.map((career) => {
          const { endDate, logo, organization, role, startDate } = career;

          return (
            <li className='flex items-center gap-4' key={organization}>
              <div className='size-8 flex-none overflow-hidden rounded-full'>
                <CustomImage
                  alt={logo.title}
                  sizes='100px'
                  src={logo.url}
                  style={{
                    objectFit: 'cover'
                  }}
                />
              </div>
              <dl className='flex flex-auto flex-wrap gap-x-2'>
                <dt className='sr-only'>{props.labels.organization}</dt>
                <dd className='text-primary w-full text-base font-medium sm:text-base'>{organization}</dd>
                <dt className='sr-only'>{props.labels.role}</dt>
                <dd className='text-secondary text-xs sm:text-sm'>{role}</dd>
                <dt className='sr-only'>{props.labels.period}</dt>
                <dd className='text-secondary ml-auto text-xs sm:text-sm'>
                  {getPeriod(new Date(startDate), new Date(endDate), props.labels.present)}
                </dd>
              </dl>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export { CareerList };
