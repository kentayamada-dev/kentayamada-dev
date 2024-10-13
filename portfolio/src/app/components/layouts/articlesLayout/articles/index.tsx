import { ArticlesList } from '@/components/elements';
import { dictionaries } from '@/constants/i18n';
import type { ArticlesType } from './types';

const Articles: ArticlesType = (props) => {
  const dict = dictionaries[props.lang];

  return (
    <div className='my-20 w-full max-w-xl self-center px-10 sm:max-w-6xl'>
      <ArticlesList
        articles={props.articles}
        articlesHref={props.articlesHref}
        lang={props.lang}
        title={dict.articles.latest}
      />
    </div>
  );
};

export { Articles };
