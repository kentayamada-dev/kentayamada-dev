'use client';

import { startTransition, useEffect } from 'react';
import { incrementPageView } from '../actions';
import type { ViewTrackerType } from './types';

const ViewTracker: ViewTrackerType = (props) => {
  useEffect(() => {
    startTransition(async () => {
      await incrementPageView(props.title);
    });
  }, [props.title]);

  return null;
};

export { ViewTracker };
