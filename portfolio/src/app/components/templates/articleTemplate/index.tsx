import { ArticlesList } from '@/components/molecules';
import { dictionaries } from '@/constants/i18n';
import { Article } from './article';
import type { ArticleTemplateType } from './types';

const ArticleTemplate: ArticleTemplateType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 flex max-w-6xl flex-col self-center sm:mx-10'>
      <Article content={props.content} lang={props.lang} publishedAt={props.publishedAt} title={props.title} />
      <div className='mt-20 w-full px-5 sm:px-0'>
        <ArticlesList articles={props.articles} articlesHref={props.articlesHref} lang={props.lang} title={dict.articles.recommend} />
      </div>
    </div>
  );
};

export { ArticleTemplate };
