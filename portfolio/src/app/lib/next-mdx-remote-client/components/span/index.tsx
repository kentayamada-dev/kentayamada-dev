'use client';

import { useEffect, useRef } from 'react';
import ScrollHint from 'scroll-hint';
import type { SpanType } from './types';

const Span: SpanType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...rest } = props;
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (className === 'katex-display' && spanRef.current) {
      // eslint-disable-next-line no-new
      new ScrollHint(spanRef.current, {
        suggestiveShadow: true
      });
    }
  }, [className]);

  return (
    <span
      className={className === 'katex-display' ? `${className} !m-0 overflow-auto py-7` : className}
      ref={className === 'katex-display' ? spanRef : null}
      {...rest}
    />
  );
};

export { Span };
