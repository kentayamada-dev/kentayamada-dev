import { Articles } from './articles';
import type { ArticlesLayoutType } from './types';

const ArticlesLayout: ArticlesLayoutType = (props) => {
  return <Articles articles={props.articles} articlesHref={props.articlesHref} lang={props.lang} />;
};

export { ArticlesLayout };
