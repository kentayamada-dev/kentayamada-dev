import { createElement } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { A, Code, H, Hr, Input, Li, Pre, Section, Span, Ul } from '@/components/rehype-react';
import { headingLevels } from '@/constants/toc';
import type { ComponentType, HTMLAttributes } from 'react';
import type { Options } from 'rehype-react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType } from '@/types/components';

const getRehypeReactOptions = (locale: LocaleKeyType): Options => {
  const components = headingLevels.reduce<Record<string, ComponentType<HTMLAttributes<HTMLHeadingElement>>>>((acc, heading) => {
    acc[heading] = H(heading, locale);

    return acc;
  }, {});

  return {
    Fragment,
    components: {
      ...components,
      // eslint-disable-next-line id-length
      a: A,
      code: Code,
      hr: Hr,
      input: Input,
      li: Li,
      pre: Pre,
      section: Section,
      span: (props): JSXElementType => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return createElement(Span, { ...props, locale });
      },
      ul: Ul
    },
    // @ts-expect-error type mismatch
    jsx,
    // @ts-expect-error type mismatch
    jsxs
  };
};

export { getRehypeReactOptions };
