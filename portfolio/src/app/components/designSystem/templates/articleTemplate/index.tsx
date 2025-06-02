import { ArticleLink } from '@/components/designSystem/molecules';
import { Article } from './article';
import type { ArticleTemplateType } from './types';

const ArticleTemplate: ArticleTemplateType = (props) => {
  return (
    <main className='my-20 flex max-w-7xl flex-col self-center sm:mx-10'>
      <Article
        articleTitle={props.articleTitle}
        content={props.content}
        createdAt={props.createdAt}
        locale={props.locale}
        tocTitle={props.tocTitle}
        topics={props.topics}
        updatedAt={props.updatedAt}
      />
      <div className='mt-20 w-full px-5 sm:px-0'>
        <h2 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{props.articlesListTitle}</h2>
        <div className='grid h-[inherit] grid-cols-1 gap-10 self-center sm:grid-cols-2 md:grid-cols-3'>
          {props.articles.map((article) => {
            return (
              <ArticleLink
                createdAt={article.createdAt}
                description={article.description}
                href={article.href}
                key={article.href}
                locale={props.locale}
                title={article.title}
                topics={article.topics}
                views={article.views}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export { ArticleTemplate };
