import { ArticlesList } from '@/components/elements';
import { dictionaries } from '@/constants/i18n';
import type { ArticlesLayoutType } from './types';

const ArticlesLayout: ArticlesLayoutType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-5 sm:max-w-6xl sm:px-10'>
      <ArticlesList
        articles={props.articles}
        articlesHref={props.articlesHref}
        lang={props.lang}
        title={dict.articles.latest}
      />
    </div>
  );
};

export { ArticlesLayout };
