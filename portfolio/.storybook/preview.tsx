import React, { useEffect } from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';
import { fonts, notoSansJP } from '../src/app/constants/fonts';
import '../src/app/globals.css';

const customViewports = {
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '375px',
      height: '667px'
    }
  },
  iPadPro11: {
    name: 'iPad Pro (11-inch)',
    styles: {
      width: '834px',
      height: '1194px'
    }
  },
  fullHd: {
    name: 'Full HD',
    styles: {
      width: '1920px',
      height: '1080px'
    }
  }
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    layout: 'fullscreen',
    viewport: { viewports: customViewports }
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add(notoSansJP.className);
      }, []);

      return (
        <span className={fonts}>
          <Story />
        </span>
      );
    },
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
