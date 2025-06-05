'use client';

import { startTransition, useEffect } from 'react';
import { incrementCount } from '../actions';
import type { ViewTrackerType } from './types';

const ViewTracker: ViewTrackerType = (props) => {
  useEffect(() => {
    startTransition(async () => {
      await incrementCount(props.keyName);
    });
  }, [props.keyName]);

  return null;
};

export { ViewTracker };
