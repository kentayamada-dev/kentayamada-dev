'use client';

import { useRef, useState } from 'react';
import { CheckIcon } from '@/components/icons/checkIcon';
import { CodeWrapIcon } from '@/components/icons/codeWrapIcon';
import { CopyIcon } from '@/components/icons/copyIcon';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import type { ComponentPropsWithoutRef } from 'react';
import type { JSXElementType } from '@/types/components';
import type { CodeBlockType } from './types';

// https://react-icons.github.io/react-icons/icons/bi/
const getIcons = (lang: string | undefined): JSXElementType => {
  if (lang === 'javascript' || lang === 'jsx') {
    return (
      <svg fill='currentColor' stroke='currentColor' viewBox='0 0 24 24'>
        <g strokeWidth={0}>
          <path d='M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z' />
        </g>
      </svg>
    );
  }

  if (lang === 'typescript' || lang === 'tsx') {
    return (
      <svg fill='currentColor' stroke='currentColor' viewBox='0 0 24 24'>
        <g strokeWidth={0}>
          <path d='M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3zm-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.71 1.71 0 0 1-.67.74 3 3 0 0 1-1 .39 5.81 5.81 0 0 1-1.2.12 7 7 0 0 1-1.23-.11 4.52 4.52 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.41 3.41 0 0 0 1 .54 3.06 3.06 0 0 0 1.13.2 2.58 2.58 0 0 0 .6-.06 1.47 1.47 0 0 0 .42-.17.75.75 0 0 0 .25-.25.69.69 0 0 0-.06-.74 1.24 1.24 0 0 0-.35-.33 3.12 3.12 0 0 0-.53-.3l-.67-.28a3.57 3.57 0 0 1-1.37-1 2 2 0 0 1-.46-1.33 2.16 2.16 0 0 1 .24-1.06 2.09 2.09 0 0 1 .66-.71 2.88 2.88 0 0 1 1-.42 5.11 5.11 0 0 1 1.19-.13 7 7 0 0 1 1.09.07 4.53 4.53 0 0 1 .88.23v1.65a2.42 2.42 0 0 0-.42-.24 3.58 3.58 0 0 0-.49-.17 3 3 0 0 0-.49-.1 2.45 2.45 0 0 0-.46 0 2.29 2.29 0 0 0-.56.06 1.54 1.54 0 0 0-.43.16.78.78 0 0 0-.26.25.63.63 0 0 0-.09.33.62.62 0 0 0 .1.35 1.19 1.19 0 0 0 .3.29 2.15 2.15 0 0 0 .46.28l.63.28a6.56 6.56 0 0 1 .84.42 2.65 2.65 0 0 1 .64.49 1.79 1.79 0 0 1 .42.63 2.48 2.48 0 0 1 .14.85 2.68 2.68 0 0 1-.25 1.08z' />
        </g>
      </svg>
    );
  }

  return (
    <svg fill='currentColor' stroke='currentColor' viewBox='0 0 24 24'>
      <g strokeWidth={0}>
        <path d='M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6.414 15.707 5 14.293 7.293 12 5 9.707l1.414-1.414L10.121 12l-3.707 3.707zM19 16h-7v-2h7v2z' />
      </g>
    </svg>
  );
};

const CodeBlock: CodeBlockType = (props) => {
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(false);
  const [isCopied, copy] = useCopyToClipboard();
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await copy(codeRef.current?.textContent?.trim() ?? '');
    })();
  };

  const handleWordWrap: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    setIsWordWrapEnabled((prev) => {
      return !prev;
    });
  };

  const modifyHtml = (html: string): string => {
    if (isWordWrapEnabled) {
      return html.replace(/<pre/gu, '<pre style="white-space: pre-wrap; overflow-wrap: anywhere;"');
    }

    return html.replace(/<pre style="white-space: pre-wrap; overflow-wrap: anywhere;"/gu, '<pre');
  };

  return (
    <div className='overflow-hidden rounded-lg border border-slate-300 text-sm dark:border-slate-600'>
      <div className='flex justify-between border-b border-slate-300 bg-slate-300/50 px-4 py-1.5 dark:border-slate-600 dark:bg-slate-700'>
        <div className='flex items-center gap-2'>
          <div className='size-6'>{getIcons(props.lang)}</div>
          <div>{props.title}</div>
        </div>
        <div className='flex gap-3'>
          <button
            aria-label={props.wordWrapLabel}
            className={`${isWordWrapEnabled && 'text-blue-500'} flex size-8 items-center justify-center overflow-hidden rounded-lg p-1.5 hover:cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600`}
            onClick={handleWordWrap}
            title={props.wordWrapLabel}
            type='button'
          >
            <CodeWrapIcon />
          </button>
          <button
            aria-label={props.copyCodeLabel}
            className='flex size-8 items-center justify-center overflow-hidden rounded-lg p-1.5 hover:cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600'
            onClick={handleCopy}
            title={props.copyCodeLabel}
            type='button'
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
      <div
        className='not-prose overflow-scroll py-4'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: modifyHtml(props.html)
        }}
        ref={codeRef}
      />
    </div>
  );
};

export { CodeBlock };
