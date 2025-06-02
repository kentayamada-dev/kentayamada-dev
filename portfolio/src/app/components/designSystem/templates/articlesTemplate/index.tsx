import { ArticleLink } from '@/components/designSystem/molecules';
import type { ArticlesTemplateType } from './types';

const ArticlesTemplate: ArticlesTemplateType = (props) => {
  return (
    <main className='w-full self-center px-5 py-10 sm:max-w-7xl sm:px-10 sm:py-20'>
      <h1 className='text-primary mb-8 text-3xl font-semibold sm:text-4xl'>{props.title}</h1>
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
    </main>
  );
};

export { ArticlesTemplate };
