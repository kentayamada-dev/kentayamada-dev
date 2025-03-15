import React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';
import { Noto_Sans_JP } from 'next/font/google';
import '../src/app/globals.css';

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
});

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
} as const;

type ViewportKey = keyof typeof customViewports;

const viewportKeys: { [K in ViewportKey]: K } = Object.fromEntries(Object.keys(customViewports).map((key) => [key, key])) as {
  [K in ViewportKey]: K;
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
    viewport: { viewports: customViewports, defaultViewport: viewportKeys.iPadAir },
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
