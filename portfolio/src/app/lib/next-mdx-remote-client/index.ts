import { evaluate } from 'next-mdx-remote-client/rsc';
import { createElement } from 'react';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { headingLevels } from '@/constants/toc';
import { A, Code, H, Hr, Input, Li, Pre, Section, Span, Ul } from './components';
import type { EvaluateResult, MDXComponents, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import type { ComponentType, HTMLAttributes } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType } from '@/types/components';

const options: MDXRemoteOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          keepBackground: false
        }
      ]
    ],
    remarkPlugins: [remarkMath, remarkGfm]
  }
};

const getMDXComponents = (locale: LocaleKeyType): MDXComponents => {
  const components = headingLevels.reduce<Record<string, ComponentType<HTMLAttributes<HTMLHeadingElement>>>>((acc, heading) => {
    acc[heading] = H(heading, locale);

    return acc;
  }, {});

  return {
    ...components,
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
  };
};

const getEvaluateResult = async (source: string, locale: LocaleKeyType): Promise<EvaluateResult> => {
  return evaluate({
    components: getMDXComponents(locale),
    options,
    source
  });
};

export { getEvaluateResult };
