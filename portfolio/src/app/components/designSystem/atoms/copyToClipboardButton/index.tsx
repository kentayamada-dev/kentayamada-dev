'use client';

import { CheckIcon, LinkIcon } from '@/components/icons';
import { useCopyToClipboard } from '@/hooks';
import type { ComponentPropsWithoutRef } from 'react';
import type { CopyToClipboardButtonType } from './types';

const CopyToClipboardButton: CopyToClipboardButtonType = (props) => {
  const [isCopied, copy] = useCopyToClipboard();

  const handleCopyToClipboard: ComponentPropsWithoutRef<'button'>['onClick'] = () => {
    // eslint-disable-next-line no-void
    void (async (): Promise<void> => {
      await copy(props.url);
    })();
  };

  return (
    <button aria-label={props.label} onClick={handleCopyToClipboard} title={props.label} type='button'>
      <div className='link-primary hover-tertiary size-10 rounded-lg p-1 hover:cursor-pointer'>{isCopied ? <CheckIcon /> : <LinkIcon />}</div>
    </button>
  );
};

export { CopyToClipboardButton };
