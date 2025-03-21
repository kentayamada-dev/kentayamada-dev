import { notFound } from 'next/navigation';
import { CustomImage } from '@/components/atoms';
import { contentfulType } from '@/constants/contentful';
import { dictionaries } from '@/constants/i18n';
import { navigationItems } from '@/constants/navigation';
import { getAbout, getCareers, getMetadata } from '@/lib/graphql-request';
import { getMetadataObject } from '@/lib/nextjs';
import { getPeriod } from '@/utils';
import type { ArticlesPageType, GenerateMetadataType } from '@/types/components';

const generateMetadata: GenerateMetadataType = async (props) => {
  const { lang } = await props.params;
  const { coverImage, description, sys, title } = await getMetadata(lang, contentfulType.metadata.kentaYamada, notFound);

  return getMetadataObject(
    'profile',
    navigationItems.home.href,
    lang,
    description,
    title,
    { alt: coverImage.title, url: coverImage.url },
    new Date(sys.publishedAt),
    new Date(sys.firstPublishedAt),
    false
  );
};

const Page: ArticlesPageType = async (props) => {
  const { lang } = await props.params;
  const { coverImage, subtitle, title } = await getAbout(lang, notFound);
  const dict = dictionaries[(await props.params).lang];
  const careers = await getCareers(lang);

  return (
    <div className='m-5 grid max-w-6xl gap-4 self-center md:grid-cols-5'>
      <div className='order-2 md:order-1 md:col-span-3 md:row-span-2'>
        <h1 className='text-primary text-5xl font-bold tracking-tight'>{title}</h1>
        <p className='text-secondary mt-10 text-lg'>{subtitle}</p>
      </div>
      <div className='order-1 md:order-2 md:col-span-2'>
        <div className='mb-2 h-96'>
          <CustomImage
            alt={coverImage.title}
            priority
            sizes='400px'
            src={coverImage.url}
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <section className='bg-primary order-3 rounded-lg p-5 md:col-span-2'>
        <h2 className='text-primary mb-4 text-2xl font-semibold'>{dict.about.career}</h2>
        <ol className='flex flex-col space-y-4'>
          {careers.map((career) => {
            return (
              <li className='flex items-center gap-4' key={career.organization}>
                <div className='size-8 flex-none overflow-hidden rounded-full'>
                  <CustomImage
                    alt={career.logo.title}
                    sizes='100px'
                    src={career.logo.url}
                    style={{
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <dl className='flex flex-auto flex-wrap gap-x-2'>
                  <dt className='sr-only'>{dict.about.organization}</dt>
                  <dd className='text-primary w-full text-base font-medium sm:text-base'>{career.organization}</dd>
                  <dt className='sr-only'>{dict.about.role}</dt>
                  <dd className='text-secondary text-xs sm:text-sm'>{career.role}</dd>
                  <dt className='sr-only'>{dict.about.period}</dt>
                  <dd className='text-secondary ml-auto text-xs sm:text-sm'>
                    {getPeriod(new Date(career.startDate), career.endDate ? new Date(career.endDate) : null, dict.about.present)}
                  </dd>
                </dl>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

export { Page as default, generateMetadata };
