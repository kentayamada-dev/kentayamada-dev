import { ArticlesList } from '@/components/designSystem/molecules';
import type { ArticlesTemplateType } from './types';

const ArticlesTemplate: ArticlesTemplateType = (props) => {
  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{props.title}</h1>
      <ArticlesList articles={props.articles} articlesHref={props.articlesHref} locale={props.locale} />
    </main>
  );
};

export { ArticlesTemplate };
