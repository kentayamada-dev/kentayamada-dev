import { Preview } from '@storybook/nextjs-vite';
import { customViewports, viewportKeys } from '../src/app/lib/storybook';
import { notoSansJP } from '../src/app/constants/fonts';
import { action } from 'storybook/actions';
import '../src/app/globals.css';

const preview: Preview = {
  globalTypes: {
    themeStory: {
      description: 'Theme for Story',
      toolbar: {
        title: 'Story',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ]
      }
    },
    themeUI: {
      description: 'Theme for UI',
      toolbar: {
        title: 'UI',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ]
      }
    }
  },
  initialGlobals: {
    themeStory: 'light',
    themeUI: 'light',
    viewport: { value: viewportKeys.iPadAir }
  },
  parameters: {
    options: { selectedPanel: 'storybook/controls/panel' },
    backgrounds: { disable: true },
    controls: {
      disableSaveFromUI: true,
      matchers: {
        date: /(createdAt|updatedAt)$/i
      }
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/en'
      }
    },
    layout: 'fullscreen',
    viewport: {
      options: {
        ...customViewports
      }
    }
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.themeStory === 'dark';
      const html = document.documentElement;
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      return (
        <span
          className={notoSansJP.className}
          onClick={(event) => {
            const anchor = (event.target as HTMLElement).closest('a');
            if (anchor) {
              event.preventDefault();
              action('link-click')(anchor.getAttribute('href'));
            }
          }}
        >
          <Story />
        </span>
      );
    }
  ]
};

export default preview;
