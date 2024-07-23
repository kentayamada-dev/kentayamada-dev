import { ThemeProvider } from 'next-themes';
import { arrayOfLocales } from '@/constants/locales';
import { defaultTheme } from '@/constants/themes';
import type { ProvidersType } from './types';

const Providers: ProvidersType = (props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme={defaultTheme} disableTransitionOnChange themes={arrayOfLocales}>
      {props.children}
    </ThemeProvider>
  );
};

export { Providers };
