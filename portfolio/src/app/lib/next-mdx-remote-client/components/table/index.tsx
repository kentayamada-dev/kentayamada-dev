'use client';

import { useEffect, useRef } from 'react';
import ScrollHint from 'scroll-hint';
import type { TableType } from './types';

const Table: TableType = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line no-new
      new ScrollHint(ref.current, {
        suggestiveShadow: true
      });
    }
  }, []);

  return (
    <div className='not-prose custom-table' ref={ref}>
      <table {...props} />
    </div>
  );
};

export { Table };
