import { ThemeProvider } from 'next-themes';
import { arrayOfThemes, defaultTheme } from '@/constants/themes';
import type { ProvidersType } from './types';

const Providers: ProvidersType = (props) => {
  return (
    <ThemeProvider attribute='class' defaultTheme={defaultTheme} disableTransitionOnChange themes={arrayOfThemes}>
      {props.children}
    </ThemeProvider>
  );
};

export { Providers };
