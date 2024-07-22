import { ThemeProvider } from 'next-themes';
import { defaultTheme, themeOptions } from '@/constants/themes';
import { getKeysFromObject } from '@/utils';
import type { ProvidersType } from './types';

const Providers: ProvidersType = (props) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme={defaultTheme}
      disableTransitionOnChange
      themes={getKeysFromObject(themeOptions)}
    >
      {props.children}
    </ThemeProvider>
  );
};

export { Providers };
