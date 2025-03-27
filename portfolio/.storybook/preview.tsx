import React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';
import { customViewports, viewportKeys } from '../src/app/lib/storybook';
import { notoSansJP } from '../src/app/constants/fonts';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/en'
      }
    },
    layout: 'fullscreen',
    viewport: { viewports: customViewports, defaultViewport: viewportKeys.iPadAir }
  },
  decorators: [
    (Story) => {
      return (
        <span className={notoSansJP.className}>
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
