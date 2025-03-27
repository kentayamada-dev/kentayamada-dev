import { useEffect } from 'react';

const useMediaQuery = (callback: () => void): void => {
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const breakpointMd = styles.getPropertyValue('--breakpoint-md');
    const mediaQueryList = window.matchMedia(`(min-width: ${breakpointMd})`);

    const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        callback();
      }
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return (): void => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
};

export { useMediaQuery };
