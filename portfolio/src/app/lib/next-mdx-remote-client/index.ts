import { evaluate } from 'next-mdx-remote-client/rsc';
import { createElement } from 'react';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { visit } from 'unist-util-visit';
import { dictionaries } from '@/constants/i18n';
import { headingLevels } from '@/constants/toc';
import { A, Code, H, Hr, Input, Li, Section, Span, Ul } from './components';
import type { EvaluateResult, MDXComponents, MDXRemoteOptions } from 'next-mdx-remote-client/rsc';
import type { ComponentType, HTMLAttributes } from 'react';
import type { LocaleKeyType } from '@/constants/i18n/types';
import type { JSXElementType } from '@/types/components';

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
const rehypeUnwrapPre = () => {
  return (tree: any): void => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children.length === 1 && node.children[0].tagName === 'code') {
        parent.children.splice(index, 1, ...node.children);
      }
    });
  };
};

const remarkCodeTitles = () => {
  return (tree: any): void => {
    visit(tree, 'code', (node) => {
      const { lang } = node;

      node.data = {};
      node.data.hProperties = {};
      node.data.hProperties['data-title'] = node.meta?.match(/title="(?<temp1>[^"]+)"/u)[1] ?? lang;
      node.data.hProperties['data-language'] = lang;
    });
  };
};
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

const options: MDXRemoteOptions = {
  mdxOptions: {
    rehypePlugins: [rehypeKatex, rehypeUnwrapPre],
    remarkPlugins: [remarkMath, remarkGfm, remarkCodeTitles]
  }
};

const getMDXComponents = (locale: LocaleKeyType): MDXComponents => {
  const { copyCodeLabel, wordWrapLabel } = dictionaries[locale].labels;

  const components = headingLevels.reduce<Record<string, ComponentType<HTMLAttributes<HTMLHeadingElement>>>>((acc, heading) => {
    acc[heading] = H(heading, locale);

    return acc;
  }, {});

  return {
    ...components,
    a: A,
    code: (props): JSXElementType => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return createElement(Code, { ...props, copyCodeLabel, wordWrapLabel });
    },
    hr: Hr,
    input: Input,
    li: Li,
    section: Section,
    span: Span,
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
