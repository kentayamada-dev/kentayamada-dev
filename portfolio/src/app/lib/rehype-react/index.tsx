import Link from 'next/link';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { YoutubeEmbed } from '@/components/elements';
import { LinkIcon } from '@/components/icons';
import { headingLevels } from '@/constants/toc';
import { isString } from '@/typeGuards';
import type { Options } from 'rehype-react';
import type { HeadingLevelType } from '@/constants/toc/types';
import type { JSXElementType } from '@/types/components';

const getRehypeReactOptions = (): Options => {
  const headings = headingLevels.reduce(
    (acc, level) => {
      acc[level] = 0;

      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
    {} as Record<HeadingLevelType, number>
  );

  const getHeadingId = (heading: HeadingLevelType): string => {
    headings[heading] += 1;

    return `${heading}-${headings[heading]}`;
  };

  /* eslint-disable no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment */
  const createHeadingComponent = (heading: HeadingLevelType) => {
    return ({ children }: React.HTMLAttributes<HTMLHeadingElement>): JSXElementType => {
      const headingId = getHeadingId(heading);
      const Tag = heading;

      return (
        <Tag className='group relative flex items-center' id={headingId}>
          <a
            className='absolute -left-5 block size-5 text-sky-500 opacity-0 focus:opacity-100 group-hover:opacity-100'
            href={`#${headingId}`}
          >
            <LinkIcon />
          </a>
          {children}
        </Tag>
      );
    };
  };
  /* eslint-enable no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment */

  const components = headingLevels.reduce<
    Record<string, React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>>
  >((acc, heading) => {
    acc[heading] = createHeadingComponent(heading);

    return acc;
  }, {});

  /* eslint-disable id-length, no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment  */
  return {
    Fragment,
    components: {
      ...components,
      a: ({ children, ...rest }): JSXElementType | null => {
        if (!isString(rest.href)) {
          return null;
        }

        if (rest.href.includes('https://youtu.be/') || rest.href.includes('https://www.youtube.com/watch?v=')) {
          const videoId =
            rest.href.split('https://youtu.be/')[1]?.split('&')[0] ??
            rest.href.split('https://www.youtube.com/watch?v=')[1]?.split('&')[0] ??
            '';

          return <YoutubeEmbed videoId={videoId} />;
        }

        if (rest.href.includes('#user-content-fnref-')) {
          return (
            <Link className='text-sky-500 no-underline hover:underline' href={rest.href}>
              {children}
            </Link>
          );
        }

        if (rest.href.includes('#user-content-fn-')) {
          return (
            <Link className='text-sky-500 no-underline hover:underline' href={rest.href} id={rest.id}>
              {`[${children?.toString()}]`}
            </Link>
          );
        }

        return (
          <Link className='text-sky-500' href={rest.href} target='_blank'>
            {children}
          </Link>
        );
      },
      code: ({ className, ...rest }): JSXElementType | null => {
        // @ts-expect-error type mismatch
        const hasDataLanguage = Boolean(rest['data-language']);

        return (
          <code
            className={`${className} not-prose ${!hasDataLanguage && 'rounded-md bg-slate-300/50 p-1 dark:bg-slate-700'}`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
          />
        );
      },
      hr: ({ className, ...rest }): JSXElementType | null => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <hr {...rest} className={`${className} my-7`} />;
      },
      input: ({ type, ...rest }): JSXElementType | null => {
        if (type === 'checkbox') {
          return (
            <>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <input className='peer hidden' type={type} {...rest} />
              <div className="inline-flex size-5 items-center justify-center rounded-md border-2 border-slate-400 text-sm peer-checked:border-none peer-checked:bg-sky-500 peer-checked:before:block peer-checked:before:text-white peer-checked:before:content-['✔']" />
            </>
          );
        }

        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <input type={type} {...rest} />
        );
      },
      li: ({ className, ...rest }): JSXElementType | null => {
        if (className === 'task-list-item') {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <li className={`${className} flex list-none items-center gap-x-2`} {...rest} />;
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <li className={className} {...rest} />;
      },
      pre: (preProps): JSXElementType | null => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <pre {...preProps} tabIndex={-1} />;
      },
      section: ({ className, ...rest }): JSXElementType | null => {
        if (className === 'footnotes') {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <section {...rest} className={`${className} section-with-h2`} />;
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <section {...rest} className={className} />;
      },
      ul: ({ className, ...rest }): JSXElementType | null => {
        if (className === 'contains-task-list') {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <ul className={`${className} p-0`} {...rest} />;
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ul className={className} {...rest} />;
      }
    },
    // @ts-expect-error type mismatch
    jsx,
    // @ts-expect-error type mismatch
    jsxs
  };
  /* eslint-enable id-length, no-restricted-syntax, react/no-unstable-nested-components, react/display-name, react/function-component-definition, react/no-multi-comp, react/destructuring-assignment  */
};

export { getRehypeReactOptions };
