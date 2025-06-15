import { codeToHtml } from 'shiki';
import { CodeBlock } from './codeBlock';
import type { CodeType } from './types';

const Code: CodeType = async (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, className, 'data-language': lang, 'data-title': title, ...rest } = props;
  const hasDataLanguage = Boolean(lang);

  // eslint-disable-next-line no-undefined
  if (hasDataLanguage && lang !== undefined && title !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    const html = await codeToHtml(children as string, {
      lang,
      themes: {
        dark: 'github-dark',
        light: 'github-light'
      },
      transformers: [
        {
          pre(node): void {
            delete node.properties['style'];
            node.properties['tabindex'] = '-1';
          }
        }
      ]
    });

    return <CodeBlock html={html} lang={lang} title={title} />;
  }

  return (
    <code className='not-prose rounded-lg bg-slate-300/50 p-1 text-sm dark:bg-slate-700' {...rest}>
      {children}
    </code>
  );
};

export { Code };
