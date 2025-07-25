import { useEffect } from 'react';

const useMediaQuery = (callback: VoidFunction): void => {
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const breakpointMd = styles.getPropertyValue('--breakpoint-md');
    const mediaQueryList = window.matchMedia(`(min-width: ${breakpointMd})`);

    const onMediaQueryChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        callback();
      }
    };

    mediaQueryList.addEventListener('change', onMediaQueryChange);

    return (): void => {
      mediaQueryList.removeEventListener('change', onMediaQueryChange);
    };
  }, []);
};

export { useMediaQuery };
