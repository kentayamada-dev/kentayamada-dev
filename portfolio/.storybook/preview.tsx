import { withThemeByClassName } from '@storybook/addon-themes';
import { Decorator, Preview, ReactRenderer } from '@storybook/react';
import { customViewports, viewportKeys } from '../src/app/lib/storybook';
import { arrayOfLocales } from '../src/app/constants/i18n';
import { notoSansJP } from '../src/app/constants/fonts';
// @ts-expect-error library not found
import { action } from '@storybook/addon-actions';
import '../src/app/globals.css';

const preventNavigation: Decorator = (Story) => (
  <div
    onClick={(event) => {
      const anchor = (event.target as HTMLElement).closest('a');
      if (anchor) {
        event.preventDefault();
        action('link-click')(anchor.getAttribute('href'));
      }
    }}
  >
    <Story />
  </div>
);

const preview: Preview = {
  argTypes: {
    locale: { control: 'select', options: arrayOfLocales },
    createdAt: { control: 'date' },
    updatedAt: { control: 'date' }
  },
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
    preventNavigation,
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
