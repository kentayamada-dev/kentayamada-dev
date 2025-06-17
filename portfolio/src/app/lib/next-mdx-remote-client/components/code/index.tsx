import { codeToHtml } from 'shiki';
import { CodeBlock } from './codeBlock';
import type { CodeType } from './types';

const Code: CodeType = async (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, className, copyCodeLabel, 'data-language': lang, 'data-title': title, ...rest } = props;
  const hasDataLanguage = Boolean(lang);

  // eslint-disable-next-line no-undefined
  if (hasDataLanguage && lang !== undefined && title !== undefined) {
    const html = await codeToHtml(children.slice(0, -1), {
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

    return <CodeBlock copyCodeLabel={copyCodeLabel} html={html} lang={lang} title={title} />;
  }

  return (
    <code className='not-prose rounded-lg bg-slate-300/50 p-1 font-sans text-sm dark:bg-slate-700' {...rest}>
      {children}
    </code>
  );
};

export { Code };
