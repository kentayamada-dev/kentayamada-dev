import { useState } from 'react';
import type { CopyFnType, UseCopyToClipboardType } from './types';

const useCopyToClipboard: UseCopyToClipboardType = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy: CopyFnType = async (text) => {
    if (!isCopied) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return true;
  };

  return [isCopied, copy];
};

export { useCopyToClipboard };
