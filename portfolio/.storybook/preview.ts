import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'dark',
    attributeName: 'data-theme'
  })
];

const preview: Preview = {
  parameters: {
    darkMode: {
      current: 'dark'
    }
  }
};

export default preview;
