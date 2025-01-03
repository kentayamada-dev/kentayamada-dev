'use client';

import { useEffect } from 'react';
import ScrollHint from 'scroll-hint';
import type { SpanType } from './types';
// eslint-disable-next-line import/order
import 'scroll-hint/css/scroll-hint.css';

const Span: SpanType = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, locale, ...rest } = props;

  useEffect(() => {
    // eslint-disable-next-line no-new
    new ScrollHint('.js-scrollable', {
      suggestiveShadow: true
    });
  }, []);

  if (className === 'katex-display') {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    return <span className={`${className} js-scrollable !m-0 overflow-auto py-7`} {...rest} />;
  }

  return <span className={className} {...rest} />;
};

export { Span };
