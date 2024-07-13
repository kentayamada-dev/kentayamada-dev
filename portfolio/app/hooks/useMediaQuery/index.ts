import { useEffect } from 'react';
import type { UseMediaQueryType } from './types';

const useMediaQuery: UseMediaQueryType = (props) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(props.query);

    const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        props.callback();
      }
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return (): void => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [props.query, props.callback]);
};

export { useMediaQuery };
