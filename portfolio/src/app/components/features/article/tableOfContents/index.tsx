'use client';

import { useEffect } from 'react';
import tocbot from 'tocbot';
import { dictionaries } from '@/constants/i18n';
import { tocbotOptions } from '@/lib/tocbot';
import type { TableOfContentsType } from './types';

const TableOfContents: TableOfContentsType = (props) => {
  const dict = dictionaries[props.lang];

  useEffect(() => {
    tocbot.init({
      contentSelector: `.${tocbotOptions.contentSelectorName}`,
      headingSelector: tocbotOptions.headingSelector,
      headingsOffset: 70,
      scrollSmoothOffset: -70,
      tocSelector: `.${tocbotOptions.tocSelectorName}`
    });

    return (): void => {
      tocbot.destroy();
    };
  }, []);

  return (
    <div className='p-5'>
      <div className='mb-5 text-lg font-semibold text-slate-900 dark:text-white'>{dict.toc}</div>
      <div className={tocbotOptions.tocSelectorName} />
    </div>
  );
};

export { TableOfContents };
