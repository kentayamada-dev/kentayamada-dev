import { ArticlesList } from '@/components/designSystem/molecules';
import type { ArticlesTemplateType } from './types';

const ArticlesTemplate: ArticlesTemplateType = (props) => {
  return (
    <main className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <h1 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.title}</h1>
      <ArticlesList articles={props.articles} articlesHref={props.articlesHref} locale={props.locale} />
    </main>
  );
};

export { ArticlesTemplate };
