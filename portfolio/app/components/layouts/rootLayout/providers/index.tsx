import { ThemeProvider } from 'next-themes';
import { themeOptions } from '@/constants/themes';
import { getKeysFromObject } from '@/utils/getKeysFromObject';
import type { ProvidersType } from './types';

const Providers: ProvidersType = (props) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      themes={getKeysFromObject(themeOptions)}
    >
      {props.children}
    </ThemeProvider>
  );
};

export { Providers };
