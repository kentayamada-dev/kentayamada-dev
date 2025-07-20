import { codeToHtml } from 'shiki';
import { isDefined } from '@/typeGuards';
import { CodeBlock } from './codeBlock';
import type { CodeType } from './types';

const Code: CodeType = async (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { children, className, copyCodeLabel, 'data-language': lang, 'data-title': title, wordWrapLabel, ...rest } = props;
  const hasDataLanguage = Boolean(lang);

  if (hasDataLanguage && isDefined(lang) && isDefined(title)) {
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

    return <CodeBlock copyCodeLabel={copyCodeLabel} html={html} lang={lang} title={title} wordWrapLabel={wordWrapLabel} />;
  }

  return (
    <code className='not-prose rounded-lg bg-slate-300/50 p-1 font-mono text-sm dark:bg-slate-700' {...rest}>
      {children}
    </code>
  );
};

export { Code };
