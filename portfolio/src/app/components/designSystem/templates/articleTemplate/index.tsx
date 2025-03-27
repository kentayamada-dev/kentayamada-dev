import { ArticlesList } from '@/components/designSystem/molecules';
import { Article } from './article';
import type { ArticleTemplateType } from './types';

const ArticleTemplate: ArticleTemplateType = (props) => {
  return (
    <main className='my-20 flex max-w-6xl flex-col self-center sm:mx-10'>
      <Article
        articleTitle={props.articleTitle}
        content={props.content}
        createdAt={props.createdAt}
        locale={props.locale}
        tocTitle={props.tocTitle}
        updatedAt={props.updatedAt}
      />
      <div className='mt-20 w-full px-5 sm:px-0'>
        <h2 className='text-primary mb-8 text-2xl font-extrabold sm:text-4xl'>{props.articlesListTitle}</h2>
        <ArticlesList articles={props.articles} articlesHref={props.articlesHref} locale={props.locale} />
      </div>
    </main>
  );
};

export { ArticleTemplate };
