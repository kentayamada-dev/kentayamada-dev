import { CustomImage } from '@/components/designSystem/atoms';
import { ArticlesList } from './articlesList';
import { Intro } from './intro';
import { WhackMole } from './whackMole';
import type { HomeTemplateType } from './types';

const HomeTemplate: HomeTemplateType = (props) => {
  return (
    <main className='my-10 grid max-w-7xl gap-x-10 gap-y-10 self-center px-5 sm:my-20 sm:px-10 md:grid-cols-5 md:gap-y-16'>
      <div className='order-2 md:order-1 md:col-span-3'>
        <Intro paragraph={props.paragraph} subtitle={props.subtitle} title={props.title} />
      </div>
      <div className='order-3 md:order-3 md:col-span-3'>
        <ArticlesList articles={props.articles} locale={props.locale} readArticle={props.readArticle} />
      </div>
      <div className='order-1 self-center md:order-2 md:col-span-2'>
        <div className='h-40 sm:h-56'>
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
      <div className='order-4 md:order-4 md:col-span-2'>
        <WhackMole />
      </div>
    </main>
  );
};

export { HomeTemplate };
