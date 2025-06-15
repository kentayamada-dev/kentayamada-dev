'use client';

import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/icons';
import type { ComponentPropsWithoutRef } from 'react';
import type { JSXElementType } from '@/types/components';
import type { CodeBlockType } from './types';

// https://devicon.dev/
const getIcons = (lang: string | undefined): JSXElementType => {
  if (lang === 'javascript' || lang === 'jsx') {
    return (
      <svg fill='currentColor' viewBox='0 0 128 128'>
        <path d='M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z' />
      </svg>
    );
  }

  if (lang === 'typescript' || lang === 'tsx') {
    return (
      <svg fill='currentColor' viewBox='0 0 128 128'>
        <path d='M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z' />
      </svg>
    );
  }

  return (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path d='m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z' />
    </svg>
  );
};

const CodeBlock: CodeBlockType = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    if (isCopied) {
      return;
    }

    const codeToCopy = codeRef.current?.textContent ?? '';

    if (codeToCopy) {
      // eslint-disable-next-line no-void
      void (async (): Promise<void> => {
        await navigator.clipboard.writeText(codeToCopy.trim());
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })();
    }
  };

  return (
    <div className='overflow-hidden rounded-lg border border-slate-300 text-sm dark:border-slate-600'>
      <div className='text-md flex justify-between border-b border-slate-300 bg-slate-300/50 px-4 py-2 dark:border-slate-600 dark:bg-slate-700'>
        <div className='flex items-center gap-2'>
          <div className='size-4'>{getIcons(props.lang)}</div>
          <div>{props.title}</div>
        </div>
        <button
          className='flex size-9 items-center justify-center overflow-hidden rounded-lg p-2 hover:cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-600'
          onClick={handleCopy}
          type='button'
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div
        className='not-prose overflow-scroll py-4'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: props.html
        }}
        ref={codeRef}
      />
    </div>
  );
};

export { CodeBlock };
