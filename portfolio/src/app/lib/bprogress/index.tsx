'use client';

import { ProgressProvider as BProgress } from '@bprogress/next/app';
import type { ProgressProviderType } from './types';

const ProgressProvider: ProgressProviderType = (props) => {
  return (
    <BProgress color='var(--color-blue-500)' height='3px' options={{ showSpinner: false }} shallowRouting>
      {props.children}
    </BProgress>
  );
};

export { ProgressProvider };
