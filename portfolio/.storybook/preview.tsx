import React, { useEffect } from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';
import { fonts, notoSansJP } from '../src/app/constants/fonts';
import '../src/app/globals.css';

const customViewports = {
  iPhone14ProMax: {
    name: 'iPhone 14 Pro Max',
    styles: {
      width: '430px',
      height: '932px'
    }
  },
  iPadAir: {
    name: 'iPad Air',
    styles: {
      width: '820px',
      height: '1180px'
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
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/en'
      }
    },
    layout: 'fullscreen',
    viewport: { viewports: customViewports, defaultViewport: 'fullHd' },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Icons', 'Atoms', 'Molecules', 'Templates'],
        includeNames: true
      }
    }
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
