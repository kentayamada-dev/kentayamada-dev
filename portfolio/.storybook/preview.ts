import { withThemeByClassName } from '@storybook/addon-themes';
import '../app/globals.css';
import { Preview, ReactRenderer } from '@storybook/react';

const preview: Preview = {
  parameters: {},
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: 'light',
        dark: 'dark'
      },
      defaultTheme: 'light'
    })
  ]
};

export default preview;
