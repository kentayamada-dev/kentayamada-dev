import { ThemeProvider } from 'next-themes';
import { constants } from '@/constants';
import type { ProvidersType } from './types';

export const Providers: ProvidersType = (props) => {
  const themes = Array.from(constants.themes);

  return (
    <ThemeProvider attribute='class' defaultTheme='system' disableTransitionOnChange themes={themes}>
      {props.children}
    </ThemeProvider>
  );
};
