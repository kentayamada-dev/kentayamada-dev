import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import rehypeReact, { type Options } from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { tocbotOptions } from '@/lib/tocbot';
import { getDateString } from '@/utils';
import { TableOfContents } from './tableOfContents';
import type { ArticleType } from './types';

const Article: ArticleType = (props) => {
  const option = {
    Fragment,
    /* eslint-disable no-restricted-syntax, react/no-unstable-nested-components, no-undefined */
    components: {
      h1: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h1 id={id}>{children}</h1>;
      },
      h2: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h2 id={id}>{children}</h2>;
      },
      h3: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h3 id={id}>{children}</h3>;
      },
      h4: ({ children }) => {
        const id = typeof children === 'string' ? children : undefined;

        return <h4 id={id}>{children}</h4>;
      }
    },
    /* eslint-enable no-restricted-syntax, react/no-unstable-nested-components, no-undefined  */

    // @ts-expect-error type mismatch
    jsx,
    // @ts-expect-error type mismatch
    jsxs
  } as const satisfies Options;
  const content = unified()
    .use(remarkParse)
    .use(remarkRehype)
    // @ts-expect-error type mismatch
    .use(rehypeReact, option)
    .process(props.content)
    .then((file) => {
      return file.result;
    });

  const dateString = getDateString(props.publishedAt, props.lang);

  return (
    <article className='flex flex-col items-center'>
      <h1 className='mt-24 text-4xl font-semibold text-slate-900 dark:text-white'>{props.title}</h1>
      <time className='mt-10 block text-slate-600 dark:text-slate-400' dateTime={props.publishedAt}>
        {dateString}
      </time>
      <div className='mx-10 my-20 grid max-w-6xl [grid-template-areas:"left_right"] sm:gap-x-8'>
        <section
          className={`${tocbotOptions.contentSelectorName} prose max-w-none overflow-auto bg-slate-100 p-10 dark:prose-invert dark:bg-slate-800`}
        >
          {content}
        </section>
        <aside className='sticky top-20 hidden max-h-[calc(100vh-8rem)] w-80 self-start overflow-auto bg-slate-100 dark:bg-slate-800 sm:block'>
          <TableOfContents lang={props.lang} />
        </aside>
      </div>
    </article>
  );
};

export { Article };
