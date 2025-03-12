import { ArticlesList } from '@/components/molecules';
import { dictionaries } from '@/constants/i18n';
import type { ArticlesTemplateType } from './types';

const ArticlesTemplate: ArticlesTemplateType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <ArticlesList articles={props.articles} articlesHref={props.articlesHref} lang={props.lang} title={dict.articles.latest} />
    </div>
  );
};

export { ArticlesTemplate };
